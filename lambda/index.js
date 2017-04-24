var data = require('./data');
var Alexa = require('alexa-sdk');
var _ = require('underscore');
// var constants = require('./constants/constants');
// var onboardingStateHandlers = require('./handlers/onboardingStateHandlers');
// var mainStateHandlers = require('./handlers/mainStateHandlers');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
}; 

var states = {
    START: "_START",
    QUIZ: "_QUIZ"
}

const handlers = {
    "LaunchRequest": function () {
        this.handler.state = states.START;
        this.emitWithState("Start");
    },
    "PlayGame": function () {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "MakeGuess": function () {
        this.handlers.state = states.QUIZ;
        this.emitWithState('MakeGuess');
    },
    "Unhandled": function () {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
}

var startHandlers = Alexa.CreateStateHandler(states.START, {
    "Start": function () {
        this.emit(':ask', 'Welcome to Guess the Lyric, are you ready to play?', 'Shall we begin?');
    },
    "Unhandled": function () {
        this.emitWithState("Start");
    }
});

var quizHandlers = Alexa.CreateStateHandler(states.QUIZ, {
    "Quiz": function () {
        var sesh = this.event.session.attributes;
        sesh.data = _.shuffle(data);
        sesh.currentIndex = 0;
        sesh.score = 0;
        sesh.response = '';
        this.emitWithState("PlayGame");
    },
    "PlayGame": function () {
        var sesh = this.event.session.attributes;
        if (sesh.currentIndex === 0) {
            sesh.response = 'Here is your first question,' + " ";
        }
        sesh.correctAnswer = sesh.data[sesh.currentIndex].correctAnswer;
        var answers = _.shuffle(sesh.data[sesh.currentIndex].Answers);

        var question = `Question ${sesh.currentIndex + 1}, ${sesh.data[sesh.currentIndex].lyric}, is it A, ${answers[0]}, B, ${answers[1]}, or C, ${answers[2]}`;
        var speech = sesh.response + question;
        this.emit(':ask', speech, question);
    },
    "MakeGuess": function () {
        var response = '';
        var sesh = this.event.session.attributes;
        var guess = this.event.request.intent.slots.Artist.value;
        var answer;
        if (guess) {
            answer = guess;
        } else {
            this.emit(':ask', `Sorry I didn\'t recognise that Artist name.`, 'What was your answer?');
        }
        var correctAnswer = '';
        if (answer.toLowerCase() === sesh.correctAnswer.toLowerCase()) {
            correctAnswer = answer;
        }

        if (correctAnswer !== '') {
            sesh.score++;
            sesh.currentIndex++;
            response = `Yes ${answer} is correct!`;
        } else {
            sesh.score = sesh.score;
            sesh.currentIndex++;
            response = `Sorry, ${answer} is wrong, it was ${sesh.correctAnswer}`;
        }

        if (sesh.currentIndex < 3) {
            sesh.response = response;
            this.emitWithState('PlayGame');
        } else {
            this.emit(":tell", response + `your score is ${sesh.score}, THANKS`);
        }
    },
    "Unhandled": function () {
        this.emitWithState("MakeGuess");
    }
});

// var oldHandlers = {
//     'LaunchRequest': function () {
//         var sesh = this.event.session.attributes;
//         sesh.data = _.shuffle(data);
//         sesh.currentIndex = 0;
//         sesh.score = 0;
//         this.emit(':ask', 'Welcome to Guess the Lyric, are you ready to play?', 'Shall we begin?');
//     },

//     'PlayGame': function () {
//         var sesh = this.event.session.attributes;
//         sesh.correctAnswer = sesh.data[sesh.currentIndex].correctAnswer;
//         var answers = _.shuffle(sesh.data[sesh.currentIndex].Answers);
//         this.emit(':ask', `Here we go <break time='1s'/> ${sesh.data[sesh.currentIndex].lyric}, is it A, ${answers[0]}, B, ${answers[1]}, or C, ${answers[2]}`, 'how can I help?');

//     },

//     'MakeGuess': function () {
//         var sesh = this.event.session.attributes;
//         var guess = this.event.request.intent.slots.Artist.value;
//         var answer;
//         if (guess) {
//             answer = guess;
//         } else {
//             this.emit(':ask', `Sorry I didn\'t recognise that Artist name.`, 'What was your answer?');
//         }
//         var correctAnswer = '';
//         if (answer.toLowerCase() === sesh.correctAnswer.toLowerCase()) {
//             correctAnswer = answer;
//         }

//         if (correctAnswer !== '') {
//             sesh.score++;
//             sesh.currentIndex++;
//             this.emit(':ask', `Yes ${answer} is correct!`, 'How can I help?');
//         } else {
//             sesh.score = sesh.score;
//             sesh.currentIndex++;
//             this.emit(':ask', `Sorry, ${answer} is wrong`);
//         }

//     }


// };