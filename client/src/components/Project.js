import React from "react";
import axios from "axios";
import Action from "./Action";


class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            actions:[]
        }
    }
    componentDidMount() {
        axios
        .get(`http://localhost:7000/api/projects/${this.props.project.id}/actions`)
        .then(  actions => {
             this.setState({
                 actions : actions.data
             })
            console.log(this.state.actions)
        })
        .catch( error => {
            console.log(error)
        })
    }
    render(){
        return (
            <div className="project_wrapper">
                <h3>{this.props.project.name}</h3>
                <h5>{this.props.project.description}</h5>
                {this.state.actions.map( action => <Action action={action}/>)}
            </div>
        )
    }
    
}

export default Project;