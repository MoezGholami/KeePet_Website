const snake = require('./snake');
var reptile = {};

var nameDictionary = {};
nameDictionary[snake.modelName] = snake;
reptile.nameDictionary = nameDictionary;

reptile.snake = snake;
module.exports = reptile;
