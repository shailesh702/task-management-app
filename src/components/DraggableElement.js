import { Draggable, Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import { ColumnHeader, DroppableStyles } from "./StyledComponents";

const DraggableElement = ({ prefix, elements }) => (
    <DroppableStyles>
        <ColumnHeader>{prefix === 'todo' ? "New Task List" : prefix === 'inProgress' ? "Task in Progress" : "Completed Task List"}</ColumnHeader>
        <Droppable droppableId={`${prefix}`}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {elements.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                // <ListItem key={item.id} item={item} index={index} />
                                <ListItem
                                    provided={provided}
                                    snapshot={snapshot}
                                    item={item}
                                    // onStartTask={onStartTask}
                                    // handleEdit={handleEdit}
                                    // handleDelete={handleDelete}
                                    // showDelete={showDelete}
                                    index={index}
                                />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DroppableStyles>
);

export default DraggableElement;
