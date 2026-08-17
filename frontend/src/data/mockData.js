// NexLance Comprehensive Mock Data Store

export const CURRENT_USER = {
  id: "fl-alex-01",
  name: "Alex Rivera",
  role: "Senior Full-Stack Developer",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
  location: "San Francisco, CA (Remote)",
  timezone: "PST (UTC-8)",
  hourlyRate: 75,
  rateDisplay: "₹5,500/hr ($75/hr)",
  available: true,
  availabilityText: "Available for new projects (20 hrs/week)",
  memberSince: "March 2023",
  bio: "Full-stack engineer with 7+ years building enterprise React architectures, distributed Node.js microservices, and high-performance web apps. Proven track record of delivering 40+ production systems on time with 98% code test coverage.",
  careerScore: 91,
  rating: 4.92,
  totalReviews: 38,
  activeProjectsCount: 4,
  applicationsCount: 12,
  completedProjectsCount: 42,
  earnedTotal: "₹38.5 Lakh ($46,000+)",
  onTimeDeliveryRate: 96,
  clientSatisfactionRate: 94,
  codeQualityRate: 98,
  communicationRate: 90,
  budgetAdherenceRate: 88,
  completionRate: 100,
  scoreHistory: [
    { month: "May", score: 81 },
    { month: "Jun", score: 84 },
    { month: "Jul", score: 86 },
    { month: "Aug", score: 88 },
    { month: "Sep", score: 90 },
    { month: "Oct", score: 91 }
  ],
  verifiedSkills: [
    { id: "react", name: "React", score: 91, percentile: "Top 5% Global", status: "verified", verifiedDate: "Dec 2024", retakeDate: "Dec 2025" },
    { id: "javascript", name: "JavaScript (ES6+)", score: 87, percentile: "Top 15% Global", status: "verified", verifiedDate: "Jan 2025", retakeDate: "Jan 2026" },
    { id: "typescript", name: "TypeScript", score: 94, percentile: "Top 3% Global", status: "verified", verifiedDate: "Feb 2025", retakeDate: "Feb 2026" },
    { id: "graphql", name: "GraphQL & REST APIs", score: 89, percentile: "Top 10% Global", status: "verified", verifiedDate: "Nov 2024", retakeDate: "Nov 2025" },
    { id: "nodejs", name: "Node.js Microservices", score: 86, percentile: "Top 18% Global", status: "verified", verifiedDate: "Oct 2024", retakeDate: "Oct 2025" },
    { id: "aws", name: "AWS Cloud & DevOps", score: null, percentile: null, status: "unverified", note: "Assessment available" }
  ],
  proofOfWork: [
    {
      id: "pow-1",
      title: "OmniCart Enterprise E-Commerce",
      client: "Meridian Retail Global",
      role: "Lead Frontend Architect",
      period: "3 months (Completed Jan 2025)",
      skills: ["React", "Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
      rating: 5.0,
      clientQuote: "Alex delivered our 120k-SKU headless store ahead of Black Friday. Page load time dropped 68% and conversions surged by 24%.",
      satisfaction: 98,
      deliveryTime: "4 days ahead of schedule",
      liveUrl: "https://omnicart-demo.nexlance.dev",
      githubUrl: "https://github.com/alexrivera/omnicart-storefront",
      metrics: [
        { label: "Core Web Vitals", value: "99/100" },
        { label: "Conversion Lift", value: "+24.2%" },
        { label: "Test Coverage", value: "94.8%" }
      ],
      description: "Architected a scalable Next.js 14 App Router e-commerce application with Edge SSR, dynamic multi-currency checkout, and sub-100ms faceted product search."
    },
    {
      id: "pow-2",
      title: "ApexFlow Real-Time Financial Terminal",
      client: "VenturePulse Capital",
      role: "Senior Full-Stack Engineer",
      period: "4 months (Completed Nov 2024)",
      skills: ["React", "Node.js", "WebSocket", "GraphQL", "Redis", "Canvas API"],
      rating: 4.9,
      clientQuote: "Flawless real-time data streaming and candlestick chart rendering at 60fps even under heavy market spikes.",
      satisfaction: 96,
      deliveryTime: "On time",
      liveUrl: "https://apexflow-terminal.nexlance.dev",
      metrics: [
        { label: "Latency", value: "<12ms" },
        { label: "Concurrent Feeds", value: "10,000+" },
        { label: "Render Rate", value: "60 FPS" }
      ],
      description: "Engineered ultra-low latency market dashboards with WebSockets, Web Workers for client-side data parsing, and virtualized tables supporting 50,000+ live rows."
    },
    {
      id: "pow-3",
      title: "HealthSync Telehealth & EHR Web Suite",
      client: "NovaCare Health Systems",
      role: "Lead Full-Stack Developer",
      period: "2.5 months (Completed Aug 2024)",
      skills: ["React", "TypeScript", "WebRTC", "PostgreSQL", "HIPAA Compliance"],
      rating: 5.0,
      clientQuote: "Incredible attention to security, zero-downtime video consultations, and intuitive UX for medical staff.",
      satisfaction: 100,
      deliveryTime: "1 week ahead of schedule",
      liveUrl: "https://healthsync-telehealth.nexlance.dev",
      metrics: [
        { label: "HIPAA Audit", value: "100% Passed" },
        { label: "Video Uptime", value: "99.99%" },
        { label: "Active Doctors", value: "450+" }
      ],
      description: "Designed and built an end-to-end encrypted telehealth portal featuring crystal-clear WebRTC video consultations, automated prescription generation, and automated audit logging."
    }
  ]
};

export const FREELANCERS = [
  {
    id: "fl-alex-01",
    name: "Alex Rivera",
    title: "Senior Full-Stack React & Node.js Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    careerScore: 91,
    rating: 4.92,
    reviewsCount: 38,
    projectsCompleted: 42,
    hourlyRate: "₹5,500/hr ($75/hr)",
    rawRate: 75,
    location: "San Francisco, USA",
    available: true,
    availabilityBadge: "Available (Full/Part time)",
    matchScore: 98,
    topSkills: [
      { name: "React", verified: true, score: 91 },
      { name: "TypeScript", verified: true, score: 94 },
      { name: "Node.js", verified: true, score: 86 },
      { name: "Next.js", verified: true, score: 93 }
    ],
    verifiedCount: 5,
    clientSatisfaction: 94,
    onTimeDelivery: 96,
    workQuality: 98,
    communication: 90,
    budgetAdherence: 88,
    bio: "Senior engineer specializing in resilient SaaS architecture, sub-second React frontends, and reliable API services.",
    whyMatch: [
      "98% Skill match with requirements",
      "React Verified in top 5% global percentile",
      "8 similar enterprise e-commerce platforms completed",
      "96% on-time delivery record across 42 projects",
      "Currently available with instant start capability"
    ],
    tags: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "Tailwind CSS", "PostgreSQL"]
  },
  {
    id: "fl-priya-02",
    name: "Priya Sharma",
    title: "Principal Product Designer & Design Systems Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    careerScore: 94,
    rating: 4.98,
    reviewsCount: 49,
    projectsCompleted: 54,
    hourlyRate: "₹6,000/hr ($85/hr)",
    rawRate: 85,
    location: "Bengaluru, India",
    available: true,
    availabilityBadge: "Available (25 hrs/wk)",
    matchScore: 96,
    topSkills: [
      { name: "Figma UI/UX", verified: true, score: 96 },
      { name: "Design Systems", verified: true, score: 95 },
      { name: "React Frontend", verified: true, score: 90 },
      { name: "User Research", verified: true, score: 94 }
    ],
    verifiedCount: 6,
    clientSatisfaction: 98,
    onTimeDelivery: 97,
    workQuality: 99,
    communication: 96,
    budgetAdherence: 94,
    bio: "Ex-fintech design lead transforming complex enterprise workflows into elegant, intuitive, conversion-focused interfaces.",
    whyMatch: [
      "96% Skill match with UX & design requirements",
      "Figma assessment score 96/100 (Top 1% global)",
      "Created design systems used by 100+ devs",
      "54 verified completed client projects with 4.98 rating"
    ],
    tags: ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "Tailwind CSS", "User Testing"]
  },
  {
    id: "fl-marcus-03",
    name: "Marcus Vance",
    title: "Staff Cloud Architect & DevOps Specialist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    careerScore: 95,
    rating: 4.95,
    reviewsCount: 31,
    projectsCompleted: 35,
    hourlyRate: "₹7,200/hr ($95/hr)",
    rawRate: 95,
    location: "Austin, TX, USA",
    available: true,
    availabilityBadge: "Available (15-20 hrs/wk)",
    matchScore: 92,
    topSkills: [
      { name: "Kubernetes", verified: true, score: 98 },
      { name: "AWS Cloud", verified: true, score: 97 },
      { name: "Terraform IaC", verified: true, score: 94 },
      { name: "Docker CI/CD", verified: true, score: 96 }
    ],
    verifiedCount: 5,
    clientSatisfaction: 96,
    onTimeDelivery: 99,
    workQuality: 97,
    communication: 92,
    budgetAdherence: 95,
    bio: "DevOps veteran with 10+ years specializing in zero-downtime Kubernetes infrastructure, GitOps, and AWS cost reduction.",
    whyMatch: [
      "Top 1% Global verified score in Kubernetes (98/100)",
      "99% On-time delivery rate across all cloud setups",
      "Built automated pipelines saving 40% infra costs",
      "AWS Certified Solutions Architect & CKA"
    ],
    tags: ["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD", "GitHub Actions", "Security"]
  },
  {
    id: "fl-elena-04",
    name: "Elena Rostova",
    title: "Senior AI/ML Engineer & LLM Specialist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    careerScore: 89,
    rating: 4.88,
    reviewsCount: 22,
    projectsCompleted: 26,
    hourlyRate: "₹6,800/hr ($90/hr)",
    rawRate: 90,
    location: "Berlin, Germany",
    available: false,
    availabilityBadge: "Busy until next month",
    matchScore: 87,
    topSkills: [
      { name: "Python", verified: true, score: 95 },
      { name: "PyTorch & ML", verified: true, score: 91 },
      { name: "LangChain / RAG", verified: true, score: 93 },
      { name: "FastAPI", verified: true, score: 88 }
    ],
    verifiedCount: 4,
    clientSatisfaction: 92,
    onTimeDelivery: 91,
    workQuality: 96,
    communication: 88,
    budgetAdherence: 90,
    bio: "Applied AI scientist building production RAG pipelines, fine-tuned domain models, and high-speed vector retrieval backends.",
    whyMatch: [
      "95/100 Verified in Python & AI architecture",
      "Specialist in low-latency RAG vector architectures",
      "Successfully integrated LLM pipelines into 14 production apps"
    ],
    tags: ["Python", "PyTorch", "LangChain", "FastAPI", "OpenAI", "Vector DBs", "Docker"]
  },
  {
    id: "fl-david-05",
    name: "David Chen",
    title: "Senior Cross-Platform Mobile Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    careerScore: 92,
    rating: 4.90,
    reviewsCount: 36,
    projectsCompleted: 40,
    hourlyRate: "₹5,200/hr ($70/hr)",
    rawRate: 70,
    location: "Toronto, Canada",
    available: true,
    availabilityBadge: "Available immediately",
    matchScore: 85,
    topSkills: [
      { name: "Flutter", verified: true, score: 93 },
      { name: "React Native", verified: true, score: 88 },
      { name: "iOS / Swift", verified: true, score: 86 },
      { name: "Firebase", verified: true, score: 91 }
    ],
    verifiedCount: 4,
    clientSatisfaction: 94,
    onTimeDelivery: 95,
    workQuality: 93,
    communication: 94,
    budgetAdherence: 91,
    bio: "Delivering buttery smooth 60fps native iOS & Android applications with Flutter and React Native. Published 18+ App Store apps.",
    whyMatch: [
      "93/100 Verified Flutter score (Top 5%)",
      "18 apps live on Apple App Store & Google Play",
      "40 completed mobile projects with 4.90 average rating"
    ],
    tags: ["Flutter", "Dart", "React Native", "Swift", "Firebase", "App Store", "Mobile UI"]
  },
  {
    id: "fl-aisha-06",
    name: "Aisha Patel",
    title: "Enterprise Backend & Distributed DB Architect",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    careerScore: 90,
    rating: 4.86,
    reviewsCount: 29,
    projectsCompleted: 33,
    hourlyRate: "₹5,800/hr ($80/hr)",
    rawRate: 80,
    location: "London, UK",
    available: true,
    availabilityBadge: "Available (30 hrs/wk)",
    matchScore: 90,
    topSkills: [
      { name: "PostgreSQL", verified: true, score: 94 },
      { name: "Go (Golang)", verified: true, score: 89 },
      { name: "Node.js", verified: true, score: 92 },
      { name: "Redis & Caching", verified: true, score: 90 }
    ],
    verifiedCount: 5,
    clientSatisfaction: 93,
    onTimeDelivery: 94,
    workQuality: 95,
    communication: 89,
    budgetAdherence: 87,
    bio: "High-throughput database tuning, distributed concurrency in Go, and bulletproof relational schemas that scale effortlessly.",
    whyMatch: [
      "94/100 Verified in PostgreSQL performance tuning",
      "Expertise handling 10,000+ QPS databases",
      "33 enterprise backend architectures successfully delivered"
    ],
    tags: ["PostgreSQL", "Go", "Node.js", "Redis", "Microservices", "Docker", "Database Tuning"]
  }
];

export const PROJECTS = [
  {
    id: "proj-101",
    title: "React E-Commerce Platform Architecture",
    badge: "Enterprise",
    client: {
      name: "Meridian Commerce Inc.",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
      rating: 4.95,
      spent: "₹45 Lakh ($55K+)",
      verifiedPayment: true,
      country: "United States"
    },
    budget: "₹1,20,000 – ₹1,80,000 ($1,500 – $2,200)",
    budgetType: "Fixed Price",
    deadline: "3 weeks",
    deadlineDate: "Oct 15, 2026",
    experienceLevel: "Senior / Expert",
    category: "Web Development",
    matchScore: 96,
    requiredSkills: ["React", "Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    verifiedSkillsRequired: ["React", "TypeScript"],
    applicantsCount: 14,
    description: "We are re-architecting our global multi-brand retail storefront from legacy PHP to an ultra-fast Next.js 14 App Router platform with Stripe checkout, live inventory counters, and sub-100ms search capabilities.",
    scopePoints: [
      "Implement pixel-perfect responsive product catalog and PDPs",
      "Build custom cart with optimistic updates and multi-currency Stripe checkout",
      "Ensure Lighthouse scores > 95 for Performance, Accessibility, and SEO",
      "Write comprehensive end-to-end integration tests using Playwright"
    ],
    whyMatchReasons: [
      "✓ React Skill Verified (91/100 - Top 5% Global)",
      "✓ TypeScript Skill Verified (94/100)",
      "✓ 8 similar e-commerce platforms completed in portfolio",
      "✓ 96% on-time delivery record",
      "✓ Available within project timeframe"
    ],
    postedAgo: "2 hours ago",
    status: "Open"
  },
  {
    id: "proj-102",
    title: "Internal Dashboard Migration (Angular → React)",
    badge: "Series B",
    client: {
      name: "NexGen Logistics AI",
      avatar: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80",
      rating: 4.88,
      spent: "₹28 Lakh ($34K+)",
      verifiedPayment: true,
      country: "Germany"
    },
    budget: "₹1,80,000 – ₹2,50,000 ($2,200 – $3,000)",
    budgetType: "Fixed Price",
    deadline: "4 weeks",
    deadlineDate: "Oct 28, 2026",
    experienceLevel: "Senior",
    category: "Frontend Engineering",
    matchScore: 88,
    requiredSkills: ["React", "TypeScript", "Jest", "Redux Toolkit", "TanStack Table"],
    verifiedSkillsRequired: ["React", "TypeScript"],
    applicantsCount: 9,
    description: "Migrating our fleet dispatching and telemetry console from AngularJS to modern React 19 + TypeScript. Needs data grids with 10k rows, real-time vehicle websocket tracking, and robust offline caching.",
    scopePoints: [
      "Incremental migration with micro-frontend iframe bridge",
      "Virtualized data tables handling 10,000+ live fleet rows",
      "Real-time WebSocket telemetry ingestion with throttling",
      "Complete unit test coverage > 90% with Jest & React Testing Library"
    ],
    whyMatchReasons: [
      "✓ React & TypeScript verified assessments passed",
      "✓ Previous experience with real-time financial terminal data",
      "✓ 100% completion rate on long-term client contracts"
    ],
    postedAgo: "5 hours ago",
    status: "Open"
  },
  {
    id: "proj-103",
    title: "Real-Time Financial Analytics & Streaming API",
    badge: "Fintech",
    client: {
      name: "QuantVantage Alpha",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      rating: 5.0,
      spent: "₹65 Lakh ($80K+)",
      verifiedPayment: true,
      country: "Singapore"
    },
    budget: "₹2,40,000 – ₹3,20,000 ($3,000 – $4,000)",
    budgetType: "Fixed Price",
    deadline: "5 weeks",
    deadlineDate: "Nov 10, 2026",
    experienceLevel: "Expert",
    category: "Backend & Systems",
    matchScore: 82,
    requiredSkills: ["Node.js", "Redis", "GraphQL", "WebSockets", "TimescaleDB"],
    verifiedSkillsRequired: ["Node.js"],
    applicantsCount: 19,
    description: "Build a high-throughput Node.js microservice architecture for real-time market order book data streaming, delta updates, and instant aggregated candlestick calculations.",
    scopePoints: [
      "Low latency WebSocket gateway handling 20k concurrent connections",
      "Redis pub/sub broker for cluster distribution",
      "GraphQL subscription layer with field-level rate limiting",
      "Stress tested to 50k requests/sec under load"
    ],
    whyMatchReasons: [
      "✓ Node.js & GraphQL verified skills",
      "✓ Demonstrated WebSocket terminal in Proof of Work",
      "✓ 94% client satisfaction rating"
    ],
    postedAgo: "1 day ago",
    status: "Open"
  },
  {
    id: "proj-104",
    title: "AI Customer Copilot Interactive Chat UI",
    badge: "AI Startup",
    client: {
      name: "SynapseAI Labs",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
      rating: 4.92,
      spent: "₹18 Lakh ($22K+)",
      verifiedPayment: true,
      country: "United States"
    },
    budget: "₹90,000 – ₹1,40,000 ($1,100 – $1,700)",
    budgetType: "Fixed Price",
    deadline: "2 weeks",
    deadlineDate: "Oct 5, 2026",
    experienceLevel: "Intermediate to Senior",
    category: "AI & Web Apps",
    matchScore: 94,
    requiredSkills: ["React", "Tailwind CSS", "SSE Streaming", "Markdown Rendering", "Framer Motion"],
    verifiedSkillsRequired: ["React", "JavaScript (ES6+)"],
    applicantsCount: 23,
    description: "Create an ultra-slick, ChatGPT/Claude grade conversational interface with streaming markdown, code block syntax highlighting, inline tool action widgets, and smooth micro-animations.",
    scopePoints: [
      "Server-Sent Events (SSE) token-by-token streaming animation",
      "Interactive widgets embedded in markdown (tables, charts, buttons)",
      "Dark and light theme support with fluid glassmorphism accents",
      "Voice dictation audio waveform visualizer"
    ],
    whyMatchReasons: [
      "✓ React and JavaScript verified with top-tier scores",
      "✓ Clean UI animation and modern responsive design mastery",
      "✓ Immediate start availability"
    ],
    postedAgo: "1 day ago",
    status: "Open"
  }
];

export const SERVICES = [
  {
    id: "srv-201",
    title: "Production React & Next.js 14 Full-Stack MVP in 14 Days",
    freelancer: FREELANCERS[0],
    rating: 4.95,
    reviewsCount: 28,
    startingPrice: "₹25,000 ($320)",
    rawStartingPrice: 320,
    deliveryDays: 14,
    category: "Full-Stack Web Development",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    verifiedSkills: ["React", "TypeScript", "Node.js"],
    packages: {
      basic: {
        name: "Basic MVP Landing & Auth",
        price: "₹15,000 ($200)",
        delivery: "5 Days",
        revisions: 2,
        features: ["Landing page + 2 subpages", "Supabase / Clerk Auth", "Tailwind CSS responsive design", "Clean TypeScript setup", "Vercel deployment"]
      },
      standard: {
        name: "Standard Full-Stack SaaS",
        price: "₹35,000 ($450)",
        delivery: "10 Days",
        revisions: 4,
        features: ["Everything in Basic", "CRUD dashboard + Database schema", "Stripe payment subscription", "Email notifications (Resend)", "Admin portal"]
      },
      premium: {
        name: "Enterprise Production Suite",
        price: "₹65,000 ($850)",
        delivery: "14 Days",
        revisions: "Unlimited",
        features: ["Everything in Standard", "Role-based ACL permissions", "High-speed search & filters", "Automated CI/CD + Unit tests", "30 days post-launch support"]
      }
    }
  },
  {
    id: "srv-202",
    title: "Complete SaaS Design System & Interactive Figma Prototype",
    freelancer: FREELANCERS[1],
    rating: 4.98,
    reviewsCount: 34,
    startingPrice: "₹18,000 ($240)",
    rawStartingPrice: 240,
    deliveryDays: 7,
    category: "UI/UX & Product Design",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
    verifiedSkills: ["Figma UI/UX", "Design Systems", "Prototyping"],
    packages: {
      basic: {
        name: "Core UI Kit & Foundations",
        price: "₹18,000 ($240)",
        delivery: "4 Days",
        revisions: 3,
        features: ["Color tokens & Typography scale", "50+ Core UI components (buttons, inputs)", "Auto-layout 5.0 ready", "Figma design tokens"]
      },
      standard: {
        name: "Full App Screen Suite (15 Screens)",
        price: "₹38,000 ($490)",
        delivery: "7 Days",
        revisions: 5,
        features: ["Everything in Basic", "15 High-fidelity application screens", "Interactive clickable prototype", "Dark & light mode variants", "Developer handover specs"]
      },
      premium: {
        name: "Complete Enterprise Brand & UI Suite",
        price: "₹60,000 ($780)",
        delivery: "12 Days",
        revisions: "Unlimited",
        features: ["Everything in Standard", "30+ Application screens & states", "Custom icon set & micro-illustrations", "Storybook coordination guide", "Usability test recordings"]
      }
    }
  },
  {
    id: "srv-203",
    title: "Production Kubernetes, AWS EKS & Automated CI/CD Infrastructure",
    freelancer: FREELANCERS[2],
    rating: 4.95,
    reviewsCount: 19,
    startingPrice: "₹28,000 ($360)",
    rawStartingPrice: 360,
    deliveryDays: 7,
    category: "DevOps & Cloud Architecture",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=600&auto=format&fit=crop&q=80",
    verifiedSkills: ["Kubernetes", "AWS Cloud", "Terraform IaC"],
    packages: {
      basic: {
        name: "Docker & GitHub Actions CI/CD",
        price: "₹20,000 ($260)",
        delivery: "3 Days",
        revisions: 2,
        features: ["Multi-stage Dockerfile optimization", "Automated GitHub Actions lint/test/build", "Staging auto-deploy", "Secrets management"]
      },
      standard: {
        name: "Terraform IaC on AWS/GCP",
        price: "₹42,000 ($540)",
        delivery: "6 Days",
        revisions: 4,
        features: ["Everything in Basic", "VPC, Subnets, RDS, S3 via Terraform", "Automated zero-downtime deployments", "CloudWatch alerts & Grafana dashboards"]
      },
      premium: {
        name: "Production EKS / K8s Cluster",
        price: "₹75,000 ($980)",
        delivery: "10 Days",
        revisions: "Unlimited",
        features: ["Everything in Standard", "Production-grade EKS cluster with Helm", "Cert-Manager SSL & Ingress controller", "ArgoCD GitOps pipeline", "Disaster recovery & backup strategy"]
      }
    }
  }
];

export const ASSESSMENTS = {
  react: {
    id: "react",
    title: "React Engineering & Architecture Assessment",
    difficulty: "Advanced",
    questionsCount: 15,
    durationMinutes: 20,
    passingScore: 75,
    questions: [
      {
        id: 1,
        question: "Which of the following React hooks is best suited for managing complex state logic that involves multiple sub-values or where the next state depends on the previous one?",
        options: [
          "useState",
          "useReducer",
          "useEffect",
          "useImperativeHandle"
        ],
        correctAnswer: 1,
        explanation: "useReducer is preferred over useState when you have complex state logic that involves multiple sub-values, or when next state depends on previous state transitions."
      },
      {
        id: 2,
        question: "What is the primary architectural purpose of React Fiber introduced in React 16?",
        options: [
          "To introduce two-way data binding like Angular",
          "To enable incremental rendering by splitting rendering work into chunks and yielding execution to the browser",
          "To replace JavaScript with WebAssembly for virtual DOM diffing",
          "To automatically compile JSX into native machine code"
        ],
        correctAnswer: 1,
        explanation: "Fiber is a reimplementation of React's core reconciler that allows splitting rendering work into units, prioritizing, pausing, and resuming work without blocking main thread."
      },
      {
        id: 3,
        question: "When using `useMemo` in React, what does it cache between re-renders?",
        options: [
          "The component's DOM nodes directly in the browser cache",
          "The calculated result value of an expensive function call until its dependencies change",
          "The callback function definition itself",
          "The server-side HTML response string"
        ],
        correctAnswer: 1,
        explanation: "`useMemo` caches the calculated result of a calculation between re-renders until one of its listed dependencies changes."
      },
      {
        id: 4,
        question: "In React 18 / 19 Server Components (RSC), which of the following is true regarding bundle size?",
        options: [
          "Server Components increase client bundle size because they include extra server runtime code",
          "Server Component code and their server-only dependencies are never sent to the client browser bundle",
          "Server Components require Webpack to bundle all NPM packages into the client runtime",
          "Client bundles must download the entire Node.js core library"
        ],
        correctAnswer: 1,
        explanation: "React Server Components execute strictly on the server; their code and heavy dependencies are zero-bundle-impact for the client."
      },
      {
        id: 5,
        question: "Why should you NOT use array indices as `key` props when rendering dynamic lists that can be reordered, sorted, or filtered?",
        options: [
          "React will crash immediately with a fatal syntax error",
          "It confuses React's reconciliation diffing algorithm, causing component state mismatches and unintended rendering glitches",
          "Array indices are converted to floating point numbers internally",
          "Key props only accept valid cryptographic UUIDs"
        ],
        correctAnswer: 1,
        explanation: "Using array indices as keys when list items can change order breaks component state preservation across renders because the index stays the same while item data shifts."
      },
      {
        id: 6,
        question: "What does the `useCallback` hook return?",
        options: [
          "A memoized value resulting from executing the function",
          "A memoized version of the callback function that only changes if one of the dependencies has changed",
          "A Promise that resolves when the DOM updates",
          "A mutable ref object with `.current` property"
        ],
        correctAnswer: 1,
        explanation: "useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed, preventing unnecessary child re-renders."
      },
      {
        id: 7,
        question: "Which hook should be used to synchronize with an external system or perform subscription cleanup?",
        options: [
          "useLayoutEffect",
          "useEffect with a returned cleanup function",
          "useDeferredValue",
          "useTransition"
        ],
        correctAnswer: 1,
        explanation: "useEffect with a return cleanup function runs the cleanup when component unmounts or before re-running the effect on dependency change."
      },
      {
        id: 8,
        question: "What is the key benefit of `useTransition` introduced in React Concurrent Mode?",
        options: [
          "It marks state updates as non-urgent transitions, keeping the user interface responsive during heavy renders",
          "It automatically animates CSS width and height transitions",
          "It prevents all network requests from timing out",
          "It replaces Redux and Zustand entirely"
        ],
        correctAnswer: 0,
        explanation: "useTransition allows you to mark state updates as non-urgent transitions, allowing urgent updates (like typing in an input) to interrupt them."
      },
      {
        id: 9,
        question: "How does React's virtual DOM reconciliation handle two elements of different types (e.g. changing `<div>` to `<span>`)?",
        options: [
          "It attempts to morph attributes in-place",
          "It completely tears down the old component tree and mounts the new one from scratch",
          "It leaves the old DOM element and appends the new one",
          "It invokes an asynchronous migration worker"
        ],
        correctAnswer: 1,
        explanation: "Whenever the root elements have different types, React tears down the old tree and builds the new tree from scratch, discarding all old internal state."
      },
      {
        id: 10,
        question: "What is the primary role of an Error Boundary component in React?",
        options: [
          "To catch runtime JavaScript errors anywhere in its child component tree, log them, and display a fallback UI instead of crashing the whole app",
          "To prevent 404 HTTP errors on backend REST requests",
          "To validate form inputs against regular expressions",
          "To automatically correct syntax typos in JSX code"
        ],
        correctAnswer: 0,
        explanation: "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log errors, and display a fallback UI."
      },
      {
        id: 11,
        question: "What is the behavior of `useLayoutEffect` compared to standard `useEffect`?",
        options: [
          "useLayoutEffect runs asynchronously after paint, while useEffect runs before paint",
          "useLayoutEffect fires synchronously after all DOM mutations but before the browser paints on screen",
          "useLayoutEffect only runs on Node.js servers during SSR",
          "There is zero difference between the two hooks"
        ],
        correctAnswer: 1,
        explanation: "useLayoutEffect fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render to prevent layout flicker."
      },
      {
        id: 12,
        question: "What is the purpose of React `forwardRef`?",
        options: [
          "To pass a ref through a component to one of its child DOM elements",
          "To redirect browser URLs using pushState",
          "To forward HTTP headers from server components to client fetch requests",
          "To make a variable immutable"
        ],
        correctAnswer: 0,
        explanation: "React.forwardRef allows a parent component to obtain a reference (ref) to an underlying DOM node inside a child custom component."
      },
      {
        id: 13,
        question: "How does `React.memo` optimize performance by default?",
        options: [
          "By performing deep recursive equality checks on all props and state",
          "By doing a shallow comparison of current vs previous props and skipping re-render if props are unchanged",
          "By caching component HTML in IndexedDB",
          "By running components inside Web Workers"
        ],
        correctAnswer: 1,
        explanation: "React.memo is a higher order component that performs a shallow comparison of props. If props haven't changed, it reuses the last rendered result."
      },
      {
        id: 14,
        question: "What is the main purpose of `useId` in React 18?",
        options: [
          "To generate unique IDs that are consistent across SSR and client hydration to prevent ID mismatches",
          "To generate cryptographically secure passwords",
          "To generate database primary keys for SQL tables",
          "To assign UUIDs to network sockets"
        ],
        correctAnswer: 0,
        explanation: "useId generates unique, deterministic IDs that are stable across server-side rendering and client hydration, avoiding hydration mismatches on form labels/aria attributes."
      },
      {
        id: 15,
        question: "Which design pattern is best for avoiding prop drilling across dozens of deeply nested components?",
        options: [
          "Global `window` object assignments",
          "React Context API or dedicated state managers (Zustand / Redux)",
          "Inline eval() expressions",
          "Nested setTimeout chains"
        ],
        correctAnswer: 1,
        explanation: "React Context or atomic state stores (Zustand/Redux) allow sharing state across a tree of components without having to explicitly pass props through every level."
      }
    ]
  },
  nodejs: {
    id: "nodejs",
    title: "Node.js & Backend Architecture Assessment",
    difficulty: "Advanced",
    questionsCount: 15,
    durationMinutes: 20,
    passingScore: 75,
    questions: [
      {
        id: 1,
        question: "In the Node.js event loop, in which phase are `setImmediate()` callbacks executed?",
        options: [
          "Poll phase",
          "Check phase",
          "Timer phase",
          "Close callbacks phase"
        ],
        correctAnswer: 1,
        explanation: "The check phase executes callbacks scheduled by `setImmediate()` immediately following the poll phase."
      },
      {
        id: 2,
        question: "What is the primary advantage of using Node.js Streams instead of loading entire files into memory with `fs.readFile`?",
        options: [
          "Streams encrypt data automatically with AES-256",
          "Streams process data chunk-by-chunk in real time, drastically reducing RAM memory footprint for large payloads",
          "Streams only work on binary executable files",
          "Streams run in separate OS threads without Node's event loop"
        ],
        correctAnswer: 1,
        explanation: "Streams process data in chunks as it arrives, avoiding the need to buffer gigabytes of data in memory."
      },
      {
        id: 3,
        question: "What does the Node.js `cluster` module allow applications to do?",
        options: [
          "Create child processes that share server ports to take full advantage of multi-core CPUs",
          "Connect to multiple Redis clusters automatically",
          "Compile JavaScript into native C++ bindings",
          "Manage Kubernetes pods directly from npm"
        ],
        correctAnswer: 0,
        explanation: "The cluster module enables easy creation of worker processes that all share server ports, distributing incoming traffic across multiple CPU cores."
      }
    ]
  }
};

export const NOTIFICATIONS = [
  {
    id: "notif-1",
    category: "Project Matches",
    title: "New 96% Match: React E-Commerce Platform",
    description: "Meridian Commerce posted a new enterprise project matching your verified React & TypeScript skills.",
    time: "15 min ago",
    unread: true,
    action: "view-project",
    targetId: "proj-101"
  },
  {
    id: "notif-2",
    category: "Career Score Updates",
    title: "Career Score Increased to 91/100 🎉",
    description: "Your timely delivery milestone on OmniCart lifted your reliability score by +2 points.",
    time: "2 hours ago",
    unread: true,
    action: "view-career-score"
  },
  {
    id: "notif-3",
    category: "Shortlists",
    title: "You were shortlisted by NexGen Logistics AI",
    description: "The client added your profile to their Top 3 candidate comparison for 'Internal Dashboard Migration'.",
    time: "5 hours ago",
    unread: false,
    action: "view-applications"
  },
  {
    id: "notif-4",
    category: "Assessment Results",
    title: "Verified Skill: React 91/100 (Top 5% Global)",
    description: "Your official verification badge is now live on your public profile and Smart Match card.",
    time: "1 day ago",
    unread: false,
    action: "view-skills"
  },
  {
    id: "notif-5",
    category: "Proposal Updates",
    title: "Proposal Accepted for ApexFlow Terminal",
    description: "VenturePulse Capital funded Milestone 2 ($1,800) into platform escrow.",
    time: "2 days ago",
    unread: false,
    action: "view-projects"
  }
];

export const CLIENT_DATA = {
  id: "cl-meridian-01",
  name: "Meridian Retail Global",
  contactPerson: "Sarah Jenkins",
  title: "VP of Digital Engineering",
  avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
  activeProjects: 5,
  hiringProjects: 2,
  applicationsReceived: 48,
  smartMatchesFound: 18,
  shortlistedCandidates: ["fl-alex-01", "fl-priya-02", "fl-marcus-03"]
};

export const NEW_FREELANCER = {
  id: "fl-leo-new",
  name: "Leo Cruz",
  role: "Junior Full-Stack Developer",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
  careerScore: null,
  isNew: true,
  steps: [
    { id: 1, title: "Complete Profile & Bio", done: true },
    { id: 2, title: "Add Core Skill Tags", done: true },
    { id: 3, title: "Verify Your First Skill", done: false, action: "take-assessment" },
    { id: 4, title: "Complete Your First Project", done: false },
    { id: 5, title: "Receive Your First Client Review", done: false }
  ]
};
