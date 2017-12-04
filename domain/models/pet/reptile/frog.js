const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var frogSchema = new mongoose.Schema({
    breedName : String
}, Pet.schema.options);

var Frog = Pet.discriminator("Frog", frogSchema);

module.exports = Frog;
