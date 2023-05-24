import React, { useState } from 'react';
function Header({ onAddTodo }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        onAddTodo({
            title,
            status: true,
            done: false,
            id: Math.random().toString(),
            toDo: '',
        });
        setTitle('');
    };

    return (
        <header>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add todo..." value={title} onChange={(e) => setTitle(e.target.value)} />
                <button>Add</button>
            </form>
        </header>
    );
}

export default Header;
