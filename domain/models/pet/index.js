const appRoot   = require('app-root-path');
const mongoose = require('mongoose');
const mammal    = require(appRoot + '/domain/models/pet/mammal');
const reptile    = require(appRoot + '/domain/models/pet/reptile');
const basePet = require(appRoot + '/domain/models/pet/basePet');

//var basePet = mongoose.model("Pet", petSchema);

var pet = {};

pet.mammal  = mammal;
pet.reptile = reptile;
pet.basePet = basePet;
//pet.basePet = basePet;

module.exports = pet;
