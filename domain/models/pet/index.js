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

var getPetSchema = function(modelName, callback) {
    var model = nameDictionary[modelName];
    if(model == undefined)
        callback('not recognized pet name', null);
    var result=[]
    for(var k in model.schema.paths)
        if(k!='__v' && k!='_id' && k!='owner' && k!='type')
            result.push({name: k, type: model.schema.paths[k].instance});
    result.push({name: 'photo_url', type: 'String'});
    callback(null, result);
};

pet.storePet = storePet;
pet.getPetSchema = getPetSchema;

module.exports = pet;
