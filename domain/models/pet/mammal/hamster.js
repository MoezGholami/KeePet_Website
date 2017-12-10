const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var hamsterSchema = new mongoose.Schema({
    breedName : String
}, Pet.schema.options);

var Hamster = Pet.discriminator("Hamster", hamsterSchema);

module.exports = Hamster;
