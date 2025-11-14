import e from "express";
import Note from "../model/notemodel.js"

const createNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ isDeleted: false })
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

const updateNote = async (req, res) => {
    try {
        const { _id, title, content } = req.body;


        const updatedNote = await Note.findOneAndUpdate(
            { _id: _id },
            { $set: { title: title, content: content }, $inc: { updatedCount: 1 } },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//soft delete the note
const deleteNote = async (req, res) => {
    try {
        const { _id } = req.body;
        const result = await Note.updateOne({ _id: _id }, { $set: { isDeleted: true } })
        if (!result) {
            res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDeletedNotes = async (req, res) => {
    try {
        const notes = await Note.find({ isDeleted: true })
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

export { createNote, getAllNotes, updateNote, deleteNote, getDeletedNotes };

