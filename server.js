const express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
const path = require("path");
var Book = require("./book.js");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true });

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

var data = {
    array: ["item1", "item2", "item3"],
    boolean: false,
    title: {
        type: String,
        required: true
      },
      // `link` is required and of type String
      authors: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      image: {
            type: String,
            required: true
      },
      link: {
        type: String,
        required: true
    },
  };

Book.create(data)
  .then(function(dbBook) {
    // If saved successfully, print the new Example document to the console
    console.log(dbBook);
  })
  .catch(function(err) {
    // If an error occurs, log the error message
    console.log(err.message);
  });
