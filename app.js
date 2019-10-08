const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

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
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// The method override middleware
app.use(methodOverride("_method"));

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
// Route to the ideas page
app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({
      date: "desc"
    })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

//Route to the edit Idea page
app.get("/ideas/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render("ideas/edit", {
      idea: idea
    });
  });
});

// Processing the Ideas from the form
app.post("/ideas", (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({
      text: "Please add a title"
    });
  }
  if (!req.body.details) {
    errors.push({
      text: "Please add some details"
    });
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

// Precessing edited form
app.put("/ideas/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then(idea => {
      res.redirect("/ideas");
    });
  });
});

// Port connection setup
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
