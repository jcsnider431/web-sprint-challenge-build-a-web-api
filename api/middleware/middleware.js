const Actions = require('../actions/actions-model'); 
const Projects = require('../projects/projects-model'); 

const actionId = async (req, res, next) => {
    const { id } = req.params; 
    try{
        const action = await Actions.get(id)
        if (!action){
            res.status(404).json({message: "Action with this ID is not found"}); 
        } else {
            req.action = action; 
            next();
        }
    } catch (error) {
        res.status(500).json(`Server error: ${error.message}`)
    }
};

const projectId = async (req, res, next) => {
    const { id } = req.params; 
    try{
        const project = await Projects.get(id)
        if (!project){
            res.status(404).json({message: "Project with this ID is not found"}); 
        } else {
            req.project = project; 
            next();
        }
    } catch (error) {
        res.status(500).json(`Server error: ${error.message}`)
    }
};
const validateAction = async (req,res,next) => {
    const {project_id, description, notes} = req.body

    try{
        if(!project_id || !description || !notes){
            res.status(400).json({ message: 'Require project_id, description, notes'})
        } else {
            next()
        }
    } catch (err){
        res.status(500).json({ message: `server error: ${err}`})
    }
}
const validateProject = async (req,res,next) => {
    const {name, description} = req.body

    try{
        if(!name || !description){
            res.status(400).json({ message: 'Require name and description'})
        } else {
            next()
        }
    } catch (err){
        res.status(500).json({ message: `server error: ${err}`})
    }
}

module.exports = {
    actionId, 
    projectId,
    validateAction,
    validateProject
}