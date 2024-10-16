// Importing the express module, a framework for building web applications in Node.js
const express = require("express");

// Creating an instance of the express app
const app = express();

// Importing the http module to create an HTTP server
const http = require("http");

// Importing the path module to work with file paths
const path = require("path");

// Middleware to serve static files from the 'public' folder
// This allows the app to serve assets (CSS, JS, images) located in the 'public' directory
app.use(express.static(path.resolve("./public")));

// Creating an HTTP server using the Express app as the request handler
const server = http.createServer(app);

// Importing and setting up Socket.io for real-time communication
const { Server } = require("socket.io");

// Creating a new Socket.io server, which is tied to the HTTP server
const io = new Server(server);

// This runs whenever a new client connects via WebSocket
io.on("connection", (socket) => {
  //   console.log("I am connected with ", socket.id);
  socket.broadcast.emit("hi");

  // Lietening the message from the client
  socket.on("Message", (message) => {
    console.log("user message", message);
    // emit the message to all the connected clients
    io.emit("message", message);
  });
  //   after every reload client send disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Defining a route for the root URL ('/') of the server
app.get("/", (req, res) => {
  // Sending the 'index.html' file located in the root directory of the project
  // __dirname refers to the current directory where the script is running
  res.sendFile(path.join(__dirname, "index.html"));
});

// Starting the server and listening on port 8080 for incoming connections
server.listen(8080, () => {
  // Logging a message to the console when the server starts successfully
  console.log("Server listening on port " + 8080);
});

// const { createServer } = require('node:http');
// const server = createServer();

/**
 * express.static is a built-in middleware function in Express used to serve static files such as HTML, CSS, JavaScript, images, and other assets to the client. Static files are files that don’t change or require processing by the server before being sent to the client.
 *
 */
