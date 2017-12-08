const appRoot   = require('app-root-path');
const mongoose = require('mongoose');
const mammal    = require(appRoot + '/domain/models/pet/mammal');
const reptile    = require(appRoot + '/domain/models/pet/reptile');
const basePet = require(appRoot + '/domain/models/pet/basePet');

//var basePet = mongoose.model("Pet", petSchema);

var pet = {};

var nameDictionary = {};
nameDictionary[basePet.modelName] = basePet;
Object.assign(nameDictionary, mammal.nameDictionary);
Object.assign(nameDictionary, reptile.nameDictionary);
pet.nameDictionary = nameDictionary;

pet.mammal  = mammal;
pet.reptile = reptile;
pet.basePet = basePet;

var storePet = function(modelName, params, callback) {
    //callback(error, instance)
    var model = nameDictionary[modelName];
    if(model == undefined)
        callback('not recognized pet name', null);
    model.create(params, callback);
};
pet.storePet = storePet;

module.exports = pet;
