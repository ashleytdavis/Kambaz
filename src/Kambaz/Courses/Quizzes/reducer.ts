import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz = {
        _id: uuidv4(),
        title: quiz.title,
        courseId: quiz.courseId,
        type: quiz.type,
        points: quiz.points,
        assignmentGroup: quiz.assignmentGroup,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        maxAttempts: quiz.maxAttempts,
        showCorrectAnswers: quiz.showCorrectAnswers,
        accessCode: quiz.accessCode,
        oneQuestionAtATime: quiz.oneQuestionAtATime,
        webcamRequired: quiz.webcamRequired,
        LockQuestions: quiz.LockQuestions,
        dueDate: quiz.dueDate,
        availableDate: quiz.availableDate,
        untilDate: quiz.untilDate,
        questions: quiz.questions,
        description: quiz.description,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: assignmentId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateQuiz: (state, { payload: assignment }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});
export const {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setQuizzes,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
