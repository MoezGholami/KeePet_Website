const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var dogSchema = new mongoose.Schema({
    breedName : String
}, Pet.schema.options);

var Dog = Pet.discriminator("Dog", dogSchema);

module.exports = Dog;
