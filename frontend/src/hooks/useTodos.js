// Custom Hook — keeps all state logic out of components
import { useState, useEffect } from 'react';
import todoService from '../services/todoService';

const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { fetchTodos(); }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const res = await todoService.getAll();
            setTodos(res.data.data);
        } catch {
            setError('failed to load todos');
        } finally {
            setLoading(false);
        }
    }

    const addTodo = async (title) => {
        const res = await todoService.create(title);
        setTodos(prev => [res.data.data, ...prev]);
    };

    const toggleTodo = async (id,completed) => {
        const res = await todoService.update(id, { completed: !completed });
        setTodos(prev => prev.map(t => t._id === id ? res.data.data : t))
    };

    const editTodo = async (id, title) => {
        const res = await todoService.update(id, { title });
        setTodos(prev => prev.map(t => t._id === id ? res.data.data : t));
    };

    const removeTodo = async (id) => {
        await todoService.delete(id);
        setTodos(prev => prev.filter(t => t._id !== id));
    }

    return { todos, loading, error, addTodo, toggleTodo, editTodo, removeTodo};

};

export default useTodos;
