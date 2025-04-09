import { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables" className="px-4">
            <h2>Array State Variable</h2>
            <button className="btn btn-success mb-4"
            onClick={addElement}>Add Element</button>
            <ul className="list-none rounded">
                {array.map((item, index) => (
                    <li key={index}
                    className="d-flex justify-content-between list-group-item align-items-center max-w-sm border px-3 py-2 w-25">
                        {item}
                        <button onClick={() => deleteElement(index)}
                            id="wd-delete-element-click"
                            className="btn btn-danger">
                            Delete</button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}
