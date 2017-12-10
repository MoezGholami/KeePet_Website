const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var lizardSchema = new mongoose.Schema({
    breedName : String,
    length : Number
}, Pet.schema.options);

var Lizard = Pet.discriminator("Lizard", lizardSchema);

module.exports = Lizard;
