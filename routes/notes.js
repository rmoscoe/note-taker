const notes = require("express").Router();
const fs = require("fs");
const app = require(".");
const noteid = require("../helpers/noteid");

// GET route
app.get("/", (req, res) => {
    fs.readFile("../db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(JSON.parse(data));
        }
    });
});

// POST route with .title and .text properties
app.post("/", (req, res) => {
    
})

// DELETE route using ID parameter in path

module.exports = notes;