import React, { useState } from 'react';

function Header({ onAdd }) {
    const [title, setTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!title) return;
        onAdd(title);
        setTitle('');
    }

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
