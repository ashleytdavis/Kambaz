import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // addAssignment: (state, { payload: assignment }) => {
    //   const newAssignment = {
    //     _id: uuidv4(),
    //     title: assignment.title,
    //     course: assignment.course,
    //     date: assignment.date,
    //     dueDate: assignment.dueDate,
    //     points: assignment.points,
    //     dateAlt: assignment.dateAlt,
    //     dueDateAlt: assignment.dueDateAlt,
    //     description: assignment.description,
    //   };
    //   state.quizzes = [...state.quizzes, newAssignment] as any;
    // },
    // deleteAssignment: (state, { payload: assignmentId }) => {
    //   state.quizzes = state.quizzes.filter(
    //     (a: any) => a._id !== assignmentId
    //   );
    // },
    // updateAssignment: (state, { payload: assignment }) => {
    //   state.quizzes = state.quizzes.map((a: any) =>
    //     a._id === assignment._id ? assignment : a
    //   ) as any;
    // },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});
export const {
//   addAssignment,
//   deleteAssignment,
//   updateAssignment,
  setQuizzes,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
