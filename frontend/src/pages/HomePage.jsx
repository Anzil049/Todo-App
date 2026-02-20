import useTodos from '../hooks/useTodos';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import StatsBar from '../components/StatsBar';

const HomePage = () => {
    const { todos, loading, error, addTodo, toggleTodo, editTodo, removeTodo } = useTodos();

    if (loading) return (
        <div className="loading-screen">
            <div className="spinner" />
            <p>Loading your tasks...</p>
        </div>
    );

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-icon">✓</div>
                <h1>My Tasks</h1>
                <p className="subtitle">Stay organized, stay productive</p>
            </header>

            {error && <div className="error-banner">⚠️ {error}</div>}

            <TodoForm onAdd={addTodo} />

            {todos.length > 0 && <StatsBar todos={todos} />}

            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={removeTodo}
            />
        </div>
    );
};

export default HomePage;