import React, { useState } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';
import './App.css';

const initialList = [
  {
    title: 'facere blanditiis illumvddv',
    status: true,
    done: false,
    id: '96',
    toDo: '',
  },
  {
    title: 'itaque eveniet rationevdvdsvds',
    status: true,
    done: true,
    id: '98',
    toDo: '',
  },
  {
    title: 'molestiae nemo minus',
    status: true,
    done: true,
    id: '99',
    toDo: '',
  },
];

function App() {
  const [list, setList] = useState(initialList);
  const [filter, setFilter] = useState('all');

  function handleAdd(title) {
    setList([
      ...list,
      {
        title,
        status: true,
        done: false,
        id: Math.random().toString(),
        toDo: '',
      },
    ]);
  }

  function handleUpdate(id, updatedValue) {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedValue // update the item with the new values
          };
        }
        return item;
      })
    );
  }

  function handleDelete(id) {
    setList(list.filter((i) => i.id !== id));
  }

  const count = list.filter((i) => !i.done).length;

  function handleFilterChange(filterType) {
    setFilter(filterType);
  }

  let filteredList = list;
  if (filter === 'done') {
    filteredList = list.filter((item) => item.done);
  } else if (filter === 'not-done') {
    filteredList = list.filter((item) => !item.done);
  }

  return (
    <div className="App">
      <Header onAdd={handleAdd} />
      <ToDoList list={filteredList} onUpdate={handleUpdate} onDelete={handleDelete} />
      <Footer count={count} onFilterChange={handleFilterChange} />
    </div>
  );
}

export default App;
