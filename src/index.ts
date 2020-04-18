const OKCupid = require('okcupidjs');
const dotenv = require("dotenv");
const fs = require('fs');
const Promise = require('bluebird');

const okc = Promise.promisifyAll(new OKCupid());

if(fs.existsSync('../.env')) {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.test' });
}

const {okc_username, okc_password} = process.env;

okc.loginAsync(okc_username, okc_password, function(err, res, body) {
  if (err) {
    console.log("Failed to login.");
  } else {
    console.log("Login succed.")
  }
}) 

const query = {
  "i_want": "women",
  "minimum_age": 20,
  "maximum_age": 30,
  "cats": ["has"], 
  "personality_filters": {
    "adventuresome" : "more",
    "artsiness" : "less"
  },
  "drugs": ["never"]
};

okc.search(query, function(err, res, body) {
  if (err) {
    console.log("Failed to get search results.");
  } 
  else {
    // use the body object to extract the search results
    var results = body.data;

    console.log('Users:\n')
    results.forEach(function(user) {
      console.log(user.username + '\n');
    });
  }
});