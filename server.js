const http = require("http");
const url = require("url");
const dataRoutes = require("./routes/dataRoutes");
const logRequest = require("./middleware/logger");

const PORT = 8080;

const server = http.createServer((req, res) => {

  logRequest(req);

  const parsedUrl = url.parse(req.url, true);

  // root route
  if(parsedUrl.pathname === "/" && req.method === "GET") {
      res.writeHead(200, {"Content-Type": "text/plain"});
      
      res.end("Welcome to Node.js HTTP Server!");

  } else if(parsedUrl.pathname === "/echo" && req.method === "GET") {

      const message = parsedUrl.query.message || "";

      res.writeHead(200, {"Content-Type": "text/plain"});
      res.end(message);


  } else if(parsedUrl.pathname.startsWith("/data")) {

      dataRoutes.handle(req, res, parsedUrl);


  } else {

      res.writeHead(404, {"Content-Type": "text/plain"});
      
      res.end("404 Not Found");

  }

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
