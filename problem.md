# Express CRUD App Exercise

## Context

You're going to build a very simple Express.js app that handles basic CRUD operations (Create, Read, Update, Delete) with a local in-memory data structure. The app will also use basic EJS views to render the frontend.

You'll simulate a basic **Todo List** system where users can:

- View all tasks
- View a single task
- Add a new task
- Edit a task
- Delete a task

---

## Data Structure

You will store the tasks in an array of objects like this:

```js
let todos = [
  { id: 1, title: "Buy groceries", description: "Milk, Bread, Eggs" },
  { id: 2, title: "Workout", description: "Go for a 30-minute run" },
  { id: 3, title: "Study", description: "Read about JavaScript functions" },
];
```

Each task has:

- `id`: a unique number
- `title`: the task title (string)
- `description`: the task description (string)

---

## Tasks

### 1. Setup

- Create a new Node.js project
- Install necessary dependencies
- Setup the Express app
- Set EJS as the view engine

### 2. Routes

Implement the following routes:

#### GET `/todos`

**What happens:**

- The server responds with a list of all tasks using the `todos` array.
- Render a view that loops through the array and displays each task’s title and description.
- This view should also offer links to view, edit, or delete each task, and to add a new task.

#### GET `/todos/:id`

**What happens:**

- Find the task by its `id` using `Array.find()`.
- If the task exists, render a view that shows the task's title and description in detail.
- If not found, show a "Task not found" message.

#### GET `/todos/new`

**What happens:**

- Render a form that allows the user to input a title and description.
- When submitted, this form sends a POST request to `/new` to create a new task.

#### POST `/new`

**What happens:**

- Get the submitted data (title and description) from `req.body`.
- Create a new task object with a unique `id` and push it into the `todos` array.
- Redirect to `/todos` to show the updated list.

#### GET `/todos/:id/edit`

**What happens:**

- Find the task by its `id`.
- Render a form pre-filled with the task’s current title and description.
- The form sends a POST request to `/todos/:id` to apply the changes.

#### POST `/todos/:id`

**What happens:**

- Retrieve the updated title and description from `req.body`.
- Find the task by `id` and update its values in the `todos` array.
- Redirect to `/todos` to view the updated list.

#### POST `/todos/:id/delete`

**What happens:**

- Remove the task from the array using `Array.filter()`.
- Redirect back to `/todos`.
- This route is triggered by a form with a delete button in the task list or task detail view.

---

## Views

You will create four main EJS view files inside the `views/todos/` folder:

### `index.ejs`

- Displays all tasks.
- For each task, show the title and description.
- Include buttons/links to view, edit, or delete the task.
- Include a link to the form to add a new task.

### `show.ejs`

- Displays details of a single task (title and description).
- Include a link to go back to the task list.
- You can optionally include a delete button here.

### `new.ejs`

- Displays a form with fields to enter a new task's title and description.
- When submitted, sends a POST request to add the new task.
- Include a cancel or back link to go to the task list.

### `edit.ejs`

- Displays a form pre-filled with the current task data.
- Allows updating the task title and description.
- When submitted, sends a POST request to update the task.
- Include a back link to the task list.

---

## Step 2: Refactor Into Routes and Controllers

Now that your CRUD functionality is working, it's time to clean up the code and follow better structure using **MVC principles** (Model, View, Controller).

### Objective

Separate your route logic into smaller pieces for **readability**, **scalability**, and **reusability**.

### Tasks

#### 1. Create a `routes/todos.js` file

- Move all task-related route definitions (GET, POST, etc.) into this file.
- Use `express.Router()` to create a router instance.
- Export the router and import it into your main `app.js` or `index.js`.
- Mount it under `/todos`.

#### 2. Create a `controllers/todoController.js` file

- Move the callback logic (what happens inside `req`, `res`) into separate functions.
- Export each function individually.
- In your routes file, import the controller functions and use them as handlers.

##### Example functions to define in the controller:

- `getAllTodos(req, res)`
- `getTodoById(req, res)`
- `renderNewTodoForm(req, res)`
- `createTodo(req, res)`
- `renderEditTodoForm(req, res)`
- `updateTodo(req, res)`
- `deleteTodo(req, res)`

---

## Step 3: Use MongoDB Instead of In-Memory Data

Once your app is well structured, upgrade it to use a real database. You’ll replace the in-memory array with **MongoDB**, using the **native MongoDB Node.js driver** (not Mongoose).

### Objective

Persist your task data in a MongoDB collection instead of RAM. This allows your data to survive server restarts and prepares you for real-world backend development.

### Tasks

#### 1. Setup MongoDB

- Install the native MongoDB driver: `npm install mongodb`
- Create a MongoDB Atlas cluster or use a local MongoDB instance.
- Create a `db.js` file to handle MongoDB connection using `MongoClient`.
- Export the connected `db` object or helper functions to interact with the `todos` collection.

#### 2. Replace In-Memory Logic with MongoDB Queries

In your controller functions:

- Replace `todos.push(...)` with `db.collection("todos").insertOne(...)`
- Replace `Array.find(...)` with `db.collection("todos").findOne({ _id: ObjectId(id) })`
- Replace `Array.filter(...)` with `db.collection("todos").deleteOne({ _id: ObjectId(id) })`
- Use `updateOne()` to update a task
- Use `find().toArray()` to list all tasks

Make sure to:

- Import `ObjectId` from `mongodb` where needed
- Use async/await to handle database operations
- Handle errors gracefully (e.g., try/catch blocks)

#### 3. Update Controllers

- Your controller functions will now call database methods instead of array operations.
- Keep your view rendering logic the same.

#### 4. No Changes to Views Required

Since your EJS views are already based on the `todos` data structure, no changes are needed. Just ensure that `_id` is used properly in URLs and forms instead of the old `id` field.

---

Good luck and have fun coding! 🚀
