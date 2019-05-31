import React from "react";
import axios from "axios";
import Project from "./Project";

class Projects extends React.Component {
    constructor() {
        super();
        this.state = {
            projects :[]
        }
    }
    componentDidMount() {
        axios
            .get("http://localhost:7000/api/projects/")
            .then(projects => {
                this.setState({
                    projects : projects.data
                })
                console.log(this.state.projects)
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        return(
            <div>
                {this.state.projects.map(project => <Project project={project} />)}
            </div>
        )
    }
}

export default Projects;