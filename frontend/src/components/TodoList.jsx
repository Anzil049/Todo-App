import TodoItem from './TodoItem';
import { useState } from 'react';

const FILTERS = ['All', 'Pending', 'Completed'];

const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
    const [filter, setFilter] = useState('All');

    const filtered = todos.filter(t => {
        if (filter === 'Pending') return !t.completed;
        if (filter === 'Completed') return t.completed;
        return true;
    })

    const counts = {
        All: todos.length,
        Pending: todos.filter(t => !t.completed).length,
        Completed: todos.filter(t => t.completed).length,
    };

    return (
        <>
            <div className='filter-tabs'>
                {FILTERS.map(f => (
                    <button
                        key={f}
                        className={`filter-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f}<span className='count-badge'>{counts[f]}</span>
                    </button>

                ))}
            </div>

            <div className="todo-list">
                {filtered.length === 0 ? (
                    <div className="empty-state">
                        {filter === 'Completed' ? '🎉 No completed tasks yet!' : '✨ Nothing here yet!'}
                    </div>
                ) : (
                    filtered.map(todo => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onToggle={onToggle}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default TodoList;