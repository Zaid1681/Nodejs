const express = require("express");
const app = express();
const fs = require("fs");
const status = require("express-status-monitor");
const zlib = require("zlib"); // built-in package
app.use(status());
// reading data completely
// app.get("/", (req, res) => {
//   fs.readFile("./sample.txt", (err, data) => {
//     res.end(data);
//   });
// });

// creating a zip of data readed in the form of strea, without consuming the data
// Stream Read(smaple.txt) --> insert into Zipper --> create stream
fs.createReadStream("./sample.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);
// reading data in chunks
app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8"); // encoding --> utf-8 --> data is text
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

app.listen(8080, () => {
  console.log("Server Listening on Port", 8080);
});

/**
 Key differences:
  
    ###  res.end():

    It is a low-level method that ends the response process.
    It can only send a string or buffer as the response body.
    You are responsible for ensuring headers are set and the response is properly formatted.
  
    #### res.send():

    A higher-level method for sending the response.
    It automatically sets the correct headers (Content-Type, etc.) based on the data type you provide.
    Can handle a wider variety of data types: strings, objects (which it converts to JSON), arrays, buffers, etc.
    It automatically calls res.end() after sending the response.
  
  
 */
