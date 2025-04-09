/*
Following Modules/reducer.ts as an example, create an Assignments/reducer.ts 
in src/Kambaz/Courses/Assignments/ initialized with db.assignments. Implement 
reducer functions such as addAssignment, deleteAssignment, updateAssignment, 
and any other functions as needed. Add the new reducer to the store in 
Kambaz/store/index.ts to add the assignments to the Kambaz application state.
*/
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assginments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        date: assignment.date,
        dueDate: assignment.dueDate,
        points: assignment.points,
        dateAlt: assignment.dateAlt,
        dueDateAlt: assignment.dueDateAlt,
        description: assignment.description,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
