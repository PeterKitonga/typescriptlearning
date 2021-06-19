import React, { useRef } from "react";

interface AddTodoProps {
    onAddTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = (props) => {
    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = textInputRef.current!.value;
        props.onAddTodo(enteredText);
    };

    return (
        <form className="todo-form" onSubmit={todoSubmitHandler}>
            <div className="todo-form__group">
                <label className="todo-form__group-label" htmlFor="todo-text">Todo Text</label>
                <input className="todo-form__group-control" type="text" ref={textInputRef} id="todo-text" />
            </div>
            <button className="todo-form__submit" type="submit">ADD TODO</button>
        </form>
    );
};

export default AddTodo;