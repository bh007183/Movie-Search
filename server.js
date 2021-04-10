const express = require("express");
const app = express();
const db = require("./models");
// Sets up the Express App
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// corsOptions
// Static directory
app.use(express.static("public"));
/////////////////////////////////
const placeholder = require("./routes/placeholder.js")

// Routes
// =============================================================
app.use(placeholder)
// Syncing our sequelize models and then starting our Express app
// =============================================================

// Change force: to true if it's cool for the site to remove database items.
db.sequelize.sync({ force: false}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
});