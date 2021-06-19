import React, { useState } from 'react';

import { Todo } from './todos.model';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos(currentTodos => [
      ...currentTodos,
      { _id: Math.random().toString(), text }
    ]);
  };

  const deleteTodo = (_id: string) => {
    setTodos(currentTodos => {
      return currentTodos.filter(item => item._id !== _id);
    });
  };

  return (
    <div className="App">
      <AddTodo onAddTodo={addTodo} />
      <TodoList items={todos} onDeleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
