require('dotenv').config()
const chai      = require('chai');
const expect    = chai.expect;
const appRoot   = require('app-root-path');
const mongoose  = require('mongoose');
const Pet       = require(appRoot + '/domain/models/pet');
const mongoUrl = 'mongodb://'+process.env.DB_HOST+':'+
    process.env.DB_PORT+'/'+process.env.DB_NAME;

describe('verfies searching pets.', function(){

	it('get schema', () => {
        Pet.getPetSchema('Cat', (error, fields) => {
            console.log(fields);
        });
	});

});
