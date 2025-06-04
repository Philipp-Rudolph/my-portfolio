# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Build for production**: `npm run build` - Creates production build in `/dist`
- **Preview production build**: `npm run preview` - Serves production build locally

## Docker Commands

- **Build and run**: `docker-compose up --build` - Builds and runs the application on port 8081
- **Background mode**: `docker-compose up -d` - Runs in detached mode

## Architecture Overview

This is a Vue 3 single-page portfolio application built with Vite. The architecture follows a section-based layout pattern:

### Project Structure
- **Main App**: `App.vue` serves as the root component with global state management for scroll behaviors, page loading, and cursor trail effects
- **Sections**: Located in `/src/sections/` - each represents a major page section (Hero, About, Projects, Experience, Contact)
- **Components**: Reusable UI components in `/src/components/` (Header, Footer)
- **Data**: Portfolio content stored as JSON in `/src/assets/data/` (experience.json, projects.json)
- **Styling**: Custom CSS using CSS variables with imported Array and Chillax fonts

### Key Features
- **Single Page Layout**: All sections rendered in `App.vue` with scroll-based interactions
- **Global State**: Scroll position tracking, back-to-top button visibility, and cursor trail animations managed in the root component
- **Custom Fonts**: Array and Chillax font families with proper web font loading
- **Animations**: Viewport-based animations using utilities in `/src/utils/animations.js`
- **Docker Deployment**: Multi-stage build with Nginx serving static files

### Important Implementation Details
- Uses Vue 3 Composition API with `<script setup>` syntax
- Path aliasing configured: `@` maps to `/src`
- CSS variables for theming with primary color `--primary` (teal/turquoise)
- Cursor trail effect creates large blurred background blobs following mouse movement
- Page loader with fade-out animation on mount
- Responsive design with mobile-first approach

### Content Management
Portfolio content is stored in JSON files and can be updated by editing:
- `/src/assets/data/experience.json` - Work experience and education
- `/src/assets/data/projects.json` - Project portfolio with technologies and links

### Deployment
The application is containerized with nginx serving the built static files. The production build removes development dependencies and serves optimized assets.