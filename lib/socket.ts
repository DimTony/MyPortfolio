// lib/socket.ts
import { Server, Socket } from 'socket.io';
import { IncomingMessage } from 'http';
import prisma from './prisma';

// Type for chatMessage event payload from client (guest)
interface ChatMessagePayload {
  message: string;
  guestName: string;
}

// Type for adminMessage event payload from admin
interface AdminMessagePayload {
  message: string;
  sessionId: string;
}

let io: Server | undefined;

/**
 * Extracts sessionId safely from query
 */
function getSessionId(socket: Socket): string | undefined {
  const rawSessionId = socket.handshake.query.sessionId;
  if (Array.isArray(rawSessionId)) {
    return rawSessionId[0];
  }
  if (typeof rawSessionId === 'string') {
    return rawSessionId;
  }
  return undefined;
}

/**
 * Initializes socket.io server with event handlers
 */
export function initSocket(server: any): Server {
  io = new Server(server);

  io.on('connection', (socket: Socket) => {
    const sessionId = getSessionId(socket);
    if (!sessionId) {
      console.warn('Connection rejected: invalid or missing sessionId');
      socket.disconnect(true);
      return;
    }

    console.log(`New client connected: ${sessionId}`);

    socket.join(sessionId);

    // Guest sends chat message
    socket.on('chatMessage', async (payload: ChatMessagePayload) => {
      if (
        !payload ||
        typeof payload.message !== 'string' ||
        typeof payload.guestName !== 'string'
      ) {
        console.warn('Invalid chatMessage payload:', payload);
        return;
      }

      try {
        //@ts-ignore
        const chatMessage = await prisma.chatMessage.create({
          data: {
            content: payload.message,
            guestName: payload.guestName,
            sessionId,
            isFromAdmin: false,
          },
        });

        // Broadcast to all admins except sender (admins must join 'admin' room)
        socket.to('admin').emit('chatMessage', {
          ...chatMessage,
          sessionId,
        });
      } catch (error) {
        console.error('Error saving chat message:', error);
      }
    });

    // Admin sends message to a specific client session
    socket.on('adminMessage', async (payload: AdminMessagePayload) => {
      if (
        !payload ||
        typeof payload.message !== 'string' ||
        typeof payload.sessionId !== 'string'
      ) {
        console.warn('Invalid adminMessage payload:', payload);
        return;
      }

      try {
        //@ts-ignore
        const chatMessage = await prisma.chatMessage.create({
          data: {
            content: payload.message,
            sessionId: payload.sessionId,
            isFromAdmin: true,
          },
        });

        io?.to(payload.sessionId).emit('chatMessage', chatMessage);
      } catch (error) {
        console.error('Error saving admin message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${sessionId}`);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}
