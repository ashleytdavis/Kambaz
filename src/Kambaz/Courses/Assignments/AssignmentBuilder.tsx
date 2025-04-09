import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addAssignment } from "../Assignments/reducer";
import * as assignmentClient from "./client"


export default function AssignmentBuilder() {
    const { cid } = useParams();
    const dispatch = useDispatch();

    const formatDate = (dateString: string | undefined) => {
        if (!dateString)
            return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    const unformatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options = { month: "short", day: "2-digit" } as const;
        return date.toLocaleDateString("en-US", options);
    };

    const handleCreateAssignment = async () => {
        const createdAssignment = await assignmentClient.createAssignmentForCourse({ ...assignment, course: cid });
        dispatch(addAssignment(createdAssignment))
    };

    const [assignment, setAssignment] = useState(
        {
            title: "",
            course: cid,
            date: "",
            dueDate: "",
            points: "",
            dateAlt: "",
            dueDateAlt: "",
            description: "",
        }
    );

    return (
        <Container className="mt-4">
            <Form>
                <Form.Group className="mb-4">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control type="text" value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Control
                        as="textarea"
                        rows={6}
                        value={assignment.description}
                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Points</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Control type="number" value={assignment?.points}
                            onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Assignment Group</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select>
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Display Grade as</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select>
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="POINT">Points</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Submission Type</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Card>
                            <Card.Body>
                                <Form.Select className="mb-3">
                                    <option value="ONLINE">Online</option>
                                </Form.Select>

                                <Form.Label>Online Entry Options</Form.Label>
                                <Form.Check type="checkbox" label="Text Entry" id="text-entry" />
                                <Form.Check type="checkbox" label="Website URL" id="website-url" checked />
                                <Form.Check type="checkbox" label="Media Recordings" id="media-recordings" />
                                <Form.Check type="checkbox" label="Student Annotation" id="student-annotation" />
                                <Form.Check type="checkbox" label="File Uploads" id="file-uploads" />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Assign</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Card>
                            <Card.Body>
                                <Form.Label>Assign to</Form.Label>
                                <Form.Control type="text" value="Everyone" className="mb-3" />

                                <Form.Label>Due</Form.Label>
                                <Form.Control
                                    defaultValue={formatDate(assignment?.dueDateAlt)}
                                    type="datetime-local"
                                    className="mb-3"
                                    onChange={(e) => {
                                        setAssignment({ ...assignment, dueDateAlt: e.target.value });
                                        setAssignment({ ...assignment, dueDate: unformatDate(e.target.value) });
                                    }}
                                />

                                <Row>
                                    <Col>
                                        <Form.Label>Available from</Form.Label>
                                        <Form.Control
                                            defaultValue={formatDate(assignment?.dateAlt)}
                                            type="datetime-local"
                                            onChange={(e) => {
                                                setAssignment({ ...assignment, dateAlt: e.target.value });
                                                setAssignment({ ...assignment, date: unformatDate(e.target.value) });
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Until</Form.Label>
                                        <Form.Control
                                            defaultValue={formatDate(assignment?.dueDateAlt)}
                                            type="datetime-local"
                                            onChange={(e) => {
                                                setAssignment({ ...assignment, dueDateAlt: e.target.value });
                                                setAssignment({ ...assignment, dueDate: unformatDate(e.target.value) });
                                            }}
                                        />
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <hr />

                <div className="d-flex justify-content-end gap-2">
                    <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                        <Button variant="light">Cancel</Button>
                    </Link>
                    <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                        <Button variant="danger" onClick={handleCreateAssignment}>Save</Button>
                    </Link>
                </div>
            </Form>
        </Container>
    );
}
