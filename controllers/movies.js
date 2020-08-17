const fs = require('fs');
const path = require('path');
const { validationResult, Result } = require('express-validator');
const readFile = require('../helpers/file_helper');

let db;

fs.readFile(path.resolve(__dirname, "../data/db.json"), 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        db = JSON.parse(jsonString)
} catch(err) {
        console.log('Error parsing JSON string:', err)
    }
});

exports.getMovie = (req, res, next) => {
    const { id } = req.params;
    const foundMovie = db.movies.filter(movie => movie.id == id);;
    res.send(foundMovie);
};

exports.getMovies = (req, res, next) => {

    if(Object.keys(req.query).length !== 0){

        let response = db.movies;
        let genresFromQuery = [];
        let duration;
        for (const key in req.query) {

            if(key === 'genre'){
                // one parameter - string, two and more - array -> push it to genresFromQuery
                Array.isArray(req.query[key]) ? genresFromQuery = req.query[key] : genresFromQuery.push(req.query[key]);

                if(genresFromQuery.every(g => db.genres.includes(g))){

                    response = db.movies.filter(m => m.genres.every(g => genresFromQuery.includes(g)));
                }

                else
                    return res.send(`Wrong 'genre' parameters. Choose parameters from list: ${db.genres}.`);
            }

            if(key === 'duration'){
                duration = Number(req.query[key]);
                response = response.filter(m => (duration - 10 <= m.runtime && m.runtime <= duration +10));
            }

            return res.send(response);
        }
    }

    else{
        let rand = Math.floor(Math.random() * db.movies.length) + 1;
        return res.send(db.movies.filter(m => m.id === rand));
    }
};

exports.createMovie = (req, res, next) => {
    const movie = JSON.parse(JSON.stringify(req.body));
    const errors = validationResult(req);

    // check errors
    if(!errors.isEmpty()){
        //console.log(errors.array()[0]);
        return res.send(errors);
    }

    db.movies.push({ id: db.movies.length + 1, ...movie });

    fs.writeFile(path.resolve(__dirname, "../data/db.json"), JSON.stringify(db), 'utf8', (err) => {
        if (err) throw err;
    });

    res.send(`Movie withe the title ${movie.title} added to the database!`);
};

exports.deleteMovie = (req, res, next) => {
    const { id } = req.params;
    movies = db.movies.filter((movie) => movie.id !== id);
    res.send(`Movie with the title ${title} deleted from the database`);
};

exports.updateMovie = (req, res, next) => {
    // from querystring
    const { id } = req.params;
    // from Postman
    const { title, year, runtime } = req.body;

    const movie = movies.find((movie) => movie.id === id);

    if(title) movie.title = title;
    if(year) movie.year = year;
    if(runtime) movie.runtime = runtime;

    res.send(`Movie with id:${id} has been updated`);
}


