const { ObjectId } = require("mongodb");
const { getDB } = require("../helpers/db");

const getAllTodos = async (req, res) => {
  const db = getDB();
  const todos = await db.collection("todos").find().toArray();
  console.log(todos);
  res.render("index", { todos });
};

const createformView = (req, res) => {
  res.render("new");
};

const createTodo = async (req, res) => {
  const db = getDB();
  const todo = { title: req.body.title, description: req.body.description };
  await db.collection("todos").insertOne(todo);
  res.redirect("/todos");
};

const updateTodo = async (req, res) => {
  const db = getDB();
  await db
    .collection("todos")
    .updateOne(
      { _id: new ObjectId(req.params._id) },
      { $set: { title: req.body.title, description: req.body.description } },
    );
  res.redirect("/todos");
};
const updateFormView = async (req, res) => {
  const db = getDB();
  const todo = await db
    .collection("todos")
    .findOne({ _id: new ObjectId(req.params._id) });
  res.render("edit", { todo });
};

const deletetodo = async (req, res) => {
  const db = getDB();
  await db.collection("todos").deleteOne({ _id: new ObjectId(req.params._id) });
  res.redirect("/todos");
};

const todoView = async (req, res) => {
  const db = getDB();
  const todo = await db
    .collection("todos")
    .findOne({ _id: new ObjectId(req.params._id) });
  if (!todo) res.send("todo not found");
  else res.render("show", { todo });
};

module.exports = {
  getAllTodos,
  createformView,
  createTodo,
  updateTodo,
  updateFormView,
  deletetodo,
  todoView,
};
