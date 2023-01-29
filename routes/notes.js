const notes = require("express").Router();
const fs = require("fs");
const noteid = require("../helpers/noteid");
const noteList = require("../helpers/notelist");
const path = require("path");

// GET route
notes.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(502).json("Error reading notes.");
        } else {
            res.status(200).json(JSON.parse(data));
        }
    });
});

// POST route with .title and .text properties
notes.post("/", async (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: noteid.generateId()
        };

        let notesArr = await noteList.noteList();

        if (notesArr === "Error") {
            res.status(502).json('Error in saving note');
        } else {
            notesArr.append(newNote);
            fs.writeFile("../db/db.json", JSON.stringify(notesArr), (err) => {
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
notes.delete("/:id", async (req, res) => {
    const id = req.params.id;
    let notesArr = await noteList.noteList();

    if (notesArr === "Error") {
        res.status(502).json("Error retrieving notes");
    } else {
        let idx;
        for (let i = 0; i < notesArr.length; i++) {
            if (notesArr[i].id === id) {
                idx = i;
                break;
            }
        }
        fs.writeFile("../db/db.json", JSON.stringify(notesArr.splice(idx, 1)), (err) => {
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