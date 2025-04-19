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
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await quizClient.getQuizzesForCourse(cid as string);
        quizzes.filter((quiz: any) => isQuizAvailable(quiz) || currentUser.role === "FACULTY")
        dispatch(setQuizzes(quizzes));
    };

    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const isQuizAvailable = (quiz: any) => {
        return quiz.published;
    };

    const quizStatus = (quiz: any) => {
        const now = new Date();
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);
        if (now >= availableDate) {
            if (now <= untilDate) {
                return "Available"
            } else {
                return "Closed"
            }
        } else {
            return `Not available until ${availableDate.toLocaleString()}`
        }
    }
    useEffect(() => {
        fetchQuizzes();
    }, []);

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
                        <Link to={`/Kambaz/Courses/${cid}/Quizzes/Builder`}>
                            <Button variant="danger">
                                <BsPlusLg className="me-1" />
                                Quiz
                            </Button>
                        </Link>
                        <button className="btn btn-light me-2 ms-2">
                            <BsThreeDotsVertical size={20} />
                        </button>
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
                    <FacultyContent>
                        {quizzes.length === 0 && (
                            <div className="text-center text-muted my-4">
                                No quizzes yet. Click <strong>+ Quiz</strong> to get started.
                            </div>
                        )}
                    </FacultyContent>


                    <ListGroup className="rounded-0">
                        {quizzes
                            .filter((quiz: any) => quiz.courseId === cid && (isQuizAvailable(quiz) || currentUser.role === "FACULTY"))
                            .map((quiz: any) => (
                                <ListGroup.Item
                                    key={quiz._id}
                                    className="border-1"
                                >
                                    <div className="d-flex align-items-center py-2">
                                        <RxRocket className="me-2 fs-4 me-4 ms-2" />
                                        <div className="flex-grow-1">
                                            <FacultyContent>
                                                <p
                                                    className="wd-quiz-link fw-bold text-dark mb-0" >
                                                    {quiz.title || "Untitled Quiz"}
                                                </p>
                                            </FacultyContent>
                                            <StudentContent>
                                                <Link
                                                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Overview`}
                                                    className="wd-quiz-link fw-bold text-decoration-none text-dark mb-0">
                                                    {quiz.title || "Untitled Quiz"}
                                                </Link>
                                            </StudentContent><br/>
                                            <small>
                                                    <span className="text-secondary fw-bold mb-1">{quizStatus(quiz)}</span><br />
                                                <span className="text-secondary">Due {new Date(quiz.dueDate).toLocaleString()} | {quiz.points} pts</span>
                                            </small>
                                        </div>
                                        {cid && <QuizButtonGroup quizId={quiz._id} courseId={cid} />}
                                    </div>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
