const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading the Idea Model
require("../models/Idea");
const Idea = mongoose.model("ideas");

//Route to the Idea form
router.get("/add", (req, res) => {
  res.render("ideas/add");
});
// Route to the ideas page
router.get("/", (req, res) => {
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
router.get("/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render("ideas/edit", {
      idea: idea
    });
  });
});

// Processing the Ideas from the form
router.post("/", (req, res) => {
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
      req.flash("success_msg", "New Track Added ");
      res.redirect("/ideas");
    });
  }
});

// Precessing edited form
router.put("/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then(idea => {
      req.flash("success_msg", "Track Edited");
      res.redirect("/ideas");
    });
  });
});

// Handling the Deleting request
router.delete("/:id", (req, res) => {
  Idea.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Track Delete");
    res.redirect("/ideas");
  });
});

module.exports = router;
