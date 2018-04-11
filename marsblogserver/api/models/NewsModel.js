"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {
    type: String,
    required: "Enter the title of the news"
  },
  author: {
    type: String,
    required: "Enter the author of the news"
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  edited_date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: "Enter the content of the entry"
  }
});

module.exports = mongoose.model("News", NewsSchema);
