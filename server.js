const express = require('express')

const server = express();

server.use(express.json());

const projectRouter = require("./routes/projectRouter.js")

server.use("/api/projects", projectRouter);



server.get('/', (req, res) => {
    res.send(`<h1>IT'S WORKING!!!</h1>`) 
})



module.exports = server;