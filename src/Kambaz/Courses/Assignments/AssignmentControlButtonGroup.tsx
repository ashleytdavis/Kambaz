import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

const AssignmentControlButtonGroup = ({ assignmentID }: { assignmentID: string }) => {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        await client.deleteAssignment(assignmentID);
        dispatch(deleteAssignment(assignmentID));
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

export default AssignmentControlButtonGroup
