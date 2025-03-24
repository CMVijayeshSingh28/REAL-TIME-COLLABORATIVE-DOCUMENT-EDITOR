const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

// Export Document model for interaction with MongoDB
module.exports = mongoose.model("Document", DocumentSchema);
