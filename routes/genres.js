const express = require('express');
const genreController = require ('../controllers/genres.js');

const router = express.Router();

router.get('/:id', genreController.getGenre);

router.get('/', genreController.getGenres);

router.post('/', genreController.createGenre);

router.delete('/:id', genreController.deleteGenre);

router.patch('/:id', genreController.updateGenre);

module.exports = router;