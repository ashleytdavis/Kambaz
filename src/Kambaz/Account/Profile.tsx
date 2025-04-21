import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, FormControl, Button } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    const fetchProfile = () => {
        if (!currentUser) return navigate("/Kambaz/Account/Signin");
        setProfile(currentUser);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    useEffect(() => { fetchProfile(); }, []);

    return (
        <div className="d-flex justify-content-center bg-light min-vh-100 pt-5">
            <div className="bg-white shadow rounded-4 p-4" style={{ width: '450px' }}>
                <h2 className="mb-4 text-center">Profile</h2>

                {profile && (
                    <Form>
                        <Button variant="danger" onClick={updateProfile} className="w-100 mb-3">
                            Update Profile
                        </Button>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <FormControl
                                type="text"
                                value={profile.username || ""}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <FormControl
                                type="password"
                                value={profile.password || ""}
                                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <FormControl
                                type="text"
                                value={profile.firstName || ""}
                                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <FormControl
                                type="text"
                                value={profile.lastName || ""}
                                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <FormControl
                                type="date"
                                value={profile.dob || ""}
                                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <FormControl
                                type="email"
                                value={profile.email || ""}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={profile.role || "USER"}
                                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="secondary" onClick={signout} className="w-100">
                            Sign Out
                        </Button>
                    </Form>
                )}
            </div>
        </div>
    );
}
