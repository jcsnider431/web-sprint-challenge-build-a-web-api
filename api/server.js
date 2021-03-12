const express = require('express');
const server = express();
const helmet = require('helmet');
const actionsRouter = require('./actions/actions-router'); 
const projectsRouter = require('./projects/projects-router'); 

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(helmet());
server.use(express.json()); 
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
res.send('<h2>Its Alive!!!!!!</h2>')
})

module.exports = server;
