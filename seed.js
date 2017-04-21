const mongoose = require('mongoose');
const LyricsModel = require('./lyrics');
const data = require('./data');
const db = 'mongodb://user:password@107.21.3.232/lyricsQuiz';

mongoose.connect(db, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`connected to ${db}`);

    data.forEach((lyric, i) => {
        let lyricNew = new LyricsModel (lyric);
        lyricNew.save(function (err, doc) {
            if (err) {
                return console.log(err);
            }
            console.log(`Lyric ${i} ${doc.lyric} saved to db`);
        });
    });

});