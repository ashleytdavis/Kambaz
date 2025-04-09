import './styles.css';
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from './Dashboard';
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from './Account/ProtectedRoute';
import { useSelector } from "react-redux";
import Session from "./Account/Session";
import { useEffect, useState } from 'react';
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = async (course: any) => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        }))
    };

    const addNewCourse = async (course: any) => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([...courses, newCourse]);

    };

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={
                            <ProtectedRoute>
                                <Dashboard
                                    courses={courses}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                    enrolling={enrolling}
                                    setEnrolling={setEnrolling}
                                    updateEnrollment={updateEnrollment} />
                            </ProtectedRoute>
                        } />
                        <Route path="/Courses/:cid/*" element={
                            <ProtectedRoute>
                                <Courses courses={courses} />
                            </ProtectedRoute>
                        } />
                        <Route path='/Courses' element={<ProtectedRoute>
                            <Dashboard
                                courses={courses}
                                addNewCourse={addNewCourse}
                                deleteCourse={deleteCourse}
                                updateCourse={updateCourse}
                                enrolling={enrolling}
                                setEnrolling={setEnrolling}
                                updateEnrollment={updateEnrollment} />
                        </ProtectedRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div >
        </Session>
    );
}

