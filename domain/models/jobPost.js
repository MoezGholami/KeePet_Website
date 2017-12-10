var mongoose = require("mongoose");
const appRoot   = require('app-root-path');
const Pet       = require(appRoot + '/domain/models/pet');

var JobPostSchema = new mongoose.Schema({
    start_date: Date,
    end_date:   Date,
    description: String,
    addOns:     [String],
    latitude: Number,
    longitude: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: Pet.modelName }]
});
var JobPost = mongoose.model("JobPost", JobPostSchema);

JobPost.store = function(user_id, params, callback) {
    var addOns = [];
    if(! (params.addons instanceof Array))
        params.addons = [params.addons];
    for(var i=0; i<params.addons.length; i++)
        addOns.push(params.addons[i]);
    var saving = new JobPost({
        owner : user_id,
        pets : params.PetIDs,
        start_date : params.start_date,
        end_date : params.end_date,
        latitude: params.latitude,
        longitude: params.longitude,
        description : params.description,
        addOns: addOns
    });
    saving.save(function (error) {
        if(error)
            callback(error, null);
        else
            callback(null, saving);
    });
};

module.exports = JobPost;
