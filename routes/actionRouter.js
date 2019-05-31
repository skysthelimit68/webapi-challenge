const express = require("express");
const router = express.Router();
const projectDB = require("../data/helpers/projectModel.js");
const actionDB = require("../data/helpers/actionModel.js");



router.get("/:id", validateActionId, (req, res) => {
    res.status(200).json(req.body.action);
})

router.post("/", validateProjectId, validateAction, (req, res) => {
    const newAction = { project_id : req.body.project_id, description : req.body.description, notes : req.body.notes }
    actionDB.insert(newAction)
    .then( response => {
        res.status(201).json(response);
    }) 
    .catch( error => {
        res.status(500).json({message: "error occured when trying to add an action"})
    })
})

router.delete("/:id", validateActionId, (req, res) => {
    actionDB.remove(req.params.id) 
    .then( response => {
        res.status(200).json({message: `${response} action has been removed`})
    })
    .catch( error => {
        res.status(500).json({message: "error occured when trying to remove an action"})
    })
})


//middleware
//check and see if a project exist
function validateProjectId(req, res, next) {
    projectDB.get(req.body.project_id) 
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

//validate action id exist
function validateActionId(req, res, next) {
    actionDB.get(req.params.id)
    .then( action => {
        if(action) {
            req.body.action = action;
            next()
        } else {
            res.status(404).json({message: "action not found"})
        }
    })
    .catch( error => {
        res.status(500).json({message: "error occured when searching for action"})
    })
}

//validate project description and notes are in the new action post request body
function validateAction(req, res, next) {
    if(req.body.description && req.body.notes) {
        next();
    } else {
        res.status(400).json({message: "please provide a description for this action"})
    }
}

module.exports = router;