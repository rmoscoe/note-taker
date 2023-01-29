const fs = require("fs");
const path = require("path");

function noteList() {
    return new Promise((resolve, reject) => {
        let notes = [];
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                if (data) {
                    notes = JSON.parse(data);
                }
                resolve(notes);
            }
        });
        // resolve(notes);
        // reject(err);
    });
}

module.exports = noteList;