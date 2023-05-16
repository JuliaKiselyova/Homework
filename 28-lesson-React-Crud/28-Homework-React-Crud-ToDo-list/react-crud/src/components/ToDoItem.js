import React, { useState } from 'react';

function ToDoItem({ item, deleteTodo, updateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(item.title || '');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleUpdateTodo = () => {
        if (inputValue.trim() !== '') {
            updateTodo(item.id, { title: inputValue }); // pass id and new value as an object
            setIsEditing(false);
        }
    };

    const handleCheckboxChange = (event) => {
        updateTodo(item.id, { done: event.target.checked }); // pass id and new value as an object
    };


    return (
        <li className={item.done ? 'done' : ''}>
            {isEditing ? (
                <>
                    <input type="text" value={inputValue} onChange={handleInputChange} className="edit-input" />
                    <button onClick={handleUpdateTodo}>Save</button>
                </>
            ) : (
                <>
                    <input type="checkbox" checked={item.done} onChange={handleCheckboxChange} />
                    <span>{item.title}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                </>
            )}
        </li>
    );
}

export default ToDoItem;
