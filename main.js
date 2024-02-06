var fs = require("fs");
var http = require("http");
var multer = require("multer");

// Set up multer for file uploads with disk storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

var server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("This is Home Page");
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("This is About Page");
    res.end();
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("This is Contact Page");
    res.end();
  } else if (req.url === "/file-write") {
    // Create a file and write text into it
    fs.writeFile("demo.txt", "hello world", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
        res.end();
      } else {
        console.log("File written successfully");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("File written successfully");
        res.end();
      }
    });
  } else if (req.url === "/upload" && req.method === "POST") {
    // Handle file upload
    upload.single("file")(req, res, function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
        res.end();
      } else {
        console.log("File uploaded successfully");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("File uploaded successfully");
        res.end();
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }
});
server.listen(5500);
console.log("Server is running");
