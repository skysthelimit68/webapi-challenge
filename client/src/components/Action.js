import React from "react";
import axios from "axios";

const Action = props => {
    return(
        <div>
            <p>Action Description: {props.action.description}</p>
            <p>Action Notes: {props.action.notes}</p>
            <p>Action Status: {props.action.completed? "completed" : "incomplete"}</p>
        </div>
    )
}

export default Action;