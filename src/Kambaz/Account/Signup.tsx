import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate("/Kambaz/Account/Profile");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col>
                    <div className="text-center mb-4">
                        <h1 className="fw-bold" style={{ fontFamily: "Georgia, serif" }}>
                            Northeastern University
                        </h1>
                    </div>
                    <Form
                        className="p-4 border rounded shadow-sm"
                        style={{ maxWidth: "400px", margin: "0 auto" }}
                    >
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>myNortheastern Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={user.username || ""}
                                onChange={(e) =>
                                    setUser({ ...user, username: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>myNortheastern Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={user.password || ""}
                                onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Button
                            variant="danger"
                            type="button"
                            className="w-100 mb-3"
                            onClick={signup}
                        >
                            Sign Up
                        </Button>

                        <div className="text-center">
                            <Link to="/Kambaz/Account/Signin" className="text-decoration-none">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
