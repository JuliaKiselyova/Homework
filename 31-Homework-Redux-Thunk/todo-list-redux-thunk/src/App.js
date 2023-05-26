
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import Footer from './components/Footer';
import { addTodo, updateTodoItem, deleteTodoItem, setFilter } from './store/actions/todo';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todo.list);
  const filter = useSelector((state) => state.todo.filter);
  const count = useSelector((state) => state.todo.list.filter((item) => !item.done).length);

  function handleAdd(title) {
    dispatch(addTodo({
      title,
      status: true,
      done: false,
      id: Math.random().toString(),
      toDo: '',
    }));
  }

  function handleUpdate(id, changes) {
    dispatch(updateTodoItem(id, changes));
  }

  function handleDelete(id) {
    dispatch(deleteTodoItem(id));
  }

  function handleFilterChange(filterType) {
    dispatch(setFilter(filterType));
  }

  let filteredList = list;
  if (filter === 'done') {
    filteredList = list.filter((item) => item.done);
  } else if (filter === 'not-done') {
    filteredList = list.filter((item) => !item.done);
  }

  return (
    <div className="App">
      <Header onAddTodo={handleAdd} />
      <ToDoList list={filteredList} onUpdate={handleUpdate} onDelete={handleDelete} />
      <Footer count={count} onFilterChange={handleFilterChange} />
    </div>
  );
}

export default App;
