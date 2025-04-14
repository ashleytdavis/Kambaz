import { Form, Button, Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addQuiz } from "./reducer";
import * as quizClient from "./client";
import { FaRegKeyboard } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { CgArrowsExpandRight } from "react-icons/cg";
import AddQuestionForm from "./AddQuestionForm";
import { v4 as uuidv4 } from "uuid";

type Question = {
  _id: string;
  quiz_id: string;
  question_text: string;
  question_type: "True or False" | "Multiple Choice" | "Fill In The Blank";
  options?: string[];
  correct_answer: string | boolean | string[];
  points: number;
};

export default function QuizBuilder() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [wordCount, setWordCount] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);

  const [quiz, setQuiz] = useState({
    _id: uuidv4(),
    title: "",
    description: "",
    type: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: { hours: 0, minutes: 20 },
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestions: false,
    dueDate: new Date(),
    availableDate: new Date(),
    untilDate: new Date(),
    published: false,
    courseId: cid,
    questions: [] as string[],
    points: 0,
  });

  const handleCreateQuiz = async () => {
    const savedQuestions = await Promise.all(quiz.questions.map((questionId) => quizClient.getQuestion(questionId)));
    const createdQuiz = await quizClient.createQuiz({
      ...quiz,
      courseId: cid,
      questions: savedQuestions.map((question) => question._id),
    });
    dispatch(addQuiz(createdQuiz));
  };

  const handleAddQuestion = async (newQuestion: Question) => {
    const savedQuestion = await quizClient.saveQuestion(newQuestion, quiz._id);
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, savedQuestion._id],
    }));
  };

  useEffect(() => {
    setWordCount(quiz.description.split(" ").length - 1)
  }, [quiz.description])

  useEffect(() => {
    let newPoints = 0;
    for (const questionId of quiz.questions) {
      quizClient.getQuestion(questionId).then((question: any) => {
        newPoints += question.points;
        setQuiz((prevQuiz) => ({ ...prevQuiz, points: newPoints }));
      });
    }
  }, [quiz.questions]);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-end align-items-center gap-3 fw-bold fs-5">
        <p className="mb-0">Points {quiz.points}</p>
      </div>
      <hr />
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab || "details")}
        className="mb-4"
      >

        <Tab eventKey="details" title="Details" tabClassName="text-danger">
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
              <div className="d-flex align-items-center justify-content-end gap-3 fs-4 me-3 mt-2">
                <FaRegKeyboard className="text-danger" />
                <p className="mb-0 text-secondary">|</p>
                <p className="text-danger mb-0 fs-5">{wordCount} words</p>
                <p className="mb-0 text-secondary">|</p>
                <FaCode className="text-danger" />
                <CgArrowsExpandRight className="text-danger" />
              </div>
            </Form.Group>

            <Row className="mb-3">
              <Col md={2}><Form.Label className="text-end d-block">Quiz Type</Form.Label></Col>
              <Col md={3}>
                <Form.Select >
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}><Form.Label className="text-end d-block">Assignment Group</Form.Label></Col>
              <Col md={3}>
                <Form.Select >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}></Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Options</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Shuffle Answers"
                    checked={quiz.shuffleAnswers}
                    onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Allow Multiple Attempts"
                    checked={quiz.multipleAttempts}
                    onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Show Correct Answers"
                    checked={quiz.showCorrectAnswers}
                    onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="One Question at a Time"
                    checked={quiz.oneQuestionAtATime}
                    onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Webcam Required"
                    checked={quiz.webcamRequired}
                    onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                    className="mb-3"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Lock Questions"
                    checked={quiz.lockQuestions}
                    onChange={(e) => setQuiz({ ...quiz, lockQuestions: e.target.checked })}
                    className="mb-3"
                  />
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Check
                        type="checkbox"
                        label="Time Limit"
                        checked={timeLimitEnabled}
                        onChange={() => setTimeLimitEnabled(!timeLimitEnabled)}
                        className="mb-3"
                      />
                    </Col>
                  </Row>
                  {timeLimitEnabled && (
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Label className="text-end d-block">Time Limit (hours)</Form.Label>
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          type="number"
                          value={quiz.timeLimit.hours}
                          onChange={(e) => setQuiz({ ...quiz, timeLimit: { ...quiz.timeLimit, hours: parseInt(e.target.value) } })}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label className="text-end d-block">Time Limit (minutes)</Form.Label>
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          type="number"
                          value={quiz.timeLimit.minutes}
                          onChange={(e) => setQuiz({ ...quiz, timeLimit: { ...quiz.timeLimit, minutes: parseInt(e.target.value) } })}
                        />
                      </Col>
                    </Row>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Card className="mb-4">
              <Card.Body>
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  type="datetime-local"
                  className="mb-3"
                  value={quiz.availableDate.toISOString().slice(0, 16)}
                  onChange={(e) => setQuiz({ ...quiz, availableDate: new Date(e.target.value) })}
                />
                <Form.Control
                  type="datetime-local"
                  className="mb-3"
                  value={quiz.untilDate.toISOString().slice(0, 16)}
                  onChange={(e) => setQuiz({ ...quiz, untilDate: new Date(e.target.value) })}
                />
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={quiz.dueDate.toISOString().slice(0, 16)}
                  onChange={(e) => setQuiz({ ...quiz, dueDate: new Date(e.target.value) })}
                />
              </Card.Body>
            </Card>
          </Form>
        </Tab>

        <Tab eventKey="questions" title="Questions" tabClassName="text-danger">
          <Card className="p-4 shadow-sm border-0">
            <h5 className="fw-bold text-danger mb-4">Add Questions</h5>
            <AddQuestionForm onSubmit={(questions) => questions.forEach(handleAddQuestion)} quiz_id={quiz._id} />
          </Card>
        </Tab>
      </Tabs>
      <hr className="mt-4" />
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="light">Cancel</Button>
        </Link>
        <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
          <Button variant="danger" onClick={handleCreateQuiz}>Save</Button>
        </Link>
      </div>
    </Container>
  );
}
