const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedMovie = new Schema({
 

  title: {
    type: String,
    unique: true,
  },

  poster_path: {
    type: String,
    require: true
  },
  overview: {
    type: String,
    require: true
  },
  vote_average: {
    type: String,
    require: true
  },
  flatrate: {
    type: String,
    require: true
  },
  rent: {
    type: String,
    require: true
  }
});

const Saved = mongoose.model("Saved", SavedMovie);

module.exports = Saved;
