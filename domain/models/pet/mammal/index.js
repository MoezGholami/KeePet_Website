const dog = require('./dog');
const cat = require('./cat');
const rabbit = require('./rabbit');
const hamster = require('./hamster');
const guinea_pig = require('./guinea_pig');
var mammal = {};

var nameDictionary = {};
nameDictionary[dog.modelName] = dog;
nameDictionary[cat.modelName] = cat;
mammal.nameDictionary = nameDictionary;

mammal.dog = dog;
mammal.cat = cat;
mammal.hamster = hamster;
mammal.rabbit = rabbit;
mammal.guinea_pig = guinea_pig;

module.exports = mammal;
