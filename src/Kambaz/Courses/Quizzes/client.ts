import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/quiz-attempts`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const getQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const createQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return data;
};

export const getQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/course/${courseId}`
  );
  return data;
};

export const saveQuestion = async (question: any, quizId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return data;
};

export const getQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return data;
};

export const getQuestion = async (questionId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}`
  );
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${questionId}`
  );
  return response.data;
};

export const submitQuizAttempt = async (
  quizId: string,
  userId: string,
  answers: any[]
) => {
  const { data } = await axiosWithCredentials.post(ATTEMPTS_API, {
    quizId,
    userId,
    answers,
  });
  return data;
};

export const getLatestQuizAttempt = async (
  quizId: string,
  userId: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${quizId}/${userId}`
  );
  return data;
};