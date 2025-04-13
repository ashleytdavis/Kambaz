import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addQuiz } from "./reducer";
import * as quizClient from "./client";

export default function QuizBuilder() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState({
    title: "",
    course: cid,
    description: "",
    points: "",
    availableFrom: "",
    availableUntil: "",
    dueDate: "",
    timeLimit: "",
    shuffleQuestions: false,
    multipleAttempts: false,
  });

  const handleCreateQuiz = async () => {
    const createdQuiz = await quizClient.createQuiz({ ...quiz, course: cid });
    dispatch(addQuiz(createdQuiz));
  };

  return (
    <Container className="mt-4">
      <Form>
        <Form.Group className="mb-4">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Quiz description"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={3}><Form.Label className="text-end d-block">Points</Form.Label></Col>
          <Col md={9}>
            <Form.Control
              type="number"
              value={quiz.points}
              onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}><Form.Label className="text-end d-block">Time Limit (mins)</Form.Label></Col>
          <Col md={9}>
            <Form.Control
              type="number"
              value={quiz.timeLimit}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })}
            />
          </Col>
        </Row>

        <Form.Group as={Row} className="mb-3">
          <Col md={3}><Form.Label className="text-end d-block">Options</Form.Label></Col>
          <Col md={9}>
            <Form.Check
              type="checkbox"
              label="Shuffle Questions"
              checked={quiz.shuffleQuestions}
              onChange={(e) => setQuiz({ ...quiz, shuffleQuestions: e.target.checked })}
            />
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
            />
          </Col>
        </Form.Group>

        <Card className="mb-4">
          <Card.Body>
            <Form.Label>Availability</Form.Label>
            <Form.Control
              type="datetime-local"
              className="mb-3"
              onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
            />
            <Form.Control
              type="datetime-local"
              className="mb-3"
              onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
            />
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end gap-2">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="light">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="danger" onClick={handleCreateQuiz}>Save</Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
