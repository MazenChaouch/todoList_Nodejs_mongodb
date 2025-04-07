const express = require("express");
const methodOverride = require("method-override");
const todoRoutes = require("./routes/todos");
const { connectToDb } = require("./helpers/db");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.redirect("/todos");
});

connectToDb().then(
  app.listen(8000, () => {
    console.log("server is running on http://localhost:8000");
  }),
);
