import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Alert, Card } from "react-bootstrap";
import * as quizClient from "./client";
import { useSelector } from "react-redux";

export default function QuizAttemptOverview() {
  const { quizId, cid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [userId, setUserId] = useState(currentUser._id); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quiz = await quizClient.getQuizById(quizId!);
        const qs = await quizClient.getQuestionsForQuiz(quizId!);
        let attempt = null;
  
        try {
          attempt = await quizClient.getLatestQuizAttempt(quizId!, userId);
        } catch (err: any) {
          if (err.response?.status === 404) {
            // No previous attempt — that's okay
            attempt = null;
          } else {
            throw err; // Bubble up other errors
          }
        }
  
        setQuiz(quiz);
        setQuestions(qs);
        setLastAttempt(attempt);
      } catch (err: any) {
        console.error("Error loading quiz overview:", err);
        setError("Failed to load quiz data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [quizId, userId]);
  

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">Quiz not found.</Alert>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mt-4">
        <h2>{quiz.title || "Quiz"}</h2>
        <Alert variant="warning">
          This quiz has no questions yet. Please contact your professor.
        </Alert>
      </div>
    );
  }

  const remainingAttempts =
    quiz.maxAttempts && lastAttempt
      ? quiz.maxAttempts - lastAttempt.numAttempt
      : quiz.maxAttempts;

  const canRetake = quiz.maxAttempts === undefined || remainingAttempts > 0;

  return (
    <div className="container mt-4">
      <h2>{quiz.title || "Quiz"}</h2>

      {lastAttempt ? (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Last Attempt</Card.Title>
            <p><strong>Score:</strong> {lastAttempt.score} / {quiz.points}</p>
            <p><strong>Submitted:</strong> {new Date(lastAttempt.submittedAt).toLocaleString()}</p>
            <p><strong>Attempt #:</strong> {lastAttempt.numAttempt}</p>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">You haven't taken this quiz yet.</Alert>
      )}

      <div className="d-flex justify-content-end">
        {canRetake ? (
          <Button
            variant="primary"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Take`)
            }
          >
            {lastAttempt ? "Retake Quiz" : "Take Quiz"}
          </Button>
        ) : (
          <Alert variant="danger">
            You have reached the maximum number of attempts.
          </Alert>
        )}
      </div>
    </div>
  );
}
