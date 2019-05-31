const express = require("express");
const router = express.Router();
const projectDB = require("../data/helpers/projectModel.js");
const actionDB = require("../data/helpers/actionModel.js");

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
        res.status(500).json("Error occurs when trying to add new project")
    })
})

router.put("/:id", validateProjectId, (req, res) => {
    projectDB.update(req.params.id, req.body) 
    .then( project => {
        res.status(200).json(project)
    })
    .catch( error => {
        res.status(500).json("Error occurs when trying to update project")
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
            res.status(404).json("project not found")
        }
    })
    .catch (error => {
        res.status(500).json("something went wrong")
    })
}

//validate if name and description of the new project exist
function validateProject(req, res, next) {
    if(req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json("Please provide a name and a description of the project.")
    }
}



module.exports = router;