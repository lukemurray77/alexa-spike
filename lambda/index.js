// const AlexaSkill = require('./AlexaSkill');
// // const APP_ID = 'amzn1.echo-sdk-ams.app.[86ad5fee-83fe-45fc-8e28-a421049b0185]';
// const APP_ID = 'amzn1.ask.skill.86ad5fee-83fe-45fc-8e28-a421049b0185';
// // var APP_ID = 'amzn1.ask.skill.76ee6116-a28c-4fba-b21e-a49eacd9c946'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.
// // amzn1.echo-sdk-ams.app.[your-unique-value-here]
// 'use strict';

// var GuessTheLyric = function () {
//     AlexaSkill.call(this, APP_ID);
// };

// GuessTheLyric.prototype = Object.create(AlexaSkill.prototype);
// GuessTheLyric.prototype.constructor = GuessTheLyric;

// GuessTheLyric.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
//     console.log('GuessTheLyric onSessionStarted requestId: ' + sessionStartedRequest.requestId
//         + ', sessionId: ' + session.sessionId);

//     // any session init logic would go here
// };

// GuessTheLyric.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
//     console.log('GuessTheLyric onLaunch requestId: ' + launchRequest.requestId + ', sessionId: ' + session.sessionId);

// };

// GuessTheLyric.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
//     console.log('GuessTheLyric onSessionEnded requestId: ' + sessionEndedRequest.requestId
//         + ', sessionId: ' + session.sessionId);

//     // any session cleanup logic would go here
// };


// GuessTheLyric.prototype.intentHandlers = {
//     'MakeGuess': function (intent, session, response) {
//         MakeGuess(intent, session, response);
//     },
//     'PlayGame': function (intent, session, response) {
//         PlayGame(intent, session, response);
//     }
// };

// function PlayGame (intent, session, response) {
//     // let lyric = findLyric(lyricsArray);
//     // var lyric = "fuck all you hoes";
//     var speechText = 'Guess this lyric it was all a dream';
//     var repromptText = '<speak>Speak...</speak>';
//     var speechOutput = {
//                 speech: speechText,
//                 type: AlexaSkill.speechOutputType.PLAIN_TEXT
//             };
//     var repromptOutput = {
//                 speech: repromptText,
//                 type: AlexaSkill.speechOutputType.PLAIN_TEXT
//             };
//     response.ask(speechOutput, repromptOutput);
//     return;
// }

// function MakeGuess (intent, session, response) {
//     var guess = intent.slots.Artist.value;

//     if (guess === 'biggie') {
//                 response.tell('yes');
//     }
//     else (response.tell('no'));
// }

// // function findLyric (arr) {
// //     // returns random lyric
// // }

// exports.handler = function (event, context) {
//     var guessTheLyric = new GuessTheLyric();
//     guessTheLyric.execute(event, context);
// };


// // function getPlayerAnswer (recognizedPlayerAnswer) {
// //             if (!recognizedPlayerAnswer) {
// //                 return undefined;
// //             }
// //             var split = recognizedPlayerAnswer.indexOf(' '), newAnswer;

// //             if (split < 0) {
// //                 newAnswer = recognizedPlayerAnswer;
// //             } else {
// //                 //the Answer should only contain a first Answer, so ignore the second part if any
// //                 newAnswer = recognizedPlayerAnswer.substring(0, split);
// //             }
// //             return newAnswer;
// //         }


var Alexa = require('alexa-sdk');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    console.log(event);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to Guess the Lyric, are you ready to play?', 'Shall we begin?');
    },

    'PlayGame': function () {
        this.emit(':ask', 'Here we go! It was all a dream, I used to read word up magazine', 'It was all a dream, I used to read word up magazine');
    },

    'MakeGuess': function () {
        var guess = this.event.request.intent.slots.Artist.value;
        var answer;
        if (guess) {
            answer = guess;
        } else {
            this.emit(':ask', `Sorry I didn\'t recognise that ${guess} name.`, 'What was your answer?');
        }
        var correctAnswer = '';
        if (answer.toLowerCase() === 'biggie') {
            correctAnswer = answer;
        }

        if (correctAnswer !== '') {
            this.emit(':ask', `Yes ${answer} is correct!`, 'How can I help?');
        } else {
            this.emit(':ask', `Sorry, ${answer} is wrong`);
        }

    }


};