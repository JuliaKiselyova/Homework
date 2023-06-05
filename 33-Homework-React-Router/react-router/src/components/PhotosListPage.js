import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPhotosByAlbum, getAlbumsByUser, getUsers } from '../api/API';

const PhotosListPage = () => {
    const [photos, setPhotos] = useState([]);
    const [album, setAlbum] = useState(null);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const albumId = searchParams.get('albumId');
    const userId = searchParams.get('userId');

    useEffect(() => {
        getPhotosByAlbum(albumId)
            .then((data) => setPhotos(data));
    }, [albumId]);

    useEffect(() => {
        getAlbumsByUser(userId)
            .then((albums) => {
                if (albums.length > 0) {
                    const foundAlbum = albums.find(album => album.id === parseInt(albumId));
                    setAlbum(foundAlbum);
                    getUsers()
                        .then((users) => {
                            const foundUser = users.find(user => user.id === parseInt(userId));
                            setUser(foundUser);
                        });
                }
            });
    }, [albumId, userId]);

    return (
        <div className="page">
            <h1>Photos List</h1>
            {user && <p>User: {user.name}</p>}
            {album && <p>Album: {album.title}</p>}
            <div className="photo-grid">
                {photos.map((photo) => (
                    <div key={photo.id} className="photo-card">
                        <img src={photo.thumbnailUrl} alt={photo.title} className="photo-thumbnail" />
                        <p className="photo-title">{photo.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosListPage;
