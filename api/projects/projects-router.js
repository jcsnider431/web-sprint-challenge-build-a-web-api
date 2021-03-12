// Write your "projects" router here!
const express = require('express'); 
const Projects = require('./projects-model'); 
const mw = require('../middleware/middleware'); 

const router = express.Router()

router.get('/', (req, res, next) => {
Projects.get()
.then(projects => {
  res.status(200).json(projects)
})
.catch(error => {
  next(error)
})
})

router.get('/:id',mw.projectId, (req, res) => {
 Projects.get(req.params.id)
    .then(project => {
     if (project) {
        res.status(200).json(project)
    } else {
        res.status(404).json({message: 'not found'})
    }
    })
    .catch(error => {
        res.status(500).json({message: `Server error: ${error}`})
    })
})


router.post('/', mw.validateProject, (req, res, next) => {
Projects.insert(req.body)
  .then(project => {
    res.status(200).json(project)
  })
  .catch(error => {
    next(error);
  })
})

router.put('/:id', mw.projectId, mw.validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
  .then(project=> {
    res.status(201).json(project)
  })
  .catch(error => {
    next(error);
  })
})

router.delete('/:id', mw.projectId, (req, res, next) => {
  Projects.remove(req.params.id)
  .then(project => {
    res.status(200).json()
  })
  .catch(error => {
    next(error)
  })
})

router.get('/:id/actions', mw.projectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
  .then(actions => {
    res.status(200).json(actions)
  })
  .catch(error => {
    next(error)
  })
})

router.use((err, req, res, next) => {
    res.status(500).json({
      message: "Oh No something went wronge",
      error: err.message,
    });
  });

module.exports= router;