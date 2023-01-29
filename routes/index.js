const app = require("express").Router();
const notesRouter = require("./notes");

app.use("/notes", notesRouter);

// 404 route

module.exports = app;