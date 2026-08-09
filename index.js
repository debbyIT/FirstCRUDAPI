const express = require('express');
const { truncate } = require('node:fs');
const app = express();
const port = 3000;


const tasks= [
    { "id": 1, "title": "Write Code", "done": true },
    { "id": 2, "title": "Test Code", "done": false },
    { "id": 3, "title": "Deploy Code", "done": true }
]

//Home Page
app.get('/', (req, res) => {
    res.json(
        { "name": "Task API", 
            "version": "1.0", 
            "endpoints": ["/tasks"] 
        })
});

//Health Check Endpoint
app.get('/health',(req,res) =>{
    res.json({"status": "ok"})
});

//Get All Tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Get Task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ "error": `Task ${taskId} not found` });
    }

});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});