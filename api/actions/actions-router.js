// Write your "actions" router here!
const express = require('express'); 
const Actions = require('./actions-model'); 
const mw = require('../middleware/middleware'); 

const router = express.Router(); 

router.get('/', (req, res, next) => {
Actions.get()
.then(actions => {
  res.status(200).json(actions)
})
.catch(error => {
  next(error)
})
});

router.get('/:id', mw.actionId, (req, res) => {
    res.status(200).json(req.action)
});

router.post('/',mw.actionId, mw.validateAction, (req, res, next) => {
  const { project_id, description, notes } = req.body; 
  if(!project_id || !description || !notes){
    res.status(400).json({message:"Requires project id, description and notes"})
  } else {
    Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      next(error);
    })
  }
})

router.put('/:id', mw.actionId, mw.validateAction, (req, res, next) => {
Actions.update(req.params.id, req.body)
.then(action => {
  res.status(201).json(action)
})
.catch(error => {
  next(error)
})
})

router.delete('/:id', mw.actionId, (req, res, next) => {
  Actions.remove(req.params.id)
  .then(actions => {
    res.status(200).json()
  })
  .catch(error => {
    next(error)
  })
})

router.use((err, req, res, next) => {
    res.status(500).json({
      message: "Oh No something went wronge!",
      error: err.message, 
    });
  });

module.exports = router; 