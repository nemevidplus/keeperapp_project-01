import mongoose from "mongoose";

// Create Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

// Create Model
const Note = mongoose.model("Note", noteSchema);

export default Note;