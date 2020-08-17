const express = require('express');
const moviesRoutes = require('./routes/movies.js');
const genresRoutes = require('./routes/genres.js');
const bodyParser = ('body-parser');

const port = process.env.port || 5000;

const app = express();

app.use(express.json());
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);

const PORT = process.env.port || 5000;


app.listen(PORT, err => {
    if (err) {
        return console.log("ERROR", err);``
    }
    console.log(`Listening on port ${PORT}`);
});