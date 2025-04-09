import { addModule, editModule, updateModule, deleteModule, setModules }
    from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import ModulesControls from "./ModulesControls";
import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import ModulesControlButton from "./ModulesControlButton";
import LessonControlButtons from "./LessonControlButtons";
import * as coursesClient from "../client";
import { useState, useEffect } from "react";
import FormControl from "react-bootstrap/FormControl";
import FacultyContent from "../../FacultyContent";
import * as modulesClient from "./client";

export default function Modules() {
    const { cid } = useParams();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const [moduleName, setModuleName] = useState("");

    const fetchModules = async () => {
        const modules = await coursesClient.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };

    const deleteModuleHandler = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };
    const fetchModulesForCourse = async () => {
        const modules = await coursesClient.findModulesForCourse(cid!);
        dispatch(setModules(modules));
    };
    const addModuleHandler = async () => {
        const newModule = await coursesClient.createModuleForCourse(cid!, {
            name: moduleName,
            course: cid,
        });
        dispatch(addModule(newModule));
        setModuleName("");
    };
    const updateModuleHandler = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };


    useEffect(() => {
        fetchModulesForCourse();
    }, [cid]);


    useEffect(() => {
        fetchModules();
    }, []);

    return (
        <div>
            <FacultyContent>
                <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={addModuleHandler} />
            </FacultyContent>

            <br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules
                    .map((module: any) => (
                        <li key={module.id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing && module.name}
                                {module.editing && (
                                    <FormControl className="w-50 d-inline-block"
                                        onChange={(e) => updateModuleHandler({ ...module, name: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateModuleHandler({ ...module, editing: false });
                                            }
                                        }}
                                        defaultValue={module.name} />
                                )}
                                <ModulesControlButton moduleId={module._id}
                                    deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                            </div>
                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <li key={lesson.id} className="wd-lesson list-group-item p-3 ps-1">
                                            <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                                        </li>
                                    ))}</ul>)}</li>))}
            </ul>
        </div >
    );
}
