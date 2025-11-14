import {createNote, getAllNotes, updateNote, deleteNote, getDeletedNotes} from "../controller/noteController.js";

import { Router } from "express";
const Notes = Router();

Notes.get("/", (req, res) => {
    res.send("Hello World");
});
Notes.post("/create-note", createNote);
Notes.get("/get-all-notes", getAllNotes);
Notes.patch("/update-note", updateNote);
Notes.delete("/delete-note", deleteNote);
Notes.get("/get-deleted-notes", getDeletedNotes);

export default Notes;