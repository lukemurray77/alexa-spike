var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LyricsSchema = new Schema({
  lyric: String,
  themes: Array,
  rhymes: Array,
  lastWord: String
});

module.exports = mongoose.model('lyrics', LyricsSchema);