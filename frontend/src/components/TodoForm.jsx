// Handles adding a new todo

import { useState } from "react";

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await onAdd(title.trim());
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="todo-input"
                autoFocus
            />
            <button type="submit" className="btn btn-add">+ Add</button>
        </form>
    );
};

export default TodoForm;