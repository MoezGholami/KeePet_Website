var mongoose = require('mongoose');
var schema = mongoose.schema;

var options = {discriminatorKey: 'type'};
var petSchema = new mongoose.Schema({
    birthDate: Date,
    sex: String,
    description: String,
}, options);
var Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
