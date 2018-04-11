const jwtAuthz = require("express-jwt-authz");

("use strict");
module.exports = function(app, checkJwt) {
  var newsList = require("../controllers/NewsController");

  // todoList Routes
  app
    .route("/news")
    // .get(checkJwt, jwtAuthz(["read:news"]), newsList.listNews)
    .get(newsList.listNews)
    .post(checkJwt, jwtAuthz(["create:news"]), newsList.createNews);

  app
    .route("/news/:entryId")
    .get(checkJwt, jwtAuthz(["read:news"]), newsList.readNews)
    .put(checkJwt, jwtAuthz(["update:news"]), newsList.updateNews)
    .delete(checkJwt, jwtAuthz(["delete:news"]), newsList.deleteNews);
};
