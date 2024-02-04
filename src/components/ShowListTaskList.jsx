import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListItem from "./ListItem";
// import DraggableElement from "./DraggableElement";
// import styled from "styled-components";

const ShowListTaskList = ({ completeMessage, deleteMessage, editMessage, items, showDelete, handleEdit, handleDelete, startMessage, onStartTask, onCompleteTodo, onDragEnd, ...props }) => {

    debugger
    const newlyAddedTaskList = items.filter(item => item.category == "Added");
    const startedTaskList = items.filter(item => item.category == "Started");
    const completedTaskList = items.filter(item => item.category == "Completed");

    return (
        <div className="container ">
            {completeMessage ? (
                <p className="text-center text-danger">Task Completed Successfully</p>
            ) : (
                ""
            )}

            {deleteMessage ? (
                <p className="text-center text-danger">Item Deleted Successfully</p>
            ) : (
                ""
            )}
            {editMessage ? (
                <p className="text-center text-danger">Item Edited Successfully</p>
            ) : (
                ""
            )}
            {startMessage ? (
                <p className="text-center text-danger">Your task has been started</p>
            ) : (
                ""
            )}
            {/* {
                deleteMessagesuccess && !deleteMessage ? <p className="text-center">item deleted successfully</p> : ""
            } */}


            <div className="row" style={{ marginTop: 50 }}>

                <div className="col-4" style={{ paddingRight: 0 }}>
                    <div className="border rounded">
                        <h2 className="task-header">New Task List</h2>
                        <div className="padding-horizontal-10">
                            {
                                newlyAddedTaskList.length == 0 ? <p>No Task to perform</p> :
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId="droppable">
                                            {(provided, snapshot) => (
                                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                                    {
                                                        newlyAddedTaskList.map((elem, index) => {
                                                            return (
                                                                <Draggable key={elem.id} draggableId={elem.id} index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <ListItem
                                                                            provided={provided}
                                                                            snapshot={snapshot}
                                                                            item={elem}
                                                                            onStartTask={onStartTask}
                                                                            handleEdit={handleEdit}
                                                                            handleDelete={handleDelete}
                                                                            showDelete={showDelete}
                                                                            index={index}
                                                                        />
                                                                    )}
                                                                </Draggable>
                                                            );
                                                        }
                                                        )
                                                    }

                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="border rounded">
                        <h2 className="task-header">Task in Progress</h2>
                        <div className="padding-horizontal-10">
                            {startedTaskList.length == 0 ? <p>No Task in Queue</p> :

                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppableStarted">
                                        {(provided, snapshot) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    startedTaskList.map((elem, index) => {
                                                        return (
                                                            <Draggable key={elem.id} draggableId={elem.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <ListItem
                                                                        provided={provided}
                                                                        snapshot={snapshot}
                                                                        item={elem}
                                                                        onCompleteTodo={onCompleteTodo}
                                                                        handleEdit={handleEdit}
                                                                        handleDelete={handleDelete}
                                                                        showDelete={showDelete}
                                                                        index={index}
                                                                    />
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })
                                                }
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            }
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="border rounded">
                        <h2 className="task-header">Completed Task List</h2>
                        <div className="padding-horizontal-10">
                            {completedTaskList.length == 0 ? <p>No Task have been completed.</p> :

                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppableCompleted">
                                        {(provided, snapshot) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {
                                                    completedTaskList.map((elem, index) => {
                                                        return (
                                                            <Draggable key={elem.id} draggableId={elem.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <ListItem
                                                                        provided={provided}
                                                                        snapshot={snapshot}
                                                                        item={elem}
                                                                        handleEdit={handleEdit}
                                                                        handleDelete={handleDelete}
                                                                        showDelete={showDelete}
                                                                        index={index}
                                                                    />
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ShowListTaskList;