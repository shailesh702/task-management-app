import React, { useEffect, useState } from "react";

import ShowForm from "./ShowForm";
import { DragDropContextContainer, ListGrid } from "./StyledComponents";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
};

const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
};

const lists = ["todo", "inProgress", "done"];

const ToDo = () => {

    const [showNew, setshowNew] = useState(true);
    const [showForm, setshowForm] = useState(false);
    const [toggleSubmit, settoggleSubmit] = useState(true);

    const [inputData, setinputData] = useState("");
    const [inputDesc, setinputDesc] = useState("");

    const [items, setitems] = useState(
        {
            "todo": [],
            "inProgress": [],
            "done": []
        }
    );

    useEffect(() => {
        const localData = localStorage.getItem("items");
        if (localData) {
            setitems(JSON.parse(localData));
        }
    }, []);

    //  Start code for HANDLING INPUT FIELDS
    const handleInput = (e) => {
        setinputData(e.target.value);
    };
    const handleInputdesc = (e) => {
        setinputDesc(e.target.value);
    };
    //  End code for HANDLING INPUT FIELDS

    //   SUBMITTING FORM
    const handleSubmit = (e) => {
        setshowNew(true);
        let allData;
        e.preventDefault();
        if (!inputData || !inputDesc) {
            setshowNew(false);
            alert("Fill data");
        }
        else {
            const allInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
                desc: inputDesc,
                category: "Added",
                startDate: "",
                endDate: "",
                prefix: "todo"
            };
            setitems({ ...items, todo: [allInputData, ...items['todo']] });
            setinputData("");
            setinputDesc("");
            setshowForm(false);
            allData = { ...items, todo: [allInputData, ...items['todo']] };
            localStorage.setItem("items", JSON.stringify(allData));
        }
    };

    //   DELETE
    const handleDelete = (index, keyElement) => {
        const updatedItems = items[keyElement].filter((elem) => {
            return index !== elem.id;
        });
        setitems({ ...items, [keyElement]: updatedItems });
        localStorage.setItem("items", JSON.stringify({ ...items, [keyElement]: updatedItems }));
    };

    // ADD NEW TASK
    const handleAdd = () => {
        setshowNew(false);
        setshowForm(true);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...items };
        const sourceList = listCopy[result.source.droppableId];
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination.droppableId];
        listCopy[result.destination.droppableId] = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );
        if (result.destination.droppableId === "inProgress") {
            listCopy[result.destination.droppableId][result.destination.index].startDate = new Date().toLocaleString();
            listCopy[result.destination.droppableId][result.destination.index].prefix = "inProgress";
        } else if (result.destination.droppableId === "done") {
            listCopy[result.destination.droppableId][result.destination.index].endDate = new Date().toLocaleString();
            listCopy[result.destination.droppableId][result.destination.index].prefix = "done";
        }
        setitems(listCopy);
        localStorage.setItem("items", JSON.stringify(listCopy));
    };

    return (
        <>
            {
                showNew ? (
                    <div>
                        <div className="container">
                            <div className="col-12 text-end margin-vertical-10">
                                <button className="btn btn-primary" onClick={handleAdd}>
                                    New Task
                                </button>
                            </div>
                        </div>
                    </div >)
                    :
                    ("")
            }
            {showForm ? (
                <>
                    <ShowForm
                        showForm={showForm}
                        toggleSubmit={toggleSubmit}
                        handleInput={handleInput}
                        handleInputdesc={handleInputdesc}
                        handleSubmit={handleSubmit}
                        inputData={inputData}
                        inputDesc={inputDesc}
                    />
                </>

            )
                :
                ("")

            }
            {items['done'].length === 0 && items['inProgress'].length === 0 && items['todo'].length === 0 ? <p>Your task list is empty. Click on New Task button to add new task.</p> :
                <DragDropContextContainer>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <ListGrid>
                            {lists.map((listKey) => (
                                <DraggableElement
                                    elements={items[listKey]}
                                    key={listKey}
                                    prefix={listKey}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </ListGrid>
                    </DragDropContext>
                </DragDropContextContainer>
            }

        </>
    )
}
export default ToDo;