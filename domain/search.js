const appRoot = require('app-root-path');
var Pet = require(appRoot + "/domain/models/pet");

const searchPets = function(minAgeMonth, maxAgeMonth, now) {
    now = now || new Date();
    var minBirthDate = new Date(now.valueOf());
    var maxBirthDate = new Date(now.valueOf());
    var margin = 15;
    minBirthDate.setDate(minBirthDate.getDate() - 30*maxAgeMonth - margin);
    maxBirthDate.setDate(maxBirthDate.getDate() - 30*minAgeMonth + margin);
    return new Promise((resolve, reject) =>
        {
            Pet.find({}, (error, pets) => {
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
