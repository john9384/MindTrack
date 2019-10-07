const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Mapping global promise to get rid of warning about promise, though not displayed on new versions of mongoose
// mongoose.Promise = globalPromise;

//Connecting to the mongoose DB
mongoose
  .connect("mongodb://localhost/mindtrack", {
    //useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Loading the Idea Model
require("./models/Idea");
const Idea = mongoose.model("ideas");

// Setting up the handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to index/ main view for handlebars
app.get("/", (req, res) => {
  const title = "Hello There";
  res.render("index", {
    title: title
  });
});

// Route to about
app.get("/about", (req, res) => {
  res.render("about");
});

//Route to the Idea form
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add");
});

// Processing the Ideas from the form
app.post("/ideas", (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }

  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => {
      res.redirect("/ideas");
    });
  }
});
// Route to the ideas page
app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

// Port connection setup
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
