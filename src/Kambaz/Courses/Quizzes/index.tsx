import { ListGroup, Button } from "react-bootstrap";
import { BsGripVertical, BsCaretDownFill, BsSearch, BsPlusLg } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import FacultyContent from "../../FacultyContent.ts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as quizClient from "./client.ts";
import { setQuizzes } from "./reducer.ts";
import { useEffect } from "react";
import QuizButtonGroup from "./QuizButtonGroup.tsx";
import { RxRocket } from "react-icons/rx";
import StudentContent from "../../StudentContent.ts";

export default function Quizzes() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await quizClient.getQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    const isQuizAvailable = (quiz: any) => {
        const now = new Date();
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);
        return now >= availableDate && now <= untilDate;
      };      
    useEffect(() => {
        fetchQuizzes();
    }, []);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="position-relative w-25">
                    <BsSearch className="position-absolute top-50 translate-middle-y text-secondary" style={{ left: "12px" }} />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="form-control ps-5"
                    />
                </div>
                <FacultyContent>
                    <div>
                        <button className="btn btn-light me-2">
                            <BsPlusLg className="me-1" />
                            Group
                        </button>
                        <Link to={`/Kambaz/Courses/${cid}/Quizzes/Builder`}>
                            <Button variant="danger">
                                <BsPlusLg className="me-1" />
                                Quiz
                            </Button>
                        </Link>
                    </div>
                </FacultyContent>
            </div>

            <ListGroup className="rounded-0">
                <ListGroup.Item className="p-0">
                    <div className="d-flex align-items-center bg-light p-3">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2" />
                            <BsCaretDownFill className="me-2" />
                            <span className="fw-bold">QUIZZES</span>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                    {quizzes
                            .filter((quiz: any) => quiz.courseId === cid && isQuizAvailable(quiz)).length === 0 && (
                        <div className="text-center text-muted my-4">
                            No quizzes yet. Click <strong>+ Quiz</strong> to get started.
                        </div>
                    )}


                    <ListGroup className="rounded-0">
                        {quizzes
                            .filter((quiz: any) => quiz.courseId === cid && isQuizAvailable(quiz))
                            .map((quiz: any) => (
                                <ListGroup.Item
                                    key={quiz._id}
                                    className="border-1"
                                >
                                    <div className="d-flex align-items-center py-2">
                                        <RxRocket className="me-2 fs-4 me-4 ms-2" />
                                        <div className="flex-grow-1">
                                            <FacultyContent>
                                            <a href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Editor`}
                                                className="wd-quiz-link fw-bold text-decoration-none text-dark" >
                                                {quiz.title || "Untitled Quiz"}
                                            </a>
                                            </FacultyContent>
                                            <StudentContent>
                                                <Link
                                                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Overview`}
                                                    className="wd-quiz-link fw-bold text-decoration-none text-dark">
                                                    {quiz.title || "Untitled Quiz"}
                                                </Link>
                                            </StudentContent>
                                            <br />
                                            <small>
                                                <span className="text-secondary">Not available until {quiz.date} at 12:00am</span>
                                                <br />
                                                <span className="text-secondary">Due {quiz.dueDate} at 11:59pm | {quiz.points} pts</span>
                                            </small>
                                        </div>
                                        <QuizButtonGroup quizId={quiz._id} />
                                    </div>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
