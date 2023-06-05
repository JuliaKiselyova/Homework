import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAlbumsByUser, getUsers } from '../api/API';

const AlbumsListPage = () => {
    const [albums, setAlbums] = useState([]);
    const [user, setUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        getAlbumsByUser(userId)
            .then((data) => setAlbums(data));
    }, [userId]);

    useEffect(() => {
        // Fetch users and find the user with matching userId
        getUsers()
            .then((users) => {
                const foundUser = users.find(user => user.id === parseInt(userId));
                setUser(foundUser);
            });
    }, [userId]);

    return (
        <div className="page">
            <h1>Albums List</h1>
            {user && <p>User: {user.name}</p>}
            <ul className="album-list">
                {albums.map((album) => (
                    <li key={album.id}>
                        <Link to={`/photos?albumId=${album.id}&userId=${userId}`} className="album-link">{album.title}</Link>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumsListPage;
