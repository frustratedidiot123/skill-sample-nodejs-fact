'use strict';
var Alexa = require('alexa-sdk');

var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 8080;
var app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
var alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: true,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: false
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "Fake fun facts";
var GET_FACT_MESSAGE = "Did you know: ";
var HELP_MESSAGE = "You can say give me a fun fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Jeremiah was a turtle, not a bullfrog.", // He was a good friend to many, but not me.",
    "There are 97 known varieties of grapefruit. They all taste the same.",
    "The second happiest animal on earth is the zebra. The first is the lion.",
    "Widget was considered an offensive word until 1858. Doodad was similarly outlawed by several local US statutes until 1911.",
    "There is no spoon. There are only sporks.",
    "3 out of every 5 superstitions tested are backed as true by scientific evidence. In the case of the remaining 2, the scientists in question stepped on cracks, suffered broken vertebrae, and were unable to complete their research. ",
    "93 percent of all statistics are made up on the spot. The other 7 percent are not statistically significant.",
    "Goldfish can live up to 300 years if cared for properly. Their memories, however, only last about 7 seconds.",
    "The Sun is an almost perfect rectangle. Diffraction in Earth's atmosphere makes it look spherical.",
    "The U.S. military once spent 2.2 billion dollars designing a submarine for giraffes.",
    "Giraffes are excellent underwater swimmers.",
    "The temperature at the very center of the Sun can precipitously drop to reach negative 15 degrees Celsius.",
    "There are tribes in ancient russia that regularly rode wild boars into battle. ",
    "Attack rabbits are real. Beware."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
