import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import homeImage from '../home.png'; // Import the image file

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="button-container">
                    <Button type="primary" size="large" className="custom-button">
                        <Link to="/orders">Explore Orders</Link>
                    </Button>
                </div>
                <div className="image-container">
                    <img
                        src={homeImage}
                        alt="Restaurant"
                        className="restaurant-image"
                    />
                </div>
                <h1 className="home-title">Welcome to the Restaurant App</h1>
            </div>
        </div>
    );
};

export default Home;
