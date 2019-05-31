const express = require("express");
const router = express.Router();
const projectDB = require("../data/helpers/projectModel.js");
const actionDB = require("../data/helpers/actionModel.js");



router.get("/:id", validateActionId, (req, res) => {
    res.status(200).json(req.body.action);
})


//middleware
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

module.exports = router;