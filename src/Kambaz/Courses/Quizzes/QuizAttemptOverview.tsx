import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Alert, Card } from "react-bootstrap";
import * as quizClient from "./client";
import { useSelector } from "react-redux";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function QuizAttemptOverview() {
  const { quizId, cid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [userId] = useState(currentUser._id); 

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
      <Card className="mb-3">
          <Card.Body>
            <Card.Title>Quiz Details</Card.Title>
            <p><strong>Due Date:</strong> {new Date(quiz.dueDate).toLocaleString()}</p>
            <p><strong>Points:</strong> {quiz.points}</p>
            <p><strong>Number of Questions:</strong> {quiz.questions.length}</p>
            {lastAttempt ? (
            <p><strong>Score:</strong> {lastAttempt.score} / {quiz.points}</p>
      ) : (
        <Alert variant="info">You haven't taken this quiz yet.</Alert>
      )}
          </Card.Body>
        </Card>
      {lastAttempt && quiz?.showCorrectAnswers && (
        <div className="mt-4">
            <h4>Previous Attempt Review</h4>
            {questions.map((question: any, index: number) => {
            const studentAnswerObj = lastAttempt?.answers?.find(
                (a: any) => a.questionId === question._id
            );

            const studentAnswer = studentAnswerObj?.answer;
            const isCorrect = question.correct_answer.some(
                (ans: any) => ans === studentAnswer.toString()
            );

            return (
                <div key={question._id} className="mb-3 p-3 border rounded">
                <p className="fw-bold mb-1">
                    {index + 1}. {question.question_text}
                </p>
                <p>
                    <strong>Your answer:</strong>{" "}
                    <span className="ms-2">
                        {isCorrect ? (
                            <AiOutlineCheckCircle className="text-success" size={20} />) : (
                            <AiOutlineCloseCircle className="text-danger" size={20} />
                        )}
                    </span>
                    <span className={isCorrect ? "text-success" : "text-danger"}>
                    {studentAnswer || "No answer"}
                    </span>
                    
                </p>
                {!isCorrect && (
                    <p>
                    <strong>Correct answer:</strong> {question.correct_answer}</p>
                )}
                </div>
            );
            })}
        </div>
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
