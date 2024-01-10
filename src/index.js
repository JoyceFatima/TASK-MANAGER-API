import express from "express";
import taskRoutes from "./routes/tasks";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
