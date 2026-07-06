# DTube Backend

## Project Overview

This is the backend API for a DTube-style video sharing application built with Express, TypeScript, MongoDB, and WebSocket chat. It supports authentication, video upload and streaming, comments, likes, subscriptions, admin moderation, and live chat.

## Features

- Authentication: register, login, JWT authentication, protected routes
- Forgot password / reset password flows
- Video upload using Multer
- Video streaming with HTTP Range requests
- Comments, likes, subscriptions
- Admin moderation: user ban/unban, video block/unblock, comment hide/unhide, delete operations
- Live chat per video using `ws`
- Security: `helmet`, `cors`, and request rate limiting
- Global error handler with consistent API responses

## Folder Structure

- `src/`
  - `app.ts` - Express app configuration
  - `server.ts` - HTTP server initialization and WebSocket server setup
  - `config/` - database and Multer upload configuration
  - `controllers/` - request handlers
  - `middleware/` - authentication, admin access, error handling, rate limiting
  - `models/` - Mongoose schemas and models
  - `routes/` - API routes
  - `services/` - business logic and database access
  - `utils/` - WebSocket chat utilities
- `uploads/` - stored video and thumbnail files

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Videos
- `POST /api/videos/` - upload a video (authenticated)
- `GET /api/videos/` - list videos
- `GET /api/videos/trending` - trending videos
- `GET /api/videos/stream/:id` - stream video content
- `GET /api/videos/:id` - get a single video
- `PUT /api/videos/:id` - update a video (authenticated)
- `DELETE /api/videos/:id` - delete a video (authenticated)
- `POST /api/videos/:id/like` - like a video (authenticated)
- `DELETE /api/videos/:id/like` - unlike a video (authenticated)
- `GET /api/videos/:id/likes` - get like count

### Comments
- `POST /api/comments/` - create a comment (authenticated)
- `GET /api/comments/:videoId` - list comments for a video
- `PUT /api/comments/:id` - update a comment (authenticated)
- `DELETE /api/comments/:id` - delete a comment (authenticated)

### Subscriptions
- `POST /api/subscribe/:userId` - subscribe to a channel
- `DELETE /api/subscribe/:userId` - unsubscribe from a channel
- `GET /api/subscriptions` - get subscriptions

### Admin
- `GET /api/admin/users`
- `GET /api/admin/videos`
- `GET /api/admin/comments`
- `PATCH /api/admin/users/:id/ban`
- `PATCH /api/admin/users/:id/unban`
- `PATCH /api/admin/videos/:id/block`
- `PATCH /api/admin/videos/:id/unblock`
- `PATCH /api/admin/comments/:id/hide`
- `PATCH /api/admin/comments/:id/unhide`
- `DELETE /api/admin/videos/:id`
- `DELETE /api/admin/comments/:id`

## Authentication

Protected routes require a `Bearer` JWT token in the `Authorization` header.

## Video Streaming

Video streaming uses HTTP Range requests to support partial loading and smooth playback.

## Live Chat

WebSocket live chat is exposed at `ws://<host>:<port>/ws`.
Send a query string `videoId` and optionally `username` to join a video room.

Example:

`ws://localhost:5001/ws?videoId=VIDEO_ID&username=Guest`

## Setup Instructions

1. Copy `.env.example` to `.env`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server in development:
   ```bash
   npm run dev
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## Environment Variables

- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `DTUBE_CONSTELLATION_Conspiracy_SECRET` - JWT secret
