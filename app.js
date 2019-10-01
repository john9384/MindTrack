const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

// Setting up the handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Route to index
app.get('/', (req, res) => {
  const title = 'Hello there';
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