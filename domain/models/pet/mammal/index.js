const dog = require('./dog');
const cat = require('./cat');
var mammal = {};

mammal.dog = dog;
mammal.cat = cat;

module.exports = mammal;
