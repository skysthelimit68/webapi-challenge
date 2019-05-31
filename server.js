const express = require('express')
const cors = require('cors')
const server = express();

server.use(express.json());
server.use(cors())

const projectRouter = require("./routes/projectRouter.js")
const actionRouter = require("./routes/actionRouter.js")

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter)


server.get('/', (req, res) => {
    res.send(`<h1>IT'S WORKING!!!</h1>`) 
})



module.exports = server;