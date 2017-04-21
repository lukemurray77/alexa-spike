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
        this.event.session.attributes.data = _.shuffle(data);
        this.event.session.attributes.currentIndex = 0;
        this.event.session.attributes.score = 0;
        this.emit(':ask', 'Welcome to Guess the Lyric, are you ready to play?', 'Shall we begin?');
    },

    'PlayGame': function () {
        this.event.session.attributes.correctAnswer = this.event.session.attributes.data[this.event.session.attributes.currentIndex].correctAnswer;
        var answers = _.shuffle(this.event.session.attributes.data[this.event.session.attributes.currentIndex].Answers);
        this.emit(':ask', `Here we go <break time='1s'/> ${this.event.session.attributes.data[this.event.session.attributes.currentIndex].lyric}, is it A, ${answers[0]}, B, ${answers[1]}, or C, ${answers[2]}`, 'how can I help?');

    },

    'MakeGuess': function () {

        var guess = this.event.request.intent.slots.Artist.value;
        var answer;
        if (guess) {
            answer = guess;
        } else {
            this.emit(':ask', `Sorry I didn\'t recognise that Artist name.`, 'What was your answer?');
        }
        var correctAnswer = '';
        if (answer.toLowerCase() === this.event.session.attributes.correctAnswer.toLowerCase()) {
            correctAnswer = answer;
        }

        if (correctAnswer !== '') {
            this.event.session.attributes.score ++;
            this.event.session.attributes.currentIndex ++;
            this.emit(':ask', `Yes ${answer} is correct!`, 'How can I help?');
        } else {
            this.event.session.attributes.score = this.event.session.attributes.score;
            this.event.session.attributes.currentIndex ++;
            this.emit(':ask', `Sorry, ${answer} is wrong`);
        }

    }


};