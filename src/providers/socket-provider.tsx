'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth-store';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinChat: () => {},
  leaveChat: () => {},
});

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { accessToken: token, user } = useAuthStore();

  // Join a chat room
  const joinChat = (chatId: string) => {
    if (socket && isConnected) {
      socket.emit('JOIN_CHAT', { chatId });
    }
  };

  // Leave a chat room
  const leaveChat = (chatId: string) => {
    if (socket && isConnected) {
      socket.emit('LEAVE_CHAT', { chatId });
    }
  };

  useEffect(() => {
    if (!token || !user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5001', {
      auth: {
        token,
      },
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token, user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, joinChat, leaveChat }}>
      {children}
    </SocketContext.Provider>
  );
}
