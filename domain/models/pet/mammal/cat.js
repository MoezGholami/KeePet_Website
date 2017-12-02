const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var catSchema = new mongoose.Schema({
    breedName : String
}, Pet.schema.options);

var Cat = Pet.discriminator("Cat", catSchema);

module.exports = Cat;
