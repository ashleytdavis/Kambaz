import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import * as quizClient from "../Quizzes/client"

function formatBoolean(value: boolean | undefined, defaultValue: boolean) {
    if (value === undefined || value === null) return defaultValue ? "Yes" : "No";
    return value ? "Yes" : "No";
}

function formatTimeLimit(timeLimit: { hours?: number; minutes?: number } | undefined) {
    const hours = timeLimit?.hours ?? 0;
    const minutes = timeLimit?.minutes ?? 20;
    if (hours === 0) return `${minutes} Minutes`;
    return `${hours} Hours ${minutes} Minutes`;
}

function formatDate(dateStr?: string | Date | null) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
    });
}

export default function QuizDetails() {
    const { quidId } = useParams();
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

    // Calculate total points from questions if available
    const totalPoints =
        quiz.questions && Array.isArray(quiz.questions)
            ? quiz.questions.reduce((sum: number, q: any) => sum + (q.points ?? 0), 0)
            : quiz.points ?? 0;

    // Defaults per your spec
    const quizType = quiz.type ?? "Graded Quiz";
    const assignmentGroup = quiz.assignmentGroup ?? "Quizzes";
    const shuffleAnswers = quiz.shuffleAnswers ?? true;
    const timeLimit = quiz.timeLimit ?? { hours: 0, minutes: 20 };
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


    return (
        <Card className="mx-auto my-4" style={{ maxWidth: 700 }}>
            <Card.Header>
                <h3>Quiz Details</h3>
            </Card.Header>
            <Card.Body>
                <Row className="mb-2">
                    <Col xs={6}><strong>Quiz Type:</strong></Col>
                    <Col xs={6}>{quizType}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Points:</strong></Col>
                    <Col xs={6}>{totalPoints}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Assignment Group:</strong></Col>
                    <Col xs={6}>{assignmentGroup}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Shuffle Answers:</strong></Col>
                    <Col xs={6}>{formatBoolean(shuffleAnswers, true)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Time Limit:</strong></Col>
                    <Col xs={6}>{formatTimeLimit(timeLimit)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Multiple Attempts:</strong></Col>
                    <Col xs={6}>{formatBoolean(multipleAttempts, false)}</Col>
                </Row>
                {multipleAttempts && (
                    <Row className="mb-2">
                        <Col xs={6}><strong>How Many Attempts:</strong></Col>
                        <Col xs={6}>{maxAttempts}</Col>
                    </Row>
                )}
                <Row className="mb-2">
                    <Col xs={6}><strong>Show Correct Answers:</strong></Col>
                    <Col xs={6}>{formatBoolean(showCorrectAnswers, false)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Access Code:</strong></Col>
                    <Col xs={6}>{accessCode || "(none)"}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>One Question at a Time:</strong></Col>
                    <Col xs={6}>{formatBoolean(oneQuestionAtATime, true)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Webcam Required:</strong></Col>
                    <Col xs={6}>{formatBoolean(webcamRequired, false)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Lock Questions After Answering:</strong></Col>
                    <Col xs={6}>{formatBoolean(lockQuestions, false)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Due Date:</strong></Col>
                    <Col xs={6}>{formatDate(dueDate)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Available Date:</strong></Col>
                    <Col xs={6}>{formatDate(availableDate)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6}><strong>Until Date:</strong></Col>
                    <Col xs={6}>{formatDate(untilDate)}</Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
