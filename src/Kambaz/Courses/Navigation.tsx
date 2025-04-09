import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";

export default function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { cid } = useParams();
    const { pathname } = useLocation();

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link to={`/Kambaz/Courses/${cid}/${link}`} id="wd-course-home-link"
                    className={`list-group-item text-danger border border-0 ${pathname.includes(link) ? "text-black" : "text-danger"}`}
                    key={"111" + link}> {link} </Link>
            ))}
        </div>
    );
}
