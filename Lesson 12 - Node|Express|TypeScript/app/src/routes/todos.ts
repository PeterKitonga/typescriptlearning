import { Router } from 'express';

import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.get('/', getTodos);

router.post('/add', addTodo);

router.put('/update/:_id', updateTodo);

router.delete('/delete/:_id', deleteTodo);

export default router;