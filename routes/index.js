const app = require("express").Router();
const notesRouter = require("./notes");
const path = require("path");

app.use("/notes", notesRouter);

// 404 Route

module.exports = app;