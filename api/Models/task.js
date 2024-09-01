import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,    // Field for storing text data
        required: true   // Make this field mandatory
    }
});

const todo = mongoose.model('Task', taskSchema);

export default todo;

