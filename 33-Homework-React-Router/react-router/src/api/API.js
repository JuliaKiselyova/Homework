export const getUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
};

export const getAlbumsByUser = (userId) => {
    return fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(response => response.json());
};

export const getPhotosByAlbum = (albumId) => {
    return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then(response => response.json());
};
