import express from "express";
import Note from "../models/noteModel.js";

// router can group related routes and middlewares (callback functions)
const router = express.Router();

// Route for Get all notes from database
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find({});

        return res.status(200).json({
            count: notes.length, // just to ease checking the number of notes in DB
            data: notes
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to Get a note from database by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params; // destructuring id

        const note = await Note.findById(id);

        return res.status(200).json(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to Add a new note to database
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).send({
                message: "Send all required fields: title, content"
            });
        }

        const newNote = {
            title: req.body.title,
            content: req.body.content
        };

        const note = await Note.create(newNote);

        return res.status(201).send(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to Edit a note
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByIdAndUpdate(id, req.body);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.status(200).json({ message: "Note updated successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to Delete a note
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findByIdAndRemove(id, req.body);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;