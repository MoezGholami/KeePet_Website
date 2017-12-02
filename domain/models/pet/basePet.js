var mongoose = require('mongoose');
var schema = mongoose.schema;

var options = {discriminatorKey: 'type'};
var petSchema = new mongoose.Schema({
    birthDate: Date,
    sex: String,
    description: String,
    quantity: { type: Number, default: 1 }
}, options);
var Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
