// var Alexa = require('alexa-sdk');
// var constants = require('../constants/constants');

// // define onBoarding Handlers

// var onboaringStateHandlers = Alexa.CreateStateHandler(constants.states.ONBOARDING, {
//     // the object that contains our handlers
//     'NewSession': function () {
//         // e.g if we have a user name change, otherwise set it 

//         // change state to main
//         this.handler.state = constants.states.MAIN;
//         this.emitWithState('LaunchRequest');
//     }
// });

// module.exports = onboaringStateHandlers;