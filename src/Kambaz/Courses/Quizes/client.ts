import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
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
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/course/${courseId}`);
    return data;
  };

