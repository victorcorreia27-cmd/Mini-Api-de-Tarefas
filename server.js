const express = require("express");
const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Estudar Git no VS Code", done: false },
  { id: 2, title: "Criar mini API", done: true },
];

app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch("/tasks/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  task.done = !task.done;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
