require('dotenv').config()
const chai      = require('chai');
const expect    = chai.expect;
const appRoot   = require('app-root-path');
const mongoose  = require('mongoose');
const seeder    = require('mongoose-seed');
const petData   = require(appRoot + '/test/data/petSeedData');
const Pet       = require(appRoot + '/domain/models/pet');
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
                    appRoot + '/domain/models/pet/mammal/dog.js'
                ]);

                seeder.clearModels(['Dog'], function() {
                    seeder.populateModels(petData, function() {
                        done();
                    });

                });
            });
	});


	it('find test', () => {
	});

	xit('failing test', () => {
        return promaker(1).then(data =>
            {
				expect(1).to.equal(2);
            });
	});

});
