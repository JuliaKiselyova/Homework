import React from 'react';
import Header from './components/Header';
import FavoriteAnimal from './components/FavoriteAnimal';
import Display from './components/Display';
import Name from './components/Name';
import Footer from './components/Footer';
import './App.css';


function App() {
  const [name, setName] = React.useState('');
  const [animal, setAnimal] = React.useState('');

  return (
    <div className="App">
      <Header />
      <div className="container">
        <form>
          <Name name={name} onNameChange={event => setName(event.target.value)} />
          <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
          <Display name={name} animal={animal} />
        </form>
      </div>
      <Footer />
    </div>
  );
}


export default App;