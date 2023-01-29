const fs = require("fs");

function noteList () {
    let notes = [];
        fs.readFile("../db/db.json", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                return "Error";
            } else {
                if (data) {
                    notes = data;
                }
                return notes;
            }
        });
}

module.exports = noteList;