import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import AssignmentBuilder from "./Assignments/AssignmentBuilder";
import Home from "./Home";
import Modules from "./Modules";
import CourseNavigation from "./Navigation";
import { Route, Routes, useParams, useLocation } from "react-router";
import PeopleTable from "./People/Table";
import * as usersClient from "./client"
import { useEffect, useState } from "react";
import Quizzes from "./Quizzes";
import QuizBuilder from "./Quizzes/QuizBuilder";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizTaker from "./Quizzes/QuizTaker";
import QuizAttemptOverview from "./Quizzes/QuizAttemptOverview";
import QuizDetails from "./Quizzes/QuizDetails";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    let breadcrumbs = pathname.split("/").slice(4)[0] === 'Home' ? "" : " > " + pathname.split("/").slice(4);
    const [enrolledStudents, setEnrolledStudents] = useState<any[]>([]);

    useEffect(() => {
        if (cid) {
            usersClient.findUsersForCourse(cid).then((students) => {
                setEnrolledStudents(students);
            });
        }
    }, [cid]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} {breadcrumbs}
            </h2>
            <hr />

            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Assignments/Builder" element={<AssignmentBuilder />} />
                        <Route path="People" element={<PeopleTable users={enrolledStudents} />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/Builder" element={<QuizBuilder />} />
                        <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
                        <Route path="Quizzes/:quizId/Take" element={<QuizTaker />} />
                        <Route path="Quizzes/:quizId/Overview" element={<QuizAttemptOverview />} />
                        <Route path="Quizzes/:quidId/Details" element={<QuizDetails />} />
                        <Route path="Quizzes/:quidId/Preview" element={<p>IMPLEMENT ME</p>} />
                    </Routes>
                </div>
            </div>
        </div >


    );
}
