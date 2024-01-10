import Task from "../../models/Task";
import dbConnection from "../../utils/db";

export const getAllTasks = async (req, res) => {
  await dbConnection();
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postTask = async (req, res) => {
  await dbConnection();
  let { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putTask = async (req, res) => {
  await dbConnection();
  let id = req.params.id;
  let newBody = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, newBody);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  await dbConnection();
  let id = req.params.id;

  try {
    const taskDeleted = await Task.findOneAndDelete({ _id: id });
    res.status(201).json(taskDeleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllTasks = async (req, res) => {
  await dbConnection();
  try {
    const taskDeleted = await Task.deleteMany();
    res.status(201).json(taskDeleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const patchTask = async (req, res) => {
  await dbConnection();
  const { id } = req.params;
  const { completed } = req.body;
  try {
    let updates = {};
    if (completed) {
      updates.completedAt = new Date();
    } else {
      updates.completedAt = null;
    }
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
