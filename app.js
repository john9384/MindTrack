const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Mapping global promise to get rid of warning about promise, though not displayed on new versions of mongoose
// mongoose.Promise = globalPromise;

//Connecting to the mongoose DB
mongoose.connect('mongodb://localhost/mindtrack',{
  //useMongoClient: true
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(() => console.log("MongoDB Connected...")).catch(err => console.log(err));

// Loading the Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Setting up the handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Route to index
app.get('/', (req, res) => {
  const title = 'Hello There';
  res.render('index', {
    title: title
  });
});

// Route to about
app.get('/about', (req, res) => {
  res.render('about');
});

// Port connection setup
const port = 3000;
app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});