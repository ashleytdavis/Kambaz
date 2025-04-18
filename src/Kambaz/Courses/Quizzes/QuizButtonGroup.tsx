import GreenCheckmark from "../../GreenCheckmark";
import { deleteQuiz, updateQuiz } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import FacultyContent from "../../FacultyContent";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RedSymbol from "../../RedSymbol";

const QuizButtonGroup = ({ quizId, courseId }: { quizId: string, courseId: string }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null)

    const handleDelete = async () => {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    };
    const handleEdit = async () => {
        navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/Details`)
    }
    const handlePublish = async () => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        await client.updateQuiz(updatedQuiz);
        setQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            const currentQuiz = await client.getQuizById(quizId);
            setQuiz(currentQuiz);
        };
        fetchQuiz();
    }, [quizId]);

    return (
        <FacultyContent>
            <div className="float-end">
                {quiz && quiz.published ? <GreenCheckmark /> : <RedSymbol />}
                <Dropdown align="end" className="d-inline-block ms-2">
                    <Dropdown.Toggle variant="light" id="dropdown-group-menu" style={{ padding: "0.375rem 0.5rem" }}>
                        <BsThreeDotsVertical size={20} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                        <Dropdown.Item onClick={handlePublish}>{quiz.published ? "Unpublish" : "Publish"}</Dropdown.Item>
                        <Dropdown.Item>Copy</Dropdown.Item>
                        <Dropdown.Item>Sort</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </FacultyContent>
    );
}

export default QuizButtonGroup
