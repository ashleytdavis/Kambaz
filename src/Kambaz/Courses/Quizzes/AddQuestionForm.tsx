import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import * as quizClient from "./client";


type AddQuestionFormProps = {
    onSubmit: (questions: Question[]) => void;
    quiz: any;
    setQuiz: React.Dispatch<React.SetStateAction<any>>;
    initialQuestions?: Question[];
};

type Question = {
    _id: string;
    quiz_id: string;
    question_text: string;
    question_type: "True or False" | "Multiple Choice" | "Fill In The Blank";
    options: string[];
    correct_answer: string | boolean | string[];
    points: number;
};

export default function AddQuestionForm({ onSubmit, quiz, setQuiz, initialQuestions = [] }: AddQuestionFormProps) {
    const { cid } = useParams();
    const [questions, setQuestions] = useState<Question[]>(() => {
        if (initialQuestions.length > 0) return initialQuestions;
        return [
            {
                _id: uuidv4(),
                quiz_id: typeof quiz === "string" ? quiz : quiz._id,
                question_text: "",
                question_type: "Multiple Choice",
                options: [],
                correct_answer: "",
                points: 1,
            },
        ];
    });

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            _id: uuidv4(),
            quiz_id: quiz._id,
            question_text: "",
            question_type: "Multiple Choice",
            options: [],
            correct_answer: "",
            points: 1,
        }]);
    };

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index: number, updatedQuestion: Question) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.push("");
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (index: number, optionIndex: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleRemoveOption = (index: number, optionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options = updatedQuestions[index].options.filter((_, i) => i !== optionIndex);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(questions);
        setQuestions([
            {
                _id: uuidv4(),
                quiz_id: quiz._id,
                question_text: "",
                question_type: "True or False",
                options: [],
                correct_answer: "",
                points: 1,
            },
        ]);
    };

    const handleCreateQuiz = async () => {
        try {
            const savedQuiz = await quizClient.createQuiz(quiz);

            const savedQuestions = await Promise.all(
                questions.map(async (question) => {
                    const savedQuestion = await quizClient.saveQuestion(question, savedQuiz._id);
                    return savedQuestion;
                })
            );

            const updatedQuiz = {
                ...savedQuiz,
                questions: savedQuestions.map((q) => q._id),
            };

            await quizClient.updateQuiz(updatedQuiz);

            console.log("Quiz and questions saved successfully:", updatedQuiz);
        } catch (error) {
            console.error("Error saving quiz and questions:", error);
        }
    };

    useEffect(() => {
        const totalPoints = calculateTotalPoints();
        setQuiz((prevQuiz: any) => ({ ...prevQuiz, points: totalPoints }));
    }, [questions]);

    useEffect(() => {
        if (initialQuestions.length > 0) {
            setQuestions(initialQuestions);
        }
    }, [initialQuestions]);

    const calculateTotalPoints = () => {
        return questions.reduce((total, question) => total + question.points, 0);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {questions.map((question, index) => (
                    <Card key={index} style={{ width: "80%", marginBottom: "20px" }}>
                        <Card.Body>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h5>Question {index + 1}</h5>
                                <Button variant="danger" onClick={() => handleRemoveQuestion(index)}>
                                    <RiDeleteBinLine size={20} />
                                </Button>
                            </div>

                            <Form.Group className="mb-3">
                                <Form.Label>Question Type</Form.Label>
                                <Form.Select
                                    value={question.question_type}
                                    onChange={(e) => {
                                        const newType = e.target.value as Question["question_type"];
                                        let newOptions: any[] = [];
                                        let newCorrectAnswer = "";

                                        if (newType === "True or False") {
                                            newOptions = ["True", "False"];
                                            newCorrectAnswer = "True";
                                        }

                                        handleQuestionChange(index, {
                                            ...question,
                                            question_type: newType,
                                            options: newOptions,
                                            correct_answer: newCorrectAnswer
                                        });
                                    }}
                                    required
                                >
                                    <option value="True or False">True or False</option>
                                    <option value="Multiple Choice">Multiple Choice</option>
                                    <option value="Fill In The Blank">Fill In The Blank</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Question Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter question text"
                                    value={question.question_text}
                                    onChange={(e) => handleQuestionChange(index, { ...question, question_text: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            {question.question_type === "Multiple Choice" && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Options</Form.Label>
                                    {question.options.map((option, optionIndex) => (
                                        <Row key={optionIndex} className="mb-2">
                                            <Col>
                                                <Form.Control
                                                    type="text"
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                                />
                                            </Col>
                                            <Col xs="auto">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleRemoveOption(index, optionIndex)}
                                                >
                                                    Remove
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button variant="secondary" onClick={() => handleAddOption(index)}>
                                        Add Option
                                    </Button>
                                </Form.Group>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label>Correct Answer</Form.Label>
                                {question.question_type === "True or False" ? (
                                    <div>
                                        <Form.Check
                                            type="radio"
                                            label="True"
                                            name={`correct-${index}`}
                                            checked={question.correct_answer === "True"}
                                            onChange={() => handleQuestionChange(index, {
                                                ...question,
                                                correct_answer: "True"
                                            })}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="False"
                                            name={`correct-${index}`}
                                            checked={question.correct_answer === "False"}
                                            onChange={() => handleQuestionChange(index, {
                                                ...question,
                                                correct_answer: "False"
                                            })}
                                        />
                                    </div>
                                ) : question.question_type === "Multiple Choice" ? (
                                    <Form.Select
                                        value={String(question.correct_answer)}
                                        onChange={(e) => handleQuestionChange(index, {
                                            ...question,
                                            correct_answer: e.target.value
                                        })}
                                        required
                                    >
                                        <option value="">Select correct answer</option>
                                        {question.options.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Select>
                                ) : (
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter correct answer"
                                        value={String(question.correct_answer)}
                                        onChange={(e) => handleQuestionChange(index, {
                                            ...question,
                                            correct_answer: e.target.value
                                        })}
                                        required
                                    />
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Points</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter points"
                                    value={question.points}
                                    onChange={(e) => handleQuestionChange(index, { ...question, points: Number(e.target.value) })}
                                    min={1}
                                    required
                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                ))}
                <Button variant="secondary" onClick={handleAddQuestion} style={{ width: "100px", height: "100px", fontSize: "40px" }}>
                    <AiOutlinePlus />
                </Button>
            </div>
            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
                <Button variant="danger" type="submit" onClick={handleCreateQuiz}>Save</Button>
            </Link>
        </Form>
    );
}
