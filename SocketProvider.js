import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

// Create a context to hold the socket connection
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);  // Custom hook to access socket context
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // Setup socket connection
  useEffect(() => {
    const socketInstance = io("http://localhost:4000");  // Connect to the server
    setSocket(socketInstance);  // Store the socket connection

    // Cleanup socket connection on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}  {/* Render child components with socket context */}
    </SocketContext.Provider>
  );
};
