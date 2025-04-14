import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

type AddQuestionFormProps = {
    onSubmit: (questions: Question[]) => void;
    quiz_id: string;
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

export default function AddQuestionForm({ onSubmit, quiz_id }: AddQuestionFormProps) {
    const [questions, setQuestions] = useState<Question[]>([
        {
            _id: uuidv4(),
            quiz_id: quiz_id,
            question_text: "",
            question_type: "True or False",
            options: [],
            correct_answer: "",
            points: 1,
        },
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            _id: uuidv4(),
            quiz_id: quiz_id,
            question_text: "",
            question_type: "True or False",
            options: [],
            correct_answer: "",
            points: 1,
        }]);
    };

    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
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
                quiz_id: quiz_id,
                question_text: "",
                question_type: "True or False",
                options: [],
                correct_answer: "",
                points: 1,
            },
        ]);
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
                                    onChange={(e) => handleQuestionChange(index, {
                                        ...question,
                                        question_type: e.target.value as Question["question_type"],
                                        options: [],
                                    })}
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
                                <Form.Control
                                    type="text"
                                    placeholder="Enter correct answer"
                                    value={question.correct_answer as string}
                                    onChange={(e) => handleQuestionChange(index, { ...question, correct_answer: e.target.value })}
                                    required
                                />
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

        </Form>
    );
}
