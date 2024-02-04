import { Draggable, Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;

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
