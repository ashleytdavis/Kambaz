import { useState } from 'react'
import { FormControl } from 'react-bootstrap'

const QueryParameters = () => {
    const [a, setA] = useState("34")
    const [b, setB] = useState("23")
    const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER
    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>
            <FormControl id="wd-query-parameter-a"
                className="mb-2"
                defaultValue={a} type="number"
                onChange={(e) => setA(e.target.value)} />
            <FormControl id="wd-query-parameter-b"
                className="mb-2"
                defaultValue={b} type="number"
                onChange={(e) => setB(e.target.value)} />
            <div className='d-flex flex-column'>
                <a id="wd-query-parameter-add"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
                    Add {a} + {b}
                </a>
                <a id="wd-query-parameter-subtract"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
                    Substract {a} - {b}
                </a>
                <a id="wd-query-parameter-multiply"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>
                    Multiply {a} * {b}
                </a>
                <a id="wd-query-parameter-division"
                    href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>
                    Divide {a} / {b}
                </a>
            </div>
            <hr />
        </div >
    )
}

export default QueryParameters

