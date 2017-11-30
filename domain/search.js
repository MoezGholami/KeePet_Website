const appRoot = require('app-root-path');
var Pet = require(appRoot + "/domain/models/pet");

const searchPets = function(minAgeMonth, maxAgeMonth) {
    var minBirthDate = new Date();
    var maxBirthDate = new Date();
    var margin = 15;
    minBirthDate.setDate(minBirthDate.getDate() - 30*maxAgeMonth - margin);
    maxBirthDate.setDate(maxBirthDate.getDate() - 30*minAgeMonth + margin);
                console.log("moez before returning promise");
    return new Promise((resolve, reject) =>
        {
                console.log("moez before find operation");
            Pet.find({birthDate: {$lt: maxBirthDate, $gt: minBirthDate}}, (error, pets) => {
                //TODO: find never ends
                console.log("moez after find operation");
                if(error)
                    reject(error);
                else
                    resolve(pets);
            });
        }
    );
};

function promaker(arg) {
      return new Promise((resolve, reject) => {
          if(arg==0)
              reject("not zero");
          else
              resolve(arg*2);
            });
}

module.exports = searchPets;
