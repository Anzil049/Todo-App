import { useState } from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);

    const handleEdit = async () => {
        if (!editText.trim()) return;
        await onEdit(todo._id, editText.trim());
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleEdit();
        if (e.key === 'Escape') { setEditText(todo.title); setIsEditing(false); }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>

            <button
                className={`checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => onToggle(todo._id, todo.completed)}
            >
                {todo.completed && '✓'}
            </button>

            {isEditing ? (
                <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleEdit}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span className="todo-title" onDoubleClick={() => setIsEditing(true)}>
                    {todo.title}
                </span>
            )}

            <div className="todo-actions">
                <button className="btn btn-edit" onClick={() => setIsEditing(!isEditing)}>✏️</button>
                <button className="btn btn-delete" onClick={() => onDelete(todo._id)}>🗑️</button>
            </div>

        </div>
    );
};

export default TodoItem;