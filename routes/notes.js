const notes = require("express").Router();
const fs = require("fs");
const app = require(".");
const generateId = require("../helpers/noteid");
const noteid = require("../helpers/noteid");
const noteList = require("../helpers.noteList");
const noteList = require("../helpers/noteList");

// GET route
app.get("/", (req, res) => {
    fs.readFile("../db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(502).json("Error reading notes.");
        } else {
            return res.status(200).json(JSON.parse(data));
        }
    });
});

// POST route with .title and .text properties
app.post("/", async (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: noteid.generateId()
        };

        let noteList = await noteList.noteList();

        if (noteList === "Error") {
            res.status(502).json('Error in saving note');
        } else {
            noteList.append(newNote);
            fs.writeFile("../db/db.json", JSON.stringify(noteList), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("Error in saving note.");
                } else {
                    res.status(201).json("Note added successfully.");
                }
            });
        }
    }
});

// DELETE route using ID parameter in path
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    let noteList = await noteList.noteList();

    if (noteList === "Error") {
        res.status(502).json("Error retrieving notes");
    } else {
        let idx;
        for (let i = 0; i < noteList.length; i++) {
            if (noteList[i].id === id) {
                idx = i;
                break;
            }
        }
        fs.writeFile("../db/db.json", JSON.stringify(noteList.splice(idx, 1)), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json("Error in deleting note.");
            } else {
                res.status(200).json("Note deleted successfully.");
            }
        });
    }
});

module.exports = notes;