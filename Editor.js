import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ReactQuill from "react-quill";  // Importing Quill text editor
import "react-quill/dist/quill.snow.css";  // Importing default Quill theme

// Editor component to display and update the document
const Editor = ({ docId }) => {
  // State to store the document content
  const [text, setText] = useState("");

  // Socket connection state
  const [socket, setSocket] = useState(null);

  // Setup the socket connection on component mount
  useEffect(() => {
    const socketInstance = io("http://localhost:4000");  // Connect to server
    setSocket(socketInstance);  // Store socket instance in state

    // Listen for document changes and update text content
    socketInstance.on("receive_document", (data) => {
      if (data.docId === docId) {
        setText(data.content);  // Update the editor with new content
      }
    });

    // Clean up socket connection on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [docId]);

  // Handle document content change and emit to server
  const handleChange = (value) => {
    setText(value);  // Update the local text state
    if (socket) {
      socket.emit("send_document", { docId, content: value });  // Emit content to server
    }
  };

  return (
    <div>
      {/* ReactQuill editor for text input */}
      <ReactQuill value={text} onChange={handleChange} />
    </div>
  );
};

export default Editor;
