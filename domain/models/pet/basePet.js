var mongoose = require('mongoose');
var schema = mongoose.schema;

var options = {discriminatorKey: 'type'};
var petSchema = new mongoose.Schema({
    name: String,
    age_month: Number,
    sex: String,
    description: String,
    photo: Buffer,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options);

petSchema.methods.getPhotoUrl = function() {
    if(this.photo)
        return '/owner/pet_photo/' + this._id;
    else
        return '/images/default_animal_avatar.png';
};

var Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
