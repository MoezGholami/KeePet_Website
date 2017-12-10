const snake = require('./snake');
const turtle = require('./turtle');
var reptile = {};

var nameDictionary = {};
nameDictionary[snake.modelName] = snake;
nameDictionary[turtle.modelName] = turtle;
reptile.nameDictionary = nameDictionary;
reptile.snake = snake;
reptile.turtle = turtle;

reptile.snake = snake;
module.exports = reptile;
