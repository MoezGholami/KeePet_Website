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

JobPost.schema.statics.store = function(user_id, params) {
    return new Promise((resolve, reject) => {
        var addOns = [];
        for(var k in params.addOns)
            if(params.addOns[k])
                addOns.push(k);
        var saving = new JobPost({
            owner : user_id,
            pets : params.PetIDs,
            start_date : params.start_date,
            end_date : params.end_date,
            description : prams.description,
            addOns: addOns
        });
        saving.save((error) => {
            if(error)
                reject(error);
            else
                resolve(saving);
        });
    });
};

module.exports = JobPost;
