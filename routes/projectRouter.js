const express = require("express");
const router = express.Router();
const projectDB = require("../data/helpers/projectModel.js");
const actionDB = require("../data/helpers/actionModel.js");


//get all projects 

router.get("/", (req, res) => {
    projectDB.get()
    .then( projects => {
        res.status(200).json(projects)
    })
    .catch( error => {
        res.status(500).json({message: "error occurs when trying to retrieve projects"})
    })
})

//get project by id
router.get("/:id", validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

//add project
router.post("/", validateProject, (req, res) => {
    const newProject = {name: req.body.name, description: req.body.description}
    projectDB.insert(newProject)
    .then( project => {
        res.status(201).json(project)
    })
    .catch( error => {
        res.status(500).json({message: "Error occurs when trying to add new project"})
    })
})

//update project 
router.put("/:id", validateProjectId, validateProject, (req, res) => {
    projectDB.update(req.params.id, req.body) 
    .then( project => {
        res.status(200).json(project)
    })
    .catch( error => {
        res.status(500).json({message: "Error occurs when trying to update project"})
    })
})

//deleteing project
router.delete("/:id", validateProjectId, (req, res) => {
    projectDB.remove(req.params.id)
    .then( response => {
        res.status(200).json({message:`${response} record has been deleted` })
    })
    .catch( error => {
        res.status(500).json({message: "Error occurs when trying to delete a project"})
    })
})

router.get("/:id/actions", validateProjectId, (req, res) => {
    projectDB.getProjectActions(req.params.id)
    .then( actions => {
        res.status(200).json(actions)
    })
    .catch( error => {
        res.status(500).json({message: "error occurs when trying to retrieve actions"})
    })
})

//middleware
//check and see if a project exist
function validateProjectId(req, res, next) {
    projectDB.get(req.params.id) 
    .then( project => {
        if(project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({message: "project not found"})
        }
    })
    .catch (error => {
        res.status(500).json({message: "something went wrong"})
    })
}

//validate if name and description of the new project exist
function validateProject(req, res, next) {
    if(req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json({message: "Please provide a name and a description of the project."})
    }
}



module.exports = router;