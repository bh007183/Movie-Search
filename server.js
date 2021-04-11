const express = require("express");
const app = express();

const mongoose = require("mongoose");
// Sets up the Express App
var PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));
/////////////////////////////////
const routes = require("./routes/routes.js")

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/movieDB",
   { 
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false 
  });
// Routes
// =============================================================
app.use(routes)
// Syncing our sequelize models and then starting our Express app
// =============================================================

// Change force: to true if it's cool for the site to remove database items.

  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
