import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
}) {
    const dispatch = useDispatch();
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>{todo.title}</span>
            <div className="d-flex gap-2">
                <Button onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-set-todo-click"
                    className="btn btn-primary"> Edit </Button>
                <Button onClick={() => dispatch(setTodo(todo))}
                    id="wd-delete-todo-click"
                    className="btn btn-danger"> Delete </Button>
            </div>
        </ListGroup.Item>
    );
}
