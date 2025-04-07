const express = require("express");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// display all todos
app.get("/todos", (req, res) => {
  res.render("index", { todos });
});
// display a form to create new todo
app.get("/todos/new", (req, res) => {
  res.render("new");
});
// create a new todo
app.post("/new", (req, res) => {
  const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
  const todo = { id, title: req.body.title, description: req.body.description };
  todos.push(todo);
  res.redirect("/todos");
});
// update todo
app.put("/todos/:id", (req, res) => {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  todos[index].title = req.body.title;
  todos[index].description = req.body.description;
  res.redirect("/todos");
});
// display update form
app.get("/todos/:id/edit", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.id);
  res.render("edit", { todo });
});
//delete task
app.delete("/todos/:id/delete", (req, res) => {
  todos = todos.filter((todo) => todo.id != req.params.id);
  res.redirect("/todos");
});
// display single todo
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id == req.params.id);
  if (!todo) res.send("todo not found");
  else res.render("show", { todo });
});
app.listen(8000, () => {
  console.log("server is running on http://localhost:8000");
});

let todos = [
  { id: 1, title: "Buy groceries", description: "Milk, Bread, Eggs" },
  { id: 2, title: "Workout", description: "Go for a 30-minute run" },
  { id: 3, title: "Study", description: "Read about JavaScript functions" },
];
