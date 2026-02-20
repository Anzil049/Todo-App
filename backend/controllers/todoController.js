const Todo = require('../models/Todo');

//--GET all todos--
//GET /api/todos

const getAllTodos = async (req, res) => {
    try {
        //Sort by newest first using -1 on created at
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json({ success: true, data: todos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//--CREATE a todos--
// POST /api/todos

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        const todo = await Todo.create({ title });
        res.status(201).json({ success: true, data: todo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//--UPDATE a todo (edit a title or toggle completed)--
// PUT /api/todos/:id

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, completed },
            { returnDocument: 'after', runValidators: true }//return updated doc and validate
        )

        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        res.status(200).json({ success: true, data: todo })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//--DELETE a todo (edit a title or toggle completed)--
// DELETE /api/todos/:id

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ success: false, message: "todo not found" })
        }

        res.json({ success: true, message: "Todo deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };