const chai      = require('chai');
const expect    = chai.expect;
const appRoot   = require('app-root-path');
const search    =  require(appRoot + '/domain/search');

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

        done();
	});


	it('passing test', () => {
        var mySearch = new search(1, 10);
        console.log('moez test');
        return mySearch.then(
            pets => {
				expect(1).to.equal(2);
                console.log(pets);
            }
        );

	});

	it('failing test', () => {
        return promaker(1).then(data =>
            {
                console.log("moez fulfilled");
				expect(1).to.equal(2);
            });
	});

});
