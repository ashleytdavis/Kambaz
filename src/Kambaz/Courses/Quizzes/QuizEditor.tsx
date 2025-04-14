import { Form, Button, Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as quizClient from "./client";
import { updateQuiz as updateQuizRedux } from "./reducer";
import AddQuestionForm from "./AddQuestionForm";

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

  const handleAddQuestion = async (newQuestion: any) => {
    const savedQuestion = await quizClient.saveQuestion(newQuestion, newQuiz._id);
    setNewQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, savedQuestion._id],
    }));
  };


  if (!newQuiz) {
    return <div>Loading quiz...</div>;
  }

  return (
    <Container className="mt-4">
      <Tabs
        activeKey="details"
        onSelect={(tab) => console.log(tab)}
        className="mb-4"
      >
        <Tab eventKey="details" title="Details" tabClassName="text-danger">
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
              <Col md={2}>
                <Form.Label className="text-end d-block">Quiz Type</Form.Label>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={newQuiz.type}
                  onChange={(e) => setNewQuiz({ ...newQuiz, type: e.target.value })}
                >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}>
                <Form.Label className="text-end d-block">Assignment Group</Form.Label>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={newQuiz.assignmentGroup}
                  onChange={(e) => setNewQuiz({ ...newQuiz, assignmentGroup: e.target.value })}
                >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}>
                <Form.Label className="text-end d-block">Points</Form.Label>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  value={newQuiz.points}
                  onChange={(e) => setNewQuiz({ ...newQuiz, points: Number(e.target.value) })}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}>
                <Form.Label className="text-end d-block">Time Limit (hours)</Form.Label>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  value={newQuiz.timeLimit.hours}
                  onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: { ...newQuiz.timeLimit, hours: parseInt(e.target.value) } })}
                />
              </Col>
              <Col md={2}>
                <Form.Label className="text-end d-block">Time Limit (minutes)</Form.Label>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  value={newQuiz.timeLimit.minutes}
                  onChange={(e) => setNewQuiz({ ...newQuiz, timeLimit: { ...newQuiz.timeLimit, minutes: parseInt(e.target.value) } })}
                />
              </Col>
            </Row>

            <Form.Group as={Row} className="mb-3">
              <Col md={2}></Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Options</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Shuffle Answers"
                    checked={newQuiz.shuffleAnswers}
                    onChange={(e) => setNewQuiz({ ...newQuiz, shuffleAnswers: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Allow Multiple Attempts"
                    checked={newQuiz.multipleAttempts}
                    onChange={(e) => setNewQuiz({ ...newQuiz, multipleAttempts: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Show Correct Answers"
                    checked={newQuiz.showCorrectAnswers}
                    onChange={(e) => setNewQuiz({ ...newQuiz, showCorrectAnswers: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="One Question at a Time"
                    checked={newQuiz.oneQuestionAtATime}
                    onChange={(e) => setNewQuiz({ ...newQuiz, oneQuestionAtATime: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Webcam Required"
                    checked={newQuiz.webcamRequired}
                    onChange={(e) => setNewQuiz({ ...newQuiz, webcamRequired: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Lock Questions"
                    checked={newQuiz.lockQuestions}
                    onChange={(e) => setNewQuiz({ ...newQuiz, lockQuestions: e.target.checked })}
                    className="mb-3"
                  />
                </Form.Group>
              </Col>
            </Form.Group>

            <Card className="mb-4">
              <Card.Body>
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={newQuiz.availableDate}
                  className="mb-3"
                  onChange={(e) => setNewQuiz({ ...newQuiz, availableDate: new Date(e.target.value) })}
                />
                <Form.Control
                  type="datetime-local"
                  value={newQuiz.untilDate}
                  className="mb-3"
                  onChange={(e) => setNewQuiz({ ...newQuiz, untilDate: new Date(e.target.value) })}
                />
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={newQuiz.dueDate}
                  onChange={(e) => setNewQuiz({ ...newQuiz, dueDate: new Date(e.target.value) })}
                />
              </Card.Body>
            </Card>
          </Form>
        </Tab>

        <Tab eventKey="questions" title="Questions" tabClassName="text-danger">
          <Card className="p-4 shadow-sm border-0">
            <h5 className="fw-bold text-danger mb-4">Add Questions</h5>
            <AddQuestionForm onSubmit={(newQuestion) => handleAddQuestion(newQuestion)} quiz_id={newQuiz._id} />
            <ul>
              {newQuiz.questions.map((questionId: any) => (
                <li key={questionId}>
                  <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions/${questionId}`}>
                    View Question
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </Tab>
      </Tabs>

      <div className="d-flex justify-content-end gap-2">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="light">Cancel</Button>
        </Link>
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="danger" onClick={handleUpdateQuiz}>Save</Button>
        </Link>
      </div>
    </Container>
  );
}