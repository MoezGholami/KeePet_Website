const snake = require('./snake');
const frog = require('./frog');
const lizard = require('./lizard');
const turtle = require('./turtle');
var reptile = {};

reptile.snake = snake;
reptile.frog = frog;
reptile.lizard = lizard;
reptile.turtle = turtle;

module.exports = reptile;
