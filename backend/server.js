require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db');
const todoRoutes=require('./routes/todoRoutes')

const app=express();

//--Connect to MongoDB--
connectDB();  

//--Middleware--

app.use(cors());  //Allow frontend(react) to call this API
app.use(express.json());  

//--Routes--
app.use('/api/todos',todoRoutes);

app.get("/",(req,res)=>{
    res.json({message:"Todo API is running"});
});

//--Start Server--
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`🚀 server running on http://localhost:${PORT}`)
});



