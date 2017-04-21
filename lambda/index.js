var data = require('./data');
var Alexa = require('alexa-sdk');
var _ = require('underscore');

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var sesh = this.event.session.attributes;
        sesh.data = _.shuffle(data);
        sesh.currentIndex = 0;
        sesh.score = 0;
        this.emit(':ask', 'Welcome to Guess the Lyric, are you ready to play?', 'Shall we begin?');
    },

    'PlayGame': function () {
        var sesh = this.event.session.attributes;
        sesh.correctAnswer = sesh.data[sesh.currentIndex].correctAnswer;
        var answers = _.shuffle(sesh.data[sesh.currentIndex].Answers);
        this.emit(':ask', `Here we go <break time='1s'/> ${sesh.data[sesh.currentIndex].lyric}, is it A, ${answers[0]}, B, ${answers[1]}, or C, ${answers[2]}`, 'how can I help?');

    },

    'MakeGuess': function () {
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
            sesh.score ++;
            sesh.currentIndex ++;
            this.emit(':ask', `Yes ${answer} is correct!`, 'How can I help?');
        } else {
            sesh.score = sesh.score;
            sesh.currentIndex ++;
            this.emit(':ask', `Sorry, ${answer} is wrong`);
        }

    }


};