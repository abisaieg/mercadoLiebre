const fs = require("fs")
const path = require("path");

const logFilePath = path.join(__dirname, "../data/historialLogIn.json");

function logMiddleware(req, res, next){
    fs.writeFileSync(logFilePath, JSON.stringify("hola", null, " "))
    next()
}

module.exports = logMiddleware;