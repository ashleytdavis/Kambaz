import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
    const { pathname } = useLocation();
    const links = [
        { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
        { label: "Courses", path: "/Kambaz/Courses", icon: LiaBookSolid },
        { label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline },
        { label: "Inbox", path: "/Kambaz/Inbox", icon: FaInbox },
        { label: "History", path: "/Kambaz/History", icon: LuClock3 },
        { label: "Help", path: "/Kambaz/Help", icon: IoMdHelpCircleOutline },
    ];

    return (
        <div
            style={{
                width: '86px',
                backgroundColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center items vertically
                alignItems: 'center', // Center items horizontally
            }}
            className="position-fixed top-0 bottom-0 z-2"
        ><a href="https://www.northeastern.edu/" target="_blank" rel="noreferrer">
                <img src="/images/neu-monogram.svg" alt="NEU" width="60" />
            </a>

            <div className="d-flex flex-column gap-3 w-100 mt-5">
                <Link
                    to="/Kambaz/Account"
                    className={`text-decoration-none w-100 py-2 d-flex flex-column align-items-center ${pathname.includes("Account") ? "bg-light border-start border-4 border-danger text-danger" : "text-white"}`}>
                    <FaRegCircleUser className={`fs-4 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
                    <small className="mt-1">Account</small>
                </Link>
                {links.map((link) => {
                    const isActive = pathname.includes(link.label);
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-decoration-none w-100 py-2 d-flex flex-column align-items-center ${isActive ? "bg-light border-start border-4 border-danger text-danger" : "text-white"}`}>
                            {link.icon({ className: `fs-4 ${isActive ? "text-danger" : "text-white"}` })}
                            <small className="mt-1">{link.label}</small>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}
