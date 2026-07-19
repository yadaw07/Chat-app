This is a real-time chat application built with [React](https://react.dev/) + [Vite](https://vitejs.dev/) on the client and [Express](https://expressjs.com/) + [Socket.IO](https://socket.io/) on the server.

**Live demo:** [Chat app](https://chat-app-dun-theta-42.vercel.app/)

## Getting Started

First, install dependencies and run the server:

```bash
cd server
npm install
npm run dev
```

Then, in a separate terminal, install dependencies and run the client:

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You'll need a MongoDB connection string and a JWT secret set in `server/.env` — see `.env.example` for the required variables. The client also needs `VITE_API_URL` and `VITE_SOCKET_URL` set in `client/.env`, pointing at your running server.

You can start editing the app by modifying `client/src/pages/ChatPage.jsx`. The page auto-updates as you edit the file.

## Features

- Real-time, room-scoped messaging with persisted history
- Create, rename, and delete rooms
- Edit and delete your own messages
- Online presence and per-room member lists
- Typing indicators
- JWT-based authentication

## Learn More

To learn more about the tools used in this project, take a look at the following resources:

- [Socket.IO Documentation](https://socket.io/docs/v4/) - learn about real-time event-based communication.
- [Vite Documentation](https://vitejs.dev/guide/) - learn about the build tool and dev server.
- [Mongoose Documentation](https://mongoosejs.com/docs/) - learn about MongoDB object modeling.

## Deploy

The client deploys to [Vercel](https://vercel.com/) and the server deploys to [Render](https://render.com/) — Vercel's serverless functions don't support the long-lived connections Socket.IO needs, so the two run on separate platforms. Set your production environment variables on each platform, and update `CLIENT_URL` on the server once you have your deployed client URL.
