var mongoose = require('mongoose');
var schema = mongoose.schema;

var options = {discriminatorKey: 'type'};
var petSchema = new mongoose.Schema({
    name: String,
    age_month: Number,
    sex: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options);
var Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
