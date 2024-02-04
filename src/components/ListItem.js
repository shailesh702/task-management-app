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
                    <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(item.id, item.prefix)}
                    >
                        Delete
                    </button>

                </Author>
            </CardFooter>
        </DragItem>

    );
};

export default ListItem;
