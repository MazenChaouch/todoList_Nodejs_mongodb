const express = require("express");
const Router = express.Router();
const {
  getAllTodos,
  createformView,
  createTodo,
  updateTodo,
  updateFormView,
  deletetodo,
  todoView,
} = require("../controllers/todos");

Router.get("/", getAllTodos); // display all todos
Router.get("/new", createformView); // display a form to create new todo
Router.post("/new", createTodo); // create a new todo
Router.put("/:_id", updateTodo); // update todo
Router.get("/:_id/edit", updateFormView); // display update form
Router.delete("/:_id/delete", deletetodo); //delete task
Router.get("/:_id", todoView); // display single todo

module.exports = Router;
