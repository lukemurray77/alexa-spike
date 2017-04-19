const AlexaSkill = require('./AlexaSkill');
const APP_ID = 'arn:aws:lambda:us-east-1:317727103076:function:guessTheLyric';

'use strict';

var GuessTheLyric = function () {
    AlexaSkill.call(this, APP_ID);
};

GuessTheLyric.prototype = Object.create(AlexaSkill.prototype);
GuessTheLyric.prototype.constructor = GuessTheLyric;

GuessTheLyric.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("GuessTheLyric onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session init logic would go here
};

GuessTheLyric.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("GuessTheLyric onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getWelcomeResponse(response);
};

GuessTheLyric.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("GuessTheLyric onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // any session cleanup logic would go here
};


GuessTheLyric.prototype.intentHandlers = {
    "MakeGuess": function (intent, session, response) {
        MakeGuess(intent, session, response);
    },
    "PlayGame": function (intent, session, response) {
        PlayGame(intent, session, response);
    }
};

function PlayGame (intent, session, response) {
    // let lyric = findLyric(lyricsArray);
    let lyric = "fuck all you hoes";
    let speechOutput = "Guess this lyric:" + lyric
    speechOutput = {
                speech: speechText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
    response.ask(speechOutput);
}

function MakeGuess(intent, session, response) {
    let guess = intent.slots.Artist;
    if (guess === "biggie") {
                response.tell("yes");
    }
    else (response.tell('no'));
}

function findLyric (arr) {
    // returns random lyric
}

exports.handler = function (event, context) {
    var guessTheLyric = new GuessTheLyric();
    guessTheLyric.execute(event, context);
};
