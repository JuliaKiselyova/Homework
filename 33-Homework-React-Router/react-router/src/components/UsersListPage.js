import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/API';

const UsersListPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data));
    }, []);

    return (
        <div className="page">
            <h1>Users List</h1>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/albums/${user.id}`} className="user-link">{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersListPage;
