import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Users from "./Users";
export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-screen">
            <div>
                <AccountNavigation />
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />} />
                    <Route path="/Signin" element={<Signin />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Users/:uid" element={<Users />} />
                </Routes>
            </div>
        </div >
    );
}