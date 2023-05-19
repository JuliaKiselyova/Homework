import React, { useState } from 'react';

function Header({ onAdd }) {
    

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
