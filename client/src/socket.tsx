/** @jsxImportSource theme-ui */
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { settings } from "@/settings";

interface SocketContextType {
  socket: Socket;
  isConnected: boolean;
  createRoom: (room: string) => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
  emitSlideChange: (data: { direction: number; room: string }) => void;
  emitModeChange: (data: { mode: string; room: string }) => void;
  emitHome: (data: { room: string }) => void;
  emitMessage: (data: { payload: any; room: string }) => void;
  availableRooms: string[];
}

const socket = io(
  settings.isLocal ? "ws://localhost:8080" : "https://pitch-f7gm.onrender.com",
  {
    transports: ["websocket"],
  }
);

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("room_list", (rooms: string[]) => {
      setAvailableRooms(rooms);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room_list");
    };
  }, []);

  const createRoom = useCallback((room: string) => {
    socket.emit("create_room", room);
  }, []);

  const joinRoom = useCallback((room: string) => {
    socket.emit("join_room", room);
  }, []);

  const leaveRoom = useCallback((room: string) => {
    socket.emit("leave_room", room);
  }, []);

  const emitSlideChange = useCallback(
    (data: { direction: number; room: string }) => {
      socket.emit("slide", data);
    },
    []
  );

  const emitModeChange = useCallback((data: { mode: string; room: string }) => {
    socket.emit("mode", data);
  }, []);

  const emitHome = useCallback((data: { room: string }) => {
    socket.emit("home", data);
  }, []);

  const emitMessage = useCallback((data: { payload: any; room: string }) => {
    socket.emit("message", data);
  }, []);

  const value = {
    socket,
    isConnected,
    createRoom,
    joinRoom,
    leaveRoom,
    emitSlideChange,
    emitModeChange,
    emitHome,
    emitMessage,
    availableRooms,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
