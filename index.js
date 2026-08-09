const express = require('express');
const { truncate } = require('node:fs');
const app = express();
const port = 3000;

app.use(express.json());

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

//Add New Task
app.post('/tasks', (req, res) => {

    const {title} = req.body;
    if(!title){
        res.status(400).json({"error": "Title is required"});
    }
    const newTask ={
        id: tasks.length + 1,
        title: title,
        done: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//Update Task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        res.status(404).json({ "error": `Task ${taskId} not found` });
        return;
    }
    const {title, done} = req.body;
    if(req.body === undefined || Object.keys(req.body).length === 0){
        res.status(400).json({"error": "Request body is empty"});
        return;
    }
    if (title !== undefined) {
        task.title = title;
    }
    if (done !== undefined) {
        task.done = done;
    }
    
    res.status(200).json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if(taskIndex === -1){
        res.status(404).json({"error": `Task ${taskId} not found`});
        return;
    }
    tasks.splice(taskIndex, 1);
    res.status(204).json({"message": `Task ${taskId} deleted`});

});


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});