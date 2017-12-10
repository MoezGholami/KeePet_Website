const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const Pet = require(appRoot + '/domain/models/pet/basePet');

var GuineaPigSchema = new mongoose.Schema({
    hair : String
}, Pet.schema.options);

var GuineaPig = Pet.discriminator("GuineaPig", GuineaPigSchema);

module.exports = GuineaPig;
