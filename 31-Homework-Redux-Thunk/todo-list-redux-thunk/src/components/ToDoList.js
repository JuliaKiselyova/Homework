import React from 'react';
import TodoItem from './ToDoItem';

function ToDoList({ list, onUpdate, onDelete }) {
    return (
        <ul>
            {list.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default ToDoList;
