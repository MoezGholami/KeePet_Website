const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var snakeSchema = new mongoose.Schema({
    breedName : String,
    length : Number
}, Pet.schema.options);

var Snake = Pet.discriminator("Snake", snakeSchema);

module.exports = Snake;
