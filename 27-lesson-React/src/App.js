import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Content from './components/Content';
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Navigation />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;