import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import { Button, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function QuizPreview() {
  const navigate = useNavigate();
  const { cid, quizId } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchData = async () => {
      const q = await quizClient.getQuizById(quizId!);
      const qs = await quizClient.getQuestionsForQuiz(quizId!);
      setQuiz(q);
      setQuestions(qs);
    };
    fetchData();
  }, [quizId]);

  const handleAnswerChange = (qid: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [qid]: value }));
  };

  const isAnswerCorrect = (userAnswer: string, correctAnswer: string[] | string) => {
    const userAns = userAnswer?.toString().toLowerCase().trim();
    const correctAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
    return correctAnswers.some(
      (ans) => ans.toString().toLowerCase().trim() === userAns
    );
  };

  const handleSubmitPreview = () => {
    let tempScore = 0;

    questions.forEach((q) => {
      const selected = answers[q._id];
      if (isAnswerCorrect(selected, q.correct_answer)) {
        tempScore += q.points || 0;
      }
    });

    setScore(tempScore);
    setSubmitted(true);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{quiz?.title || "Quiz Preview"}</h2>

      <Alert variant="info">
        You are previewing this quiz as a student. Your answers will not be saved.
      </Alert>

      {submitted && (
        <Alert variant="success">
          <strong>Preview Complete!</strong> You scored {score} out of {quiz.points}.
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitPreview();
        }}
      >
        {questions.map((question: any, index: number) => {
          const selected = answers[question._id];
          const isCorrect = isAnswerCorrect(selected, question.correct_answer);
          const correctAnswers = Array.isArray(question.correct_answer)
            ? question.correct_answer.join(", ")
            : question.correct_answer;

          return (
            <div key={question._id} className="mb-4 p-3 border rounded">
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
                    disabled={submitted}
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
                    disabled={submitted}
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
                  disabled={submitted}
                />
              )}

              {submitted && (
                <div className="mt-2">
                  {isCorrect ? (
                    <span className="text-success">
                      <FaCheckCircle className="me-2" />
                      Correct
                    </span>
                  ) : (
                    <span className="text-danger">
                      <FaTimesCircle className="me-2" />
                      Incorrect – Correct answer{Array.isArray(question.correct_answer) ? "s" : ""}:{" "}
                      <strong>{correctAnswers}</strong>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {!submitted && (
          <Button type="submit" variant="primary">
            Submit Preview
          </Button>
        )}
      </form>

      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Editor`)
          }
        >
          Edit Quiz
        </Button>
      </div>
    </div>
  );
}
