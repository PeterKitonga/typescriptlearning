import { RequestHandler } from 'express';

import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

interface TodoInput {
    text: string;
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json({ data: TODOS });
};

export const addTodo: RequestHandler = (req, res, next) => {
    const { text } = <TodoInput>req.body;
    const randomNumber = Math.floor(Math.random() * 999999) + 100000;
    const newTodo = new Todo(randomNumber.toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({ data: newTodo });
};

export const updateTodo: RequestHandler<{ _id: string }> = (req, res, next) => {
    const { _id } = req.params;

    const { text } = <TodoInput>req.body;
    const index = TODOS.findIndex(item => item._id === _id);

    if (index === -1) {
        throw new Error(`Todo '${_id}' not found.`);
    }

    TODOS[index] = new Todo(TODOS[index]._id, text);

    res.status(200).json({ data: TODOS[index] });
};

export const deleteTodo: RequestHandler<{ _id: string }> = (req, res, next) => {
    const { _id } = req.params;

    const { text } = <TodoInput>req.body;
    const index = TODOS.findIndex(item => item._id === _id);

    if (index === -1) {
        throw new Error(`Todo '${_id}' not found.`);
    }

    TODOS.splice(index, 1);

    res.status(200).json({ data: TODOS });
};