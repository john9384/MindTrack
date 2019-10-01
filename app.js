const express = require('express');

const app = express();

// Port connection setup
const port = 3000;
app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});