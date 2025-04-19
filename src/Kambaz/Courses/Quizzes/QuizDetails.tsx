import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Spinner, Table, Button } from "react-bootstrap";
import * as quizClient from "../Quizzes/client";


function formatTimeLimit(timeLimit: { hours?: number; minutes?: number } | undefined) {
    const hours = timeLimit?.hours ?? 0;
    const minutes = timeLimit?.minutes ?? 20;
    if (hours === 0) return `${minutes} Minutes`;
    return `${hours} Hours ${minutes} Minutes`;
}

function formatDateShort(dateStr?: string | Date | null) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: undefined,
        hour12: true,
    }).replace(",", "");
}

export default function QuizDetails() {
    const { quidId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQuiz() {
            try {
                const data = await quizClient.getQuizById(quidId!);
                setQuiz(data);
            } catch (e) {
                setError("Failed to load quiz data.");
            } finally {
                setLoading(false);
            }
        }
        fetchQuiz();
    }, [quidId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center my-5">
                <Spinner animation="border" role="status" />
                <span className="ms-2">Loading quiz details...</span>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger my-5">{error}</div>;
    }

    if (!quiz) {
        return <div className="alert alert-warning my-5">Quiz not found.</div>;
    }

    const handlePreview = () => {
        navigate(`/Kambaz/Courses/${quiz.courseId}/Quizzes/${quidId}/Preview`);
    };

    const handleEdit = () => {
        navigate(`/Kambaz/Courses/${quiz.courseId}/Quizzes/${quidId}/Editor`);
    };

    const quizType = quiz.type ?? "Graded Quiz";
    const assignmentGroup = (quiz.assignmentGroup ?? "Quizzes").toUpperCase();
    const shuffleAnswers = quiz.shuffleAnswers ?? false;
    const timeLimit = quiz.timeLimit ?? { hours: 0, minutes: 30 };
    const multipleAttempts = quiz.multipleAttempts ?? false;
    const maxAttempts = quiz.maxAttempts ?? 1;
    const showCorrectAnswers = quiz.showCorrectAnswers ?? false;
    const accessCode = quiz.accessCode ?? "";
    const oneQuestionAtATime = quiz.oneQuestionAtATime ?? true;
    const webcamRequired = quiz.webcamRequired ?? false;
    const lockQuestions = quiz.lockQuestions ?? false;
    const dueDate = quiz.dueDate;
    const availableDate = quiz.availableDate;
    const untilDate = quiz.untilDate;
    const totalPoints = quiz.points


    return (
        <Card className="mx-auto my-4 p-4" style={{ maxWidth: 600, fontSize: "0.9rem", fontFamily: "Arial, sans-serif" }}>
            <div className="d-flex justify-content-end mb-3">
                <Button
                    variant="outline-danger"
                    className="me-2"
                    onClick={handlePreview}
                >
                    Preview
                </Button>
                <Button
                    variant="outline-danger"
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            </div>

            <h5 className="mb-3 fw-bold">{quiz.title}</h5>

            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Quiz Type</Col>
                <Col xs={6}>{quizType}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Points</Col>
                <Col xs={6}>{totalPoints}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Assignment Group</Col>
                <Col xs={6}>{assignmentGroup}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Shuffle Answers</Col>
                <Col xs={6}>{shuffleAnswers ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Time Limit</Col>
                <Col xs={6}>{formatTimeLimit(timeLimit)}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Multiple Attempts</Col>
                <Col xs={6}>{multipleAttempts ? "Yes" : "No"}</Col>
            </Row>
            {multipleAttempts && (
                <Row className="mb-1" style={{ fontWeight: "bold" }}>
                    <Col xs={6}>How Many Attempts</Col>
                    <Col xs={6}>{maxAttempts}</Col>
                </Row>
            )}
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>View Responses</Col>
                <Col xs={6}>Always</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Show Correct Answers</Col>
                <Col xs={6}>{showCorrectAnswers ? "Immediately" : "No"}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>One Question at a Time</Col>
                <Col xs={6}>{oneQuestionAtATime ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Require Respondus LockDown Browser</Col>
                <Col xs={6}>No</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Required to View Quiz Results</Col>
                <Col xs={6}>No</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Webcam Required</Col>
                <Col xs={6}>{webcamRequired ? "Yes" : "No"}</Col>
            </Row>
            <Row className="mb-1" style={{ fontWeight: "bold" }}>
                <Col xs={6}>Lock Questions After Answering</Col>
                <Col xs={6}>{lockQuestions ? "Yes" : "No"}</Col>
            </Row>

            <hr />

            <Table borderless size="sm" className="mb-0" style={{ fontSize: "0.85rem" }}>
                <thead>
                    <tr>
                        <th>Due</th>
                        <th>For</th>
                        <th>Available from</th>
                        <th>Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formatDateShort(dueDate)}</td>
                        <td>Everyone</td>
                        <td>{formatDateShort(availableDate)}</td>
                        <td>{formatDateShort(untilDate)}</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    );
}
