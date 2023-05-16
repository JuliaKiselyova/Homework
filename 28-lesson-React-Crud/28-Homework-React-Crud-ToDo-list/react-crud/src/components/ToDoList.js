import React from 'react';
import ToDoItem from './ToDoItem';

function ToDoList({ list, onDelete, onUpdate }) {
    return (
        <ul>
            {list.map((item) => (
                <ToDoItem key={item.id} item={item} deleteTodo={onDelete} updateTodo={onUpdate} />
            ))}
        </ul>
    );
}

export default ToDoList;
