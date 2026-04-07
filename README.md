Stripe Chat App - Technical Assessment

Overview

This project is a SaaS-style chat application built with Next.js (frontend), Express + Socket.IO (backend), MongoDB Atlas (database), and Stripe (billing). Free users can read messages, while Pro users can send messages in real time. The app is deployed with the frontend on Vercel and the backend on Render.

Tech Stack

Frontend: Next.js (React framework)

Backend: Express.js + Socket.IO

Database: MongoDB Atlas

Payments: Stripe (test mode)

Deployment: Vercel (frontend), Render (backend)

Architecture & Decisions

Database (MongoDB Atlas): Chosen for its flexible schema, easy cloud hosting, and strong ecosystem support. It allows quick prototyping and scaling without complex setup.

Real-time (Socket.IO): Selected for its seamless integration with Express and reliable WebSocket support. It simplifies broadcasting messages to all connected clients.

Features

Authentication: JWT-based login with cookies, session persists on refresh.

Subscriptions: Stripe integration with Free and Pro tiers.

Chat: Real-time global chat room. Free users can read, Pro users can send.

Deployment: Next.js on Vercel, Express backend on Render, MongoDB Atlas.

Environment Variables

Set these in .env.local (Next.js) and in Render (backend):

MONGO_URI → MongoDB Atlas connection string

JWT_SECRET → Secret key for JWT signing

STRIPE_SECRET_KEY → Stripe API key (test mode)

NEXT_PUBLIC_BACKEND_URL → Backend URL (Render deployment)

Local Development

Start MongoDB (Atlas or local).

Run backend:

cd server
npm install
npm run dev

Backend runs on http://localhost:5000.

Run frontend:

cd app
npm install
npm run dev

Frontend runs on http://localhost:3000.

Login/Register → Cookie is set.

Chat → Free users read, Pro users send.

Deployment

Backend (Express + Socket.IO)

Deploy to Render.

Build Command: npm install && npm run build

Start Command: npm run start

Environment variables: MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY.

Render assigns a public URL (e.g. https://myapp-backend.onrender.com).

Frontend (Next.js)

Deploy to Vercel.

Connect GitHub repo.

Set environment variables in Vercel dashboard:

NEXT_PUBLIC_BACKEND_URL=https://myapp-backend.onrender.com

JWT_SECRET, STRIPE_SECRET_KEY (if needed client-side).

Stripe Testing

Use the following Stripe test card:

4242 4242 4242 4242
Exp: any future date
CVC: any 3 digits

Known Limitations & Improvements

Registration route not yet implemented.

Stripe subscription cancellation not fully wired to billing portal.

Socket.IO proxying through Next.js could be added for same-origin WebSocket traffic.

UI is minimal; could be improved with better styling and responsiveness.

License

MIT