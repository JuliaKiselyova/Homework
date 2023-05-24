import React, { useState } from 'react';
function ToDoItem({ item, onUpdateTodo, onDeleteTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(item.title || '');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleUpdateTodo = () => {
        if (inputValue.trim() !== '') {
            onUpdateTodo(item.id, { title: inputValue }); 
            setIsEditing(false);
        }
    };

    const handleCheckboxChange = (event) => {
        onUpdateTodo(item.id, { done: event.target.checked }); 
    };

    const handleDeleteTodo = () => {
        onDeleteTodo(item.id);
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
                    <button onClick={handleDeleteTodo}>Delete</button>
                </>
            )}
        </li>
    );
}


export default ToDoItem;
