---
title: AC-DC Backend API
emoji: 🚀
colorFrom: purple
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
license: apache-2.0
---

# AC-DC Backend API

A production-ready TypeScript/Express backend for the AC-DC application, providing RESTful APIs for products and state management.

## Features

- RESTful API with Express.js
- TypeScript for type safety
- Rate limiting & security headers
- Input validation
- CORS support
- Health check endpoints
- PostgreSQL (Supabase) database support
- MongoDB support via Mongoose

## API Endpoints

- `GET /health` - Health check
- `GET /api/v1/health` - API health check
- `GET /api/v1/products` - List products (paginated)
- `POST /api/v1/products` - Create product
- `GET /api/v1/states` - List states (paginated)
- `POST /api/v1/states` - Create state

## Environment Variables

Configure via Settings tab:
- `NODE_ENV` - Environment mode
- `PORT` - Server port (default: 7860)
- `CORS_ORIGIN` - CORS origin
- `DATABASE_URL` - PostgreSQL connection string
- `MONGO_URI` - MongoDB connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase API key

## Deployment

This Space runs on Docker. Build and deploy via HuggingFace Spaces.

**Hardware:** Small (2vCPU 4GB RAM) - Recommended
**Port:** 7860