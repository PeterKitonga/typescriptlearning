import React from "react";

interface TodoListProps {
    items: { _id: string, text: string }[];
    onDeleteTodo: (_id: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {
    return (
        <ul className="todo">
            {props.items.map(item => (
                <li className="todo__item" key={item._id}>
                    <span className="todo__item-text">{item.text}</span>
                    <button className="todo__item-btn" onClick={props.onDeleteTodo.bind(null, item._id)}>DELETE</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;