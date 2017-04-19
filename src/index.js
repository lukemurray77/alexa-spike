const AlexaSkill = require('./AlexaSkill');
// const APP_ID = 'amzn1.echo-sdk-ams.app.[86ad5fee-83fe-45fc-8e28-a421049b0185]';
const APP_ID = 'amzn1.ask.skill.86ad5fee-83fe-45fc-8e28-a421049b0185';
// var APP_ID = 'amzn1.ask.skill.76ee6116-a28c-4fba-b21e-a49eacd9c946'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.
// amzn1.echo-sdk-ams.app.[your-unique-value-here]
'use strict';

var GuessTheLyric = function () {
    AlexaSkill.call(this, APP_ID);
};

GuessTheLyric.prototype = Object.create(AlexaSkill.prototype);
GuessTheLyric.prototype.constructor = GuessTheLyric;

GuessTheLyric.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log('GuessTheLyric onSessionStarted requestId: ' + sessionStartedRequest.requestId
        + ', sessionId: ' + session.sessionId);

    // any session init logic would go here
};

GuessTheLyric.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log('GuessTheLyric onLaunch requestId: ' + launchRequest.requestId + ', sessionId: ' + session.sessionId);
    
};

GuessTheLyric.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log('GuessTheLyric onSessionEnded requestId: ' + sessionEndedRequest.requestId
        + ', sessionId: ' + session.sessionId);

    // any session cleanup logic would go here
};


GuessTheLyric.prototype.intentHandlers = {
    'MakeGuess': function (intent, session, response) {
        MakeGuess(intent, session, response);
    },
    'PlayGame': function (intent, session, response) {
        PlayGame(intent, session, response);
    }
};

function PlayGame (intent, session, response) {
    // let lyric = findLyric(lyricsArray);
    // var lyric = "fuck all you hoes";
    var speechText = 'Guess this lyric fuck all you hoes';
    var repromptText = '<speak>Speak...</speak>';
    var speechOutput = {
                speech: speechText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
    var repromptOutput = {
                speech: repromptText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
    response.ask(speechOutput, repromptOutput);
    return;
}

function MakeGuess (intent, session, response) {
    var guess = getPlayerAnswer(intent.slots.Artist.value);

    if (guess === 'biggie') {
                response.tell('yes');
    }
    else (response.tell('no'));
}

// function findLyric (arr) {
//     // returns random lyric
// }

exports.handler = function (event, context) {
    var guessTheLyric = new GuessTheLyric();
    guessTheLyric.execute(event, context);
};
function getPlayerAnswer (recognizedPlayerAnswer) {
            if (!recognizedPlayerAnswer) {
                return undefined;
            }
            var split = recognizedPlayerAnswer.indexOf(' '), newAnswer;

            if (split < 0) {
                newAnswer = recognizedPlayerAnswer;
            } else {
                //the Answer should only contain a first Answer, so ignore the second part if any
                newAnswer = recognizedPlayerAnswer.substring(0, split);
            }
            return newAnswer;
        }