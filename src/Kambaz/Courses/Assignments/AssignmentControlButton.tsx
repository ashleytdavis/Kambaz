import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';
import './index.css';

const AssignmentControlButton = () => {
    return (
        <div className="float-end">
            <div className='me-2 fs-6 wd-rounded-corners-all-around 
     wd-border-thin wd-border-gray'>
                40% of Total
            </div>
            <BsPlus className="fs-1" />
            <IoEllipsisVertical className="fs-4" />
        </div>);
}

export default AssignmentControlButton