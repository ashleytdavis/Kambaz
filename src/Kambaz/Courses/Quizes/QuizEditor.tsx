import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as quizClient from "./client";
import { updateQuiz as updateQuizRedux } from "./reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  const [newQuiz, setNewQuiz] = useState<any | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await quizClient.getQuizById(qid as string);
        setNewQuiz(quiz);
      } catch (error) {
        console.error("Error loading quiz:", error);
      }
    };
    fetchQuiz();
  }, [qid]);

  const handleUpdateQuiz = async () => {
    try {
      await quizClient.updateQuiz(newQuiz);
      dispatch(updateQuizRedux(newQuiz));
    } catch (err) {
      console.error("Failed to update quiz:", err);
    }
  };

  if (!newQuiz) {
    return <div>Loading quiz...</div>;
  }

  return (
    <Container className="mt-4">
      <Form>
        <Form.Group className="mb-4">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            value={newQuiz.title}
            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Quiz description"
            value={newQuiz.description}
            onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={3}><Form.Label className="text-end d-block">Points</Form.Label></Col>
          <Col md={9}>
            <Form.Control
              type="number"
              value={newQuiz.points}
              onChange={(e) => setNewQuiz({ ...newQuiz, points: Number(e.target.value) })}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}><Form.Label className="text-end d-block">Time Limit (mins)</Form.Label></Col>
          <Col md={9}>
            <Form.Control
              type="number"
              value={newQuiz.timeLimit}
              onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: Number(e.target.value) })}
            />
          </Col>
        </Row>

        <Form.Group as={Row} className="mb-3">
          <Col md={3}><Form.Label className="text-end d-block">Options</Form.Label></Col>
          <Col md={9}>
            <Form.Check
              type="checkbox"
              label="Shuffle Questions"
              checked={newQuiz.shuffleQuestions}
              onChange={(e) => setNewQuiz({ ...newQuiz, shuffleQuestions: e.target.checked })}
            />
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={newQuiz.multipleAttempts}
              onChange={(e) => setNewQuiz({ ...newQuiz, multipleAttempts: e.target.checked })}
            />
          </Col>
        </Form.Group>

        <Card className="mb-4">
          <Card.Body>
            <Form.Label>Availability</Form.Label>
            <Form.Control
              type="datetime-local"
              value={newQuiz.availableFrom}
              className="mb-3"
              onChange={(e) => setNewQuiz({ ...newQuiz, availableFrom: e.target.value })}
            />
            <Form.Control
              type="datetime-local"
              value={newQuiz.availableUntil}
              className="mb-3"
              onChange={(e) => setNewQuiz({ ...newQuiz, availableUntil: e.target.value })}
            />
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={newQuiz.dueDate}
              onChange={(e) => setNewQuiz({ ...newQuiz, dueDate: e.target.value })}
            />
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end gap-2">
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="light">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button variant="danger" onClick={handleUpdateQuiz}>Save</Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
