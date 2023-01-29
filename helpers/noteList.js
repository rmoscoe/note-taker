const fs = require("fs");

function noteList() {
    let notes = [];
    fs.readFile("../db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return "Error";
        } else {
            if (data) {
                notes = JSON.parse(data);
            }
            return notes;
        }
    });
}

module.exports = noteList;