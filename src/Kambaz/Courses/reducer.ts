import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  courses: courses,
  enrollments: enrollments,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse: any = {
        _id: uuidv4(),
        modules: [],
        name: course.name,
        description: course.description,
        number: uuidv4(),
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        image_filepath: "/images/teslabot.jpg",
      };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },
    enrollCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    },
    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});
export const {
  addCourse,
  deleteCourse,
  updateCourse,
  enrollCourse,
  unenrollCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;

export const selectAllCourses = (state: any) => state.coursesReducer.courses;
export const selectEnrollments = (state: any) =>
  state.coursesReducer.enrollments;
