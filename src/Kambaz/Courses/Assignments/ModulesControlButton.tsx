import GreenCheckmark from './GreenCheckmark';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';

const AssignmentControlButton = () => {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <BsPlus className="fs-1" />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}

export default AssignmentControlButton