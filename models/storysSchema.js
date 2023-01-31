const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const storysSchema = new Schema({
  pic: String,
  title: String,
  story: String,
  topyc: String,
  storynum: String,
});

// Create a model based on that schema
const Storys = mongoose.model("Storys", storysSchema);

// export the model
module.exports = Storys;