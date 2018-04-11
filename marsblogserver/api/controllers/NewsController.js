"use strict";

var mongoose = require("mongoose");
var News = mongoose.model("News");

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

exports.listNews = function(req, res) {
  News.find({}, function(err, news) {
    if (err) res.send(err);

    sleep(200).then(() => {
      res.json(news);
    });
  });
};

exports.createNews = function(req, res) {
  console.log(req.body);
  var newNews = new News(req.body);
  console.log(newNews);
  newNews.save(function(err, news) {
    if (err) res.send(err);

    sleep(200).then(() => {
      res.json(news);
    });
  });
};

exports.readNews = function(req, res) {
  News.findById(req.params.newsId, function(err, news) {
    if (err) res.send(err);

    sleep(200).then(() => {
      res.json(news);
    });
  });
};

exports.updateNews = function(req, res) {
  News.findOneAndUpdate(
    { _id: req.params.newsId },
    req.body,
    { new: true },
    function(err, news) {
      if (err) res.send(err);
      res.json(news);
    }
  );
};

exports.deleteNews = function(req, res) {
  News.remove(
    {
      _id: req.params.newsId
    },
    function(err, news) {
      if (err) res.send(err);

      sleep(200).then(() => {
        res.json({ id: req.params.newsId });
      });
    }
  );
};
