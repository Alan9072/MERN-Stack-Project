import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Task from "./Models/task.js";


dotenv.config();
const port = 5000;

const app = express();

app.use(
  cors(
  //   {
  //   origin:"https://react-project-frontend-mu.vercel.app", // Replace with your domains
  //   methods: "GET,POST,PUT,DELETE", // Allowed methods
  //   credentials: true, // Allow cookies to be sent with requests
  //    // Some legacy browsers choke on 204
  // }
)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests for all routes
app.options('*', cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
// app.get("/",(req,res)=>{
//   res.json("Hii");
// })


app.post("/tasks", async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new Task({ task });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
