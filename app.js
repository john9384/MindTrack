const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();

// Loading routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");

require("./config/passport")(passport);

//Connecting to the mongoose DB
mongoose
  .connect("mongodb://localhost/mindtrack", {
    // useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

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

// Joining the static folder
app.use(express.static(path.join(__dirname, "assets")));

// The method override middleware
app.use(methodOverride("_method"));

// The express-session middleware
app.use(
  session({
    secret: "web-secret",
    resave: true,
    saveUninitialized: true
  })
);

// The connect-flash midlleware
app.use(flash());

// The global variables used for the flash messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
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

// Using the route
app.use("/ideas", ideas);
app.use("/users", users);

// Port connection setup
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
