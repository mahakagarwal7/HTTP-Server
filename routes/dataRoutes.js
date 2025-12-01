const dataController = require("../controllers/dataController");

function handle(req, res, parsedUrl) {

  if(req.method === "GET" && parsedUrl.pathname === "/data") {

       dataController.getAllData(req, res);


  } else if(req.method === "GET" && parsedUrl.pathname.startsWith("/data/")) {

       dataController.getDataById(req, res, parsedUrl);


  } else if(req.method === "POST" && parsedUrl.pathname === "/data") {

       dataController.postData(req, res);


  } else {

       res.writeHead(404, {"Content-Type": "application/json"});
       res.end(JSON.stringify({error: "Not Found"}));

  }

}

module.exports = { handle };
