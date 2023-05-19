import React from 'react';

function Name({ name, onNameChange }) {
    return (
        <div className="userName">
            <label htmlFor="name">Name: </label>
            <input id="name" value={name} onChange={onNameChange} />
        </div>
    )
}

export default Name;
