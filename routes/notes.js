const notes = require("express").Router();
const fs = require("fs");
const app = require(".");
const generateId = require("../helpers/noteid");
const noteid = require("../helpers/noteid");

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
app.post("/", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: generateId()
        };

        let noteList = [];
        fs.readFile("../db/db.json", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                res.status(502).json("Error in saving note");
            } else {
                if (data) {
                    noteList = data;
                }
            }
        });

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
});

// DELETE route using ID parameter in path

module.exports = notes;