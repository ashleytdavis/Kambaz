import { FaCircle } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
export default function RedSymbol() {
    return (
        <span className="me-1 position-relative">
            <CiNoWaitingSign style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />
            <FaCircle className="text-white me-1 fs-6" />
        </span>
    );
}

