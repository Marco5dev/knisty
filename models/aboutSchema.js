const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const aboutSchema = new Schema({
  name: String,
  age: String,
  city: String,
  skills: String,
});

// Create a model based on that schema
const About = mongoose.model("About", aboutSchema);

// export the model
module.exports = About;