const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000; // 80 for heroku
const api = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// 404 route

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));