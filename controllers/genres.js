const { v4 } = require('uuid');
const fs = require('fs');
const path = require("path");

const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/db.json")));

exports.getGenre = (req, res, next) => {
    const { id } = req.params;
    const foundGenre = Genres.find((Genre) => Genre.id === id);
    res.send(foundGenre);
};

exports.getGenres = (req, res, next) => {
    res.send(Genres);
};

exports.createGenre = (req, res, next) => {
    const Genre = req.body;
    Genres.push({ ...Genre, id: uuidv4() });
    res.send(`Genre withe the name ${Genres.firstName} added to the database!`);
};

exports.deleteGenre = (req, res, next) => {
    const { id } = req.params;
    Genres = Genres.filter((Genre) => Genre.id !== id);
    res.send(`Genre with the id ${id} deleted from the database`);
};

exports.updateGenre = (req, res, next) => {
    // from querystring
    const { id } = req.params;
    // from Postman
    const { firstName, lastName, age } = req.body;

    const Genre = Genres.find((Genre) => Genre.id === id);

    if(firstName) Genre.firstName = firstName;
    if(lastName) Genre.lastName = lastName;
    if(age) Genre.age = age;

    res.send(`Genre with id:${id} has been updated`);
}
