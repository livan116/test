import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store active users and their socket connections
const activeUsers = new Map();
const waitingUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user:join', ({ userId, preferences }) => {
    activeUsers.set(socket.id, { userId, preferences });
    findMatch(socket);
  });

  socket.on('offer', ({ to, offer }) => {
    socket.to(to).emit('offer', { from: socket.id, offer });
  });

  socket.on('answer', ({ to, answer }) => {
    socket.to(to).emit('answer', { from: socket.id, answer });
  });

  socket.on('ice-candidate', ({ to, candidate }) => {
    socket.to(to).emit('ice-candidate', { from: socket.id, candidate });
  });

  socket.on('chat:message', ({ to, message }) => {
    socket.to(to).emit('chat:message', { from: socket.id, message });
  });

  socket.on('disconnect', () => {
    const peer = [...activeUsers.entries()]
      .find(([_, user]) => user.peerId === socket.id)?.[0];
    
    if (peer) {
      io.to(peer).emit('peer:left');
    }
    
    activeUsers.delete(socket.id);
    waitingUsers.delete(socket.id);
  });
});

function findMatch(socket) {
  const user = activeUsers.get(socket.id);
  
  for (const [waitingId, waitingUser] of waitingUsers) {
    if (isCompatibleMatch(user, waitingUser)) {
      // Match found
      socket.emit('match:found', { peerId: waitingId });
      io.to(waitingId).emit('match:found', { peerId: socket.id });
      
      activeUsers.get(socket.id).peerId = waitingId;
      activeUsers.get(waitingId).peerId = socket.id;
      
      waitingUsers.delete(waitingId);
      return;
    }
  }
  
  // No match found, add to waiting list
  waitingUsers.set(socket.id, user);
}

function isCompatibleMatch(user1, user2) {
  if (!user1 || !user2) return false;
  
  const { gender: gender1, genderPreference: pref1 } = user1.preferences;
  const { gender: gender2, genderPreference: pref2 } = user2.preferences;
  
  return (pref1 === 'any' || pref1 === gender2) && 
         (pref2 === 'any' || pref2 === gender1);
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});