const dog = require('./dog');
const cat = require('./cat');
var mammal = {};

var nameDictionary = {};
nameDictionary[dog.modelName] = dog;
nameDictionary[cat.modelName] = cat;
mammal.nameDictionary = nameDictionary;

mammal.dog = dog;
mammal.cat = cat;

module.exports = mammal;
