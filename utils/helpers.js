let currentId = 0;


function generateId() {
    currentId += 1;
    return currentId;
}


function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data));
}


function parseJsonSafe(str) {
    try {
        return JSON.parse(str);
    } catch (err) {
        return null; 
    }
}

module.exports = { generateId, sendJson, parseJsonSafe };
