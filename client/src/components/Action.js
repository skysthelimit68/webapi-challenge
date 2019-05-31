import React from "react";
import axios from "axios";

const Action = props => {
    return(
        <div className="action_wrapper">
            <p><span className="bold">Action Description:</span> {props.action.description}</p>
            <p><span className="bold">Action Notes:</span>  {props.action.notes}</p>
            <p><span className="bold">Action Status:</span>  {props.action.completed? "completed" : "incomplete"}</p>
        </div>
    )
}

export default Action;