
import ToDoItem from './ToDoItem';
function ToDoList({ list, onUpdate, onDelete }) {
    return (
        <ul>
            {list.map((item) => (
                <ToDoItem
                    key={item.id}
                    item={item}
                    onUpdateTodo={onUpdate}  
                    onDeleteTodo={onDelete}  
                />
            ))}
        </ul>
    );
}


export default ToDoList;
