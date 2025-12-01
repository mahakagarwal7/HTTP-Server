const { generateId, sendJson, parseJsonSafe } = require("../utils/helpers");

let dataStore = [];

function getAllData(req, res) {

  sendJson(res, 200, dataStore);

}


function getDataById(req, res, parsedUrl) {

   const id = parseInt(parsedUrl.pathname.split("/")[2]);

   const item = dataStore.find(d => d.id === id);

   if(item) {
       sendJson(res, 200, item);
   } else {
       sendJson(res, 404, {error: "Item not found"});
   }

}


function postData(req, res) {

   let body = "";

   req.on("data", chunk => body += chunk);

   req.on("end", () => {

       const obj = parseJsonSafe(body);

       if(!obj) {
           return sendJson(res, 400, {error: "Invalid JSON"});
       }

       obj.id = generateId();

       dataStore.push(obj);

       sendJson(res, 200, {status: "success", id: obj.id});

   });

}

module.exports = { getAllData, getDataById, postData };
