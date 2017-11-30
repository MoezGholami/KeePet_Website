require('dotenv').config()
const chai      = require('chai');
const expect    = chai.expect;
const appRoot   = require('app-root-path');
const search    = require(appRoot + '/domain/search');
const mongoose  = require('mongoose');
const seeder    = require('mongoose-seed');
const petData   = require(appRoot + '/test/data/petSeedData');
const mongoUrl = 'mongodb://'+process.env.DB_HOST+':'+
    process.env.DB_PORT+'/'+process.env.DB_NAME;

function promaker(arg) {
      return new Promise((resolve, reject) => {
          if(arg==0)
              reject("not zero");
          else
              resolve(arg*2);
            });
}

describe('verfies searching pets.', function(){
	before(function(done){
        seeder.connect(mongoUrl, (error) =>
            {
                if(error)
                    done(error);
                seeder.loadModels([
                    appRoot + '/domain/models/pet.js'
                ]);

                seeder.clearModels(['Pet'], function() {
                    seeder.populateModels(petData, function() {
                        done();
                    });

                });
            });
	});


	it('find test', () => {
        var mySearch = new search(1, 10, '2000-06-01T00:00:00');
        return mySearch.then(
            pets => {
                console.error(pets);
				expect(pets.length).to.be.at.least(1);
            }
        );

	});

	xit('failing test', () => {
        return promaker(1).then(data =>
            {
				expect(1).to.equal(2);
            });
	});

});
