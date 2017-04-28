const mongoose = require('mongoose');
const lyricsModel = require('./lyrics_schema');
const db = 'mongodb://localhost:27017/lyricsRapBattle';

function getRandomRap () {
    mongoose.connect(db, (err) => {
        if (err) {
            console.log(err);
        }
        else console.log(`connected to ${db}`);
    });
    lyricsModel.find({}, function (error, data) {
        if (error) return console.log(error);
        let sessionLyrics = [];
        return sessionLyrics;
    });
}

module.exports = getRandomRap;