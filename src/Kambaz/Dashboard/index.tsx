import { Link } from "react-router-dom";
import { Button, Card, Col, Row, FormControl } from "react-bootstrap";
import FacultyContent from "../FacultyContent";
import { useEffect, useState } from "react";
import StudentContent from "../StudentContent";
import { FaFilePen } from "react-icons/fa6";
import { FaRegFolder } from "react-icons/fa";
import * as assignmentClient from '../Courses/Assignments/client'

export default function Dashboard(
    { courses, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
        courses: any[]; addNewCourse: (course: any) => void; deleteCourse: (courseId: string) => void;
        updateCourse: (course: any) => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
        updateEnrollment: (courseId: string, enrolled: boolean) => void;
    }) {
    const [course, setCourse] = useState<any>({});
    const [courseAssignments, setCourseAssignments] = useState<{ [key: string]: any[] }>({});
    const fetchAssignmentsForCourse = async (courseId: string) => {
        try {
            const allAssignments = await assignmentClient.getAssignmentsForCourse(courseId);
            setCourseAssignments((prev) => ({
                ...prev,
                [courseId]: allAssignments,
            }));
        } catch {
            setCourseAssignments((prev) => ({
                ...prev,
                [courseId]: [],
            }));
        }
    };

    const handleAddCourse = () => {
        addNewCourse(course);
        setCourse({});
    };

    const handleUpdateCourse = () => {
        updateCourse(course);
        setCourse({});
    };

    useEffect(() => {
        if (courses.length > 0) {
            courses.forEach((course) => {
                fetchAssignmentsForCourse(course._id);
            });
        }
    }, [courses]);

    return (
        <div id="wd-dashboard" className="px-5 py-4">
            <div>
                <h1 id="wd-dashboard-title" className="fw-bold">Dashboard
                    <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                        {enrolling ? "My Courses" : "All Courses"}
                    </button>
                </h1> <hr />
                <FacultyContent>
                    <h5>New Course
                        <button className="btn btn-danger float-end"
                            id="wd-add-new-course-click"
                            onClick={handleAddCourse}> Add </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={handleUpdateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5>
                    <br />
                    <FormControl value={course.name || ''} className="mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <FormControl value={course.description || ''}
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </FacultyContent>
                <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
                <div id="wd-dashboard-courses">
                    <Row xs={1} md={5} className="g-4">
                        {courses.map((course) => (
                            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                                <Card>
                                    <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark">
                                        <Card.Img src={course.image_filepath} variant="top" width="100%" height={160} />
                                        <Card.Body className="card-body">
                                            <Card.Title className="wd-dashboard-course-title text-fit overflow-hidden fw-semibold">
                                                {course.name}
                                            </Card.Title>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <FaRegFolder />
                                                <Link to={`/Kambaz/Courses/${course._id}/Assignments`} className="text-decoration-none text-dark hover-red">
                                                    <FaFilePen />
                                                </Link>
                                            </div>
                                            <Card.Text className="fw-bold">Due</Card.Text>
                                            {courseAssignments[course._id]?.length > 0 ? (
                                                courseAssignments[course._id]
                                                    .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                                                    .slice(0, 3)
                                                    .map((assignment: any) => (
                                                        <div key={assignment._id} className="mb-2 d-flex justify-content-between">
                                                            {/* Change this route if assignment ever gets a preview page */}
                                                            <Link to={`/Kambaz/Courses/${course._id}/Assignments`} className="text-decoration-none">
                                                                <p className="mb-1 text-dark">{assignment.title || "Untitled Assignment"}</p>
                                                            </Link>
                                                            <p className="text-secondary mb-0 text-dark fw-bold">{new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}</p>
                                                        </div>
                                                    ))
                                            ) : (
                                                <p>None</p>
                                            )}
                                            <div className="d-flex justify-content-between">
                                                <FacultyContent>
                                                    <Button id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-danger me-2">
                                                        Edit
                                                    </Button>
                                                    <Button onClick={(event) => {
                                                        event.preventDefault();
                                                        deleteCourse(course._id);
                                                    }} className="btn btn-danger float-end"
                                                        id="wd-delete-course-click">
                                                        Delete
                                                    </Button>
                                                </FacultyContent>
                                                <StudentContent>
                                                    {enrolling && (
                                                        <button onClick={(event) => {
                                                            event.preventDefault();
                                                            updateEnrollment(course._id, !course.enrolled);
                                                        }}
                                                            className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}>
                                                            {course.enrolled ? "Unenroll" : "Enroll"}
                                                        </button>
                                                    )}
                                                </StudentContent>
                                            </div>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div >
    );
}