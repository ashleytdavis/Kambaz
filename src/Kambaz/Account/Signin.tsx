import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Kambaz/Dashboard");
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
                                value={credentials.username || ""}
                                onChange={(e) =>
                                    setCredentials({ ...credentials, username: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>myNortheastern Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={credentials.password || ""}
                                onChange={(e) =>
                                    setCredentials({ ...credentials, password: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Button
                            variant="danger"
                            type="button"
                            className="w-100 mb-3"
                            onClick={signin}
                        >
                            Log In
                        </Button>

                        <div className="text-center">
                            <Link to="/Kambaz/Account/Signup" className="text-decoration-none" id="wd-signup-link">
                                Sign up
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
