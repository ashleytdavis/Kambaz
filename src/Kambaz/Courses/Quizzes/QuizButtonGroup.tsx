import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../../GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteQuiz } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

const QuizButtonGroup = ({ quizId }: { quizId: string }) => {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    };
    return (
        <div className="float-end">
            <GreenCheckmark />
            <button className="btn me-2"
                onClick={handleDelete}>
                <FaTrash className="text-danger" />
            </button>
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}

export default QuizButtonGroup
