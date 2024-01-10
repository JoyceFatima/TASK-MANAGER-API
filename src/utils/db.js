import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/todo";

const dbConnection = async () => {
  if (!global.mongoose) {
    mongoose.set("strictQuery", false);

    global.mongoose = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export default dbConnection;
