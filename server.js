const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const Document = require("./models/Document");  // Mongoose model for documents

// Initialize Express app
const app = express();
const server = http.createServer(app);  // HTTP server for socket.io
const io = socketIo(server);  // Initialize socket.io with the server

// Connect to MongoDB database (replace with your MongoDB URI if necessary)
mongoose.connect("mongodb://localhost:27017/real-time-editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Handle socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for changes from frontend and update the document
  socket.on("send_document", async (data) => {
    const { docId, content } = data;

    // Save the updated document content to MongoDB
    await Document.findOneAndUpdate(
      { _id: docId },
      { content },
      { new: true, upsert: true }
    );

    // Broadcast the updated document to all connected clients
    io.emit("receive_document", { docId, content });
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Example route for testing API
app.get("/", (req, res) => {
  res.send("Real-Time Collaborative Editor API");
});

// Start the server on port 4000
server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
