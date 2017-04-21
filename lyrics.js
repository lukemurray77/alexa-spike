var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LyricsSchema = new Schema({
  lyric: String,
  artist: String
});

module.exports = mongoose.model('lyrics', LyricsSchema);