import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodoItem } from '../store/actions/todo';

function TodoItem({ todo, onDelete }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handleCheckboxChange = () => {
        const updatedTodo = { ...todo, done: !todo.done };
        dispatch(updateTodoItem(todo.id, updatedTodo));
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleUpdateTodo = () => {
        if (title.trim() !== '') {
            const updatedTodo = { ...todo, title };
            dispatch(updateTodoItem(todo.id, updatedTodo));
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    return (
        <li>
            <input type="checkbox" checked={todo.done} onChange={handleCheckboxChange} />

            {isEditing ? (
                <input type="text" value={title} onChange={handleTitleChange} onBlur={handleUpdateTodo} />
            ) : (
                <span onClick={() => setIsEditing(true)}>{todo.title}</span>
            )}

            <button onClick={handleDelete}>Delete</button>
        </li>
    );
}

export default TodoItem;
