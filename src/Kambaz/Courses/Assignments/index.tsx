import { ListGroup, Button } from "react-bootstrap";
import { BsGripVertical, BsCaretDownFill, BsSearch, BsPlusLg } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import AssignmentControlButtonGroup from "./AssignmentControlButtonGroup";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import FacultyContent from "../../FacultyContent";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import { setAssignments } from "./reducer";
import { useEffect } from "react";

export default function Assignments() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="position-relative w-25">
                    <BsSearch className="position-absolute top-50 translate-middle-y text-secondary" style={{ left: "12px" }} />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="form-control ps-5"
                    />
                </div>
                <FacultyContent>
                    <div>
                        <button className="btn btn-light me-2">
                            <BsPlusLg className="me-1" />
                            Group
                        </button>
                        <Link to={`/Kambaz/Courses/${cid}/Assignments/Builder`}>
                            <Button variant="danger">
                                <BsPlusLg className="me-1" />
                                Assignment
                            </Button>
                        </Link>
                    </div>
                </FacultyContent>
            </div>

            <ListGroup className="rounded-0">
                <ListGroup.Item className="p-0">
                    <div className="d-flex align-items-center bg-light p-3">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2" />
                            <BsCaretDownFill className="me-2" />
                            <span className="fw-bold">ASSIGNMENTS</span>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                            <span className="rounded-pill border border-secondary px-3 py-1 me-2">
                                40% of Total
                            </span>
                            <BsPlusLg className="me-2 fs-5" />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>

                    <ListGroup className="rounded-0">
                        {assignments
                            .filter((assignment: any) => assignment.course === cid)
                            .map((assignment: any) => (
                                <ListGroup.Item
                                    key={assignment._id}
                                    className="border-1"
                                >
                                    <div className="d-flex align-items-center py-2">
                                        <BsGripVertical className="me-2 text-secondary" />
                                        <FaRegListAlt className="me-2 text-success" />
                                        <div className="flex-grow-1">
                                            <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                                                className="wd-assignment-link fw-bold text-decoration-none text-dark" >
                                                {assignment.title}
                                            </a>
                                            <br />
                                            <small>
                                                <span className="text-danger">Multiple Modules</span>
                                                <span className="text-secondary"> | Not available until {assignment.date} at 12:00am |</span>
                                                <br />
                                                <span className="text-secondary">Due {assignment.dueDate} at 11:59pm | {assignment.points} pts</span>
                                            </small>
                                        </div>
                                        <AssignmentControlButtonGroup assignmentID={assignment._id} />
                                    </div>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
