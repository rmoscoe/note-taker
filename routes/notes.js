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
notes.post("/", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: noteid()
        };

        let notesArr = [];
        const currentNotes = noteList()
            .then((response) => {
                if (response === "Error") {
                    res.status(502).json('Error in saving note');
                } else {
                    notesArr = response;
                    notesArr.push(newNote);
                    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArr), (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json("Error in saving note.");
                        } else {
                            res.status(201).json("Note added successfully.");
                        }
                    });
                }
            });
    }
});

// DELETE route using ID parameter in path
notes.delete("/:id", (req, res) => {
    const id = req.params.id;
    let notesArr = [];
    const currentNotes = noteList()
        .then((response) => {
            if (response === "Error") {
                res.status(502).json("Error retrieving notes");
            } else {
                notesArr = response;
                let idx;
                for (let i = 0; i < notesArr.length; i++) {
                    if (notesArr[i].id === id) {
                        idx = i;
                        break;
                    }
                }
                notesArr.splice(idx, 1);
                fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesArr), (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json("Error in deleting note.");
                    } else {
                        res.status(200).json("Note deleted successfully.");
                    }
                });
            }
        })
});

module.exports = notes;