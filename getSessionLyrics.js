const mongoose = require('mongoose');
const lyricsModel = require('./lyrics');
const db = 'mongodb://user:password@107.21.3.232/lyricsQuiz';

function getSessionLyrics () {
    mongoose.connect(db, (err) => {
        if (err) {
            console.log(err);
        }
        else console.log(`connected to ${db}`);
    });

    lyricsModel.find({}, function (error, data) {
        if (error) return console.log(error);

        const numberOfLyrics = data.length;
        let sessionLyrics = [];
        while (sessionLyrics.length < 3) {
            const randomIndex = Math.floor(Math.random() * numberOfLyrics);
            const randomLyric = data[randomIndex];
            if (!sessionLyrics.includes(randomLyric)) sessionLyrics.push(randomLyric);
        }

        sessionLyrics = sessionLyrics.map((sessionLyric) => {
            let wrongAnswers = [];
            while (wrongAnswers.length < 2) {
                const randomIndex = Math.floor(Math.random() * numberOfLyrics);
                const wrongArtist = data[randomIndex].artist;
                if (!wrongAnswers.includes(wrongArtist) && wrongArtist !== sessionLyric.artist) wrongAnswers.push(wrongArtist);
            }
            wrongAnswers.push(sessionLyric.artist);
            return {
                lyric: sessionLyric.lyric,
                correctArtist: sessionLyric.artist,
                incorrectArtists: wrongAnswers
            };
        });
        return sessionLyrics;
    });
}

module.exports = getSessionLyrics;
