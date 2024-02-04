import React from "react";
import { CardHeader, Author, CardFooter, DragItem, CardBody } from './StyledComponents';

const ListItem = ({ item, provided, snapshot, onStartTask, onCompleteTodo, handleDelete, handleEdit, showDelete, index }) => {

    return (

        <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <CardHeader>{item.name}</CardHeader>
            {/* <span>{item.id}</span> */}
            <CardBody>
                <span>{item.desc}</span>
            </CardBody>
            <CardFooter>
                <div style={{}}>
                    {item.category === "Completed" || item.category === "Started" || item.prefix === "inProgress" || item.prefix === "done" ? (
                        <p style={{ fontSize: 10 }}>Start Time: {item.startDate}</p>
                    ) : null}
                    {item.category === "Completed" || item.prefix === "done" ? (
                        <p style={{ fontSize: 10 }}>End Time: {item.endDate}</p>
                    ) : null}
                </div>

                <Author>
                    {/* {item.category === "Added" && (
                                <button
                                    className="button btn icon-only border"
                                    onClick={() => onStartTask(item.id)}
                                >
                                    Start
                                </button>
                            )}
                            {item.category === "Started" && (
                                <>

                                    <button
                                        className="button btn icon-only border"
                                        onClick={() => onCompleteTodo(item.id)}
                                    >
                                        Complete
                                    </button>
                                </>
                            )} */}

                    {/* <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleEdit(item.id)}
                    >
                        Edit
                    </button> */}

                    {/* {showDelete ? (
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            ) : (
                                ""
                            )} */}

                </Author>
            </CardFooter>
        </DragItem>

    );
};

export default ListItem;
