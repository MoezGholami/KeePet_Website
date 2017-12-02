var mongoose = require("mongoose");

var JobPostSchema = new mongoose.Schema({
    start_date: Date,
    end_date:   Date,
    description: String,
    addOns:     [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
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
