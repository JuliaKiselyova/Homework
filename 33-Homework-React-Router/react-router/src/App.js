import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersListPage from './components/UsersListPage';
import AlbumsListPage from './components/AlbumsListPage';
import PhotosListPage from './components/PhotosListPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<UsersListPage />} />
          <Route path="/albums/:userId" element={<AlbumsListPage />} />
          <Route path="/photos" element={<PhotosListPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
