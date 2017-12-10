const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var turtleSchema = new mongoose.Schema({
    breedName : String
}, Pet.schema.options);

var Turtle = Pet.discriminator("Turtle", turtleSchema);

module.exports = Turtle;
