# NexLance

> A skill-focused freelancing platform designed to connect clients with relevant and capable freelancers.

## Overview

NexLance is a web-based freelancing platform that brings together project-based hiring and freelancer service listings in a single platform.

The platform is designed to improve the traditional freelancing experience by introducing a stronger focus on verified skills, freelancer performance, proof of work, availability, and project-to-freelancer matching.

NexLance provides dedicated experiences for both clients and freelancers. Clients can publish projects, discover services, review applications, compare candidates, and hire suitable talent. Freelancers can build professional profiles, showcase their skills and work, create services, apply for projects, and track their professional performance.

The project is being developed progressively from a React-based frontend to a complete full-stack application using JSON Server, Node.js, Express.js, and MySQL.

---

## Objectives

- Provide a unified platform for project-based and service-based freelancing.
- Help clients discover freelancers based on relevant skills and performance.
- Allow freelancers to demonstrate their capabilities through verified skills and proof of work.
- Introduce a Career Score based on multiple aspects of professional performance.
- Provide project and freelancer matching based on relevant requirements.
- Create a structured and transparent hiring experience.
- Develop the application progressively through frontend, mock API, and full-stack phases.

---

## Core Features

### User Roles

NexLance supports two primary user roles:

**Freelancer**
- Professional profile
- Skills and expertise
- Skill verification
- Freelancer services
- Project discovery
- Proposal submission
- Project management
- Career Score
- Proof of Work
- Opportunity notifications

**Client**
- Client profile
- Project posting
- Project management
- Application management
- Freelancer discovery
- Service discovery
- Candidate comparison
- Shortlisting
- Hiring
- Project workspace
- Reviews and feedback

---

## Project-Based Hiring

Clients can publish projects with relevant requirements such as category, description, skills, budget, deadline, and experience requirements.

Freelancers can discover suitable projects, review project requirements, and submit proposals.

---

## Freelancer Services

Freelancers can independently list services that they provide.

Services contain relevant information such as:

- Service title
- Category
- Description
- Skills
- Pricing
- Delivery time
- Packages
- Work samples

This provides an additional hiring model alongside traditional project proposals.

---

## Skill Verification

NexLance distinguishes between skills declared by freelancers and skills that have been verified through platform assessments.

Verified skills can be displayed on freelancer profiles and considered as an additional factor during freelancer discovery and matching.

---

## Career Score

Career Score is a performance-oriented metric designed to provide a broader view of a freelancer's professional reliability.

The scoring system is planned to consider factors including:

- Client satisfaction
- Work quality
- Timely delivery
- Communication
- Project completion
- Budget adherence
- Verified skills
- Previous project performance

The final scoring methodology will be implemented during the backend development phase.

---

## Proof of Work

Freelancers can showcase completed projects and professional work as evidence of their practical capabilities.

Proof of Work connects a freelancer's:

- Skills
- Completed projects
- Technologies used
- Delivery performance
- Client feedback

This provides clients with additional information beyond self-declared skills.

---

## Smart Matching

NexLance is designed to support intelligent project-to-freelancer and project-to-service matching.

Matching can consider factors such as:

- Required skills
- Verified skills
- Career Score
- Previous work
- Relevant experience
- Service offerings
- Availability

When a project is posted, relevant freelancers and existing services can be identified and surfaced to the client.

Matching opportunities can also be communicated to freelancers whose profiles are relevant to newly posted projects.

The initial implementation will use application-level matching logic and mock data. Advanced AI-based matching is planned as a future enhancement.

---

## Candidate Comparison

Clients can compare shortlisted freelancers using structured professional information including:

- Career Score
- Skill compatibility
- Verified skills
- Client satisfaction
- Timely delivery
- Relevant experience
- Availability

This is intended to make the hiring process more informed and transparent.

---

## Notifications

The platform includes a notification system for important user activities and opportunities.

### Freelancer notifications

- Relevant project opportunities
- Proposal updates
- Shortlisting
- Hiring updates
- Skill assessment results
- Career Score updates

### Client notifications

- New project applications
- Relevant freelancer recommendations
- Shortlisted candidate updates
- Project updates
- Completion and review notifications

---

# Platform Modules

## Public Platform

- Home
- How It Works
- Categories
- Find Work
- Find Talent
- Services
- Authentication

## Freelancer Platform

- Freelancer Dashboard
- Profile
- Skills
- Skill Verification
- Career Score
- Proof of Work
- Services
- Project Discovery
- Applications
- Projects
- Opportunities
- Notifications

## Client Platform

- Client Dashboard
- Profile
- Project Posting
- Projects
- Applications
- Freelancer Discovery
- Service Discovery
- Smart Matches
- Candidate Comparison
- Shortlist
- Project Workspace
- Reviews
- Notifications

---

# Technology Stack

## Phase 1 — Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Mock Data

The first phase focuses on implementing the complete user interface, navigation, responsive layouts, reusable components, forms, and user flows.

## Phase 2 — Data Integration

- React.js
- JSON Server
- REST API

The second phase connects the frontend with structured mock API data and introduces CRUD-based data operations.

## Phase 3 — Backend

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Database
- MySQL

The final phase introduces persistent data storage, backend APIs, authentication, database relationships, business logic, and complete application integration.

---

# Development Roadmap

## Phase 1 — Frontend

- [ ] Project setup
- [ ] Design system
- [ ] Reusable components
- [ ] Public pages
- [ ] Authentication interface
- [ ] Freelancer interface
- [ ] Client interface
- [ ] Service marketplace
- [ ] Skill verification interface
- [ ] Career Score interface
- [ ] Smart matching interface
- [ ] Responsive design
- [ ] Frontend testing

## Phase 2 — JSON Server

- [ ] Data models
- [ ] User data
- [ ] Freelancer profiles
- [ ] Client profiles
- [ ] Projects
- [ ] Services
- [ ] Applications
- [ ] Skills
- [ ] Reviews
- [ ] Notifications
- [ ] CRUD operations
- [ ] API integration

## Phase 3 — Backend & MySQL

- [ ] Node.js and Express setup
- [ ] MySQL database
- [ ] Database schema
- [ ] API architecture
- [ ] Authentication
- [ ] User management
- [ ] Project management
- [ ] Service management
- [ ] Application workflow
- [ ] Hiring workflow
- [ ] Reviews and feedback
- [ ] Career Score calculation
- [ ] Skill verification
- [ ] Notifications
- [ ] Matching logic

---

# Future Scope

Future versions of NexLance can incorporate advanced technologies and additional platform capabilities, including:

- AI-assisted project requirement analysis
- AI-based freelancer matching
- Automated skill evaluation
- Advanced recommendation systems
- Real-time communication
- Payment integration
- Milestone-based project management
- Advanced analytics
- Dispute management
- Personalized freelancer opportunity recommendations

---

# Team

| Member | Responsibility |
|---|---|
| Gurjivan | Public Platform, Authentication, Discovery & Services |
| Yana | Freelancer Platform, Skill Verification & Career Score |
| Kayna | Client Platform, Hiring & Smart Matching |

---

# Project Status

**Status:** In Development

NexLance is being developed incrementally through three phases:

**React Frontend → JSON Server → Node.js / Express.js + MySQL**

---

# License

This project is developed as an academic team project.
