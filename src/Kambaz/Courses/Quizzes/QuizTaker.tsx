import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import { Button, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function QuizTaker() {
  const navigate = useNavigate();
  const { cid, quizId } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userId = currentUser?._id;

  useEffect(() => {
    const fetchData = async () => {
      if (!quizId) return;
      const q = await quizClient.getQuizById(quizId);
      const qs = await quizClient.getQuestionsForQuiz(quizId);
      setQuiz(q);
      setQuestions(qs);
    };
    fetchData();
  }, [quizId]);

  const handleAnswerChange = (qid: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        })
      );

      const attempt = await quizClient.submitQuizAttempt(quizId!, userId, formattedAnswers);

      setResult(attempt);
      setError(null);
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Overview`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Submission failed.");
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{quiz?.title || "Quiz"}</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {result && (
        <Alert variant="success">
          <strong>Quiz submitted!</strong> You scored {result.score} points.
        </Alert>
      )}

      {questions.length === 0 ? (
        <p className="text-muted">This quiz has no questions.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((question: any, index: number) => (
            <div key={question._id} className="mb-4">
              <label className="fw-bold d-block mb-2">
                {index + 1}. {question.question_text} ({question.points} pts)
              </label>

              {question.question_type === "Multiple Choice" &&
                question.options?.map((option: string, i: number) => (
                  <Form.Check
                    key={i}
                    type="radio"
                    name={question._id}
                    label={option}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleAnswerChange(question._id, option)}
                  />
                ))}

              {question.question_type === "True or False" &&
                ["True", "False"].map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    name={question._id}
                    label={option}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleAnswerChange(question._id, option)}
                  />
                ))}

              {question.question_type === "Fill In The Blank" && (
                <Form.Control
                  type="text"
                  placeholder="Your answer"
                  value={answers[question._id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question._id, e.target.value)
                  }
                />
              )}
            </div>
          ))}
          <Button type="submit" variant="primary">Submit Quiz</Button>
        </form>
      )}
    </div>
  );
}
