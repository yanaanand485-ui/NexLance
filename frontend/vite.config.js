import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { PROJECTS, FREELANCERS, SERVICES } from './src/data/mockData.js'

// In-memory API database store
let projectsStore = [...PROJECTS];

/**
 * NexLance Built-in API Server Middleware
 * Handles REST API endpoints directly in Vite dev server:
 * - GET /api/projects
 * - POST /api/projects
 * - GET /api/freelancers
 * - GET /api/services
 * - GET /api/health
 */
function nexlanceApiPlugin() {
  return {
    name: 'nexlance-api-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const parsedUrl = new URL(req.url, 'http://localhost');
        const pathname = parsedUrl.pathname;

        // 1. Projects API
        if (pathname === '/api/projects') {
          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            return res.end(JSON.stringify(projectsStore));
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body || '{}');
                const newProject = {
                  id: `proj-${Date.now()}`,
                  applicantsCount: 0,
                  postedAgo: 'Just now',
                  status: 'Open',
                  matchScore: 95,
                  ...data
                };
                projectsStore = [newProject, ...projectsStore];
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 201;
                return res.end(JSON.stringify({ success: true, project: newProject }));
              } catch (err) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
        }

        // 2. Freelancers API
        if (pathname === '/api/freelancers' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          return res.end(JSON.stringify(FREELANCERS));
        }

        // 3. Services API
        if (pathname === '/api/services' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          return res.end(JSON.stringify(SERVICES));
        }

        // 4. API Health Check
        if (pathname === '/api/health') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          return res.end(JSON.stringify({
            status: 'online',
            service: 'NexLance REST API',
            activeProjectsCount: projectsStore.length,
            timestamp: new Date().toISOString()
          }));
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nexlanceApiPlugin()],
})
