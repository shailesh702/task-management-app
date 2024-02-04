import React, { useEffect, useState } from "react";
// import ShowListTaskList from "./ShowListTaskList";
import ShowForm from "./ShowForm";
import { DragDropContextContainer, ListGrid } from "./StyledComponents";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
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
    const [showDelete, setshowDelete] = useState(true);
    const [toggleSubmit, settoggleSubmit] = useState(true);
    const [isEditItem, setisEditItem] = useState(null);
    const [showList, setshowList] = useState(true);

    //   const [addMessage, setaddMessage] = useState('')
    const [editMessage] = useState(false);
    const [deleteMessage, setdeleteMessage] = useState(false);
    // const [setdeleteMessagesuccess] = useState(false);
    const [startMessage, setstartMessage] = useState(false);
    const [completeMessage, setcompleteMessage] = useState(false)

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
        setshowList(true);
        setshowNew(true);
        let allData;
        e.preventDefault();
        if (!inputData || !inputDesc) {
            setshowNew(false);
            alert("Fill data");
            // showList(false);
            // setshowForm(false);

        } else if (inputData && !toggleSubmit) {

            setitems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData, desc: inputDesc };
                    }
                    return { ...elem, category: "Added" };
                })
            );

            setinputData("");
            setinputDesc("");
            settoggleSubmit(true);
            setshowForm(false);
            setshowDelete(true);
        } else {
            const allInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
                desc: inputDesc,
                category: "Added",
                startDate: "",
                endDate: "",
                prefix: "todo"
            };
            // setitems([allInputData, ...items['todo']]);
            setitems({ ...items, todo: [allInputData, ...items['todo']] });
            setinputData("");
            setinputDesc("");
            setshowForm(false);
            // allData = [allInputData, ...items['todo']];
            allData = { ...items, todo: [allInputData, ...items['todo']] };
            localStorage.setItem("items", JSON.stringify(allData));
        }
    };

    //   DELETE
    const handleDelete = (index, keyElement) => {
        const updatedItems = items[keyElement].filter((elem) => {
            return index !== elem.id;
        });
        setdeleteMessage(true);
        setitems({ ...items, [keyElement]: updatedItems });
        setTimeout(() => {
            setdeleteMessage(false);
        }, 2000);
        // setdeleteMessagesuccess(false);
        localStorage.setItem("items", JSON.stringify({ ...items, [keyElement]: updatedItems }));
    };

    //   EDIT
    const handleEdit = (id) => {
        setshowList(false);
        setshowDelete(false);
        setshowNew(false);
        setshowForm(true);

        settoggleSubmit(false);
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        setinputData(newEditItem.name);
        setinputDesc(newEditItem.desc);
        // setshowDelete(true)

        setisEditItem(id);
        console.log(newEditItem);
    };

    //   START TASK
    const onStartTask = (id) => {
        const updatedItems = items.map((elem) => {
            if (id === elem.id) {
                return { ...elem, status: !elem.status, category: "Started", startDate: new Date().toLocaleString(), endDate: "", prefix: "inProgress" };
            }
            return elem;
        });
        setitems(updatedItems);
        setstartMessage(true);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        setTimeout(() => {
            setstartMessage(false);
        }, 2000);
    };


    //   COMPLETE
    const onCompleteTodo = (id) => {
        const updatedItems = items.map((elem) => {
            if (id === elem.id) {
                return { ...elem, status: !elem.status, category: "Completed", endDate: new Date().toLocaleString(), prefix: "done" };
            }
            return elem;
        });
        setitems(updatedItems);
        setcompleteMessage(true);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        setTimeout(() => {
            setcompleteMessage(false);
        }, 2000);
    };


    // ADD NEW TASK
    const handleAdd = () => {
        setshowNew(false);
        setshowForm(true);
        setshowList(true);
    }

    // const _onDragEnd = (result) => {
    //     if (!result.destination) {
    //         return;
    //     }
    //     const newItems = Array.from(items);
    //     const [removed] = newItems.splice(result.source.index, 1);
    //     newItems.splice(result.destination.index, 0, removed);
    //     setitems(newItems);
    // };

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
            {/* {showList ? (
                <ShowListTaskList
                    deleteMessage={deleteMessage}
                    editMessage={editMessage}
                    items={items}
                    showDelete={showDelete}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    onCompleteTodo={onCompleteTodo}
                    completeMessage={completeMessage}
                    onStartTask={onStartTask}
                    startMessage={startMessage}
                    onDragEnd={_onDragEnd}
                />
            ) : (
                ""
            )} */}


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