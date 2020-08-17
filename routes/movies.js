const fs = require('fs');
const path = require('path');
const express = require('express');
const movieController = require ('../controllers/movies.js');
const { check } = require('express-validator');

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


const router = express.Router();

router.get('/:id', movieController.getMovie);

router.get('/', movieController.getMovies);

router.post('/', [check('genres', 'Choose proper genres')
                    .custom((value, { req }) => {
                        if (Array.isArray(value) && value.every(g => db.genres.includes(g))) {
                            throw new Error('')
                        }
                        return true;
                    }),
                  check('title', 'Title field is required. Title field must be string. Maximum field size is 255 characters.')
                    .isEmpty()
                    .isString()
                    .isLength({ max: 255 }),
                  check('year', 'Year field is required. Year field must be numeric.')
                    .isEmpty()
                    .isNumeric(),
                  check('runtime', 'Runtime field is required. Runtime field must be numeric.')
                    .isEmpty()
                    .isNumeric(),
                  check('director', 'Director field is required. Director field must be string. Maximum field size is 255 characters.')
                    .isEmpty()
                    .isString()
                    .isLength({ max: 255 }),
                  check('actors', 'Actors field must be string.')
                    .isString(),
                  check('plot', 'Plot field must be string.')
                    .isString(),
                  check('actors', 'Actors field must be string.')
                    .isString(),
                  check('posteUrl', 'PosteUrl field must be string.')
                    .isString()
                 ]
                    , movieController.createMovie);

router.delete('/:id', movieController.deleteMovie);

router.patch('/:id', movieController.updateMovie);

module.exports = router;