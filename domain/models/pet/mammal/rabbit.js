const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var rabbitSchema = new mongoose.Schema({
    breedName : String
}, Pet.schema.options);

var Rabbit = Pet.discriminator("Rabbit", rabbitSchema);

module.exports = Rabbit;