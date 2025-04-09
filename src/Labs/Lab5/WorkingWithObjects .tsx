import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: "0",
        name: "Database Design",
        description: "Learning to design a database for a web application",
        course: "CS3200"
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <div className="d-flex flex-column align-items-start">
                <a id="wd-retrieve-assignments" className="btn btn-primary mb-2" 
                    href={`${ASSIGNMENT_API_URL}`}>
                    Get Assignment
                </a>
                <a id="wd-retrieve-modules" className="btn btn-primary"
                    href={`${MODULE_API_URL}`}>
                    Get Module
                </a>
            </div>
            <hr />
            <h4>Retrieving Properties</h4>
            <div className="d-flex flex-column align-items-start">
                <a id="wd-retrieve-assignment-title" className="btn btn-primary mb-2"
                    href={`${ASSIGNMENT_API_URL}/title`}>
                    Get Title
                </a>
                <a id="wd-retrieve-module-name" className="btn btn-primary"
                    href={`${MODULE_API_URL}/name`}>
                    Get Module Name
                </a>
            </div>
            <hr />
            <h4>Modifying Properties</h4>
            <div className="d-flex">
                <FormControl className="w-75 mb-2 me-4" id="wd-assignment-title"
                    defaultValue={assignment.title} onChange={(e) =>
                        setAssignment({ ...assignment, title: e.target.value })} />
                <a id="wd-update-assignment-title"
                    className="btn btn-primary float-end mb-3"
                    href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                    Update Assignment Title
                </a>
            </div>
            <div className="d-flex">
                <FormControl className="w-75 mb-2 me-4" id="wd-assignment-score" type="number"
                    defaultValue={assignment.score} onChange={(e) =>
                        setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
                <a id="wd-update-assignment-score"
                    className="btn btn-primary float-end mb-3"
                    href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                    Update Assignment Score
                </a>
            </div>
            <div className="d-flex">
                <FormCheck className="mb-2 me-4" id="wd-assignment-completed"
                    type="checkbox" label="Completed"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })} />
                <a id="wd-update-assignment-completed"
                    className="btn btn-primary float-end mb-3"
                    href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                    Update Assignment Completed
                </a>
            </div>

            <hr />
            <div className="d-flex">
                <FormControl className="w-75 mb-2 me-4" id="wd-module-name"
                    defaultValue={module.name} onChange={(e) =>
                        setModule({ ...module, name: e.target.value })} />
                <a id="wd-update-module-name"
                    className="btn btn-primary float-end mb-3"
                    href={`${MODULE_API_URL}/name/${module.name}`}>
                    Update Module Name
                </a>
            </div>
            <div className="d-flex">
                <FormControl className="w-75 mb-2 me-4" id="wd-module-description"
                    defaultValue={module.description} onChange={(e) =>
                        setModule({ ...module, description: e.target.value })} />
                <a id="wd-update-module-description"
                    className="btn btn-primary float-end mb-3"
                    href={`${MODULE_API_URL}/description/${module.description}`}>
                    Update Module Description
                </a>
            </div>
        </div>
    );
}