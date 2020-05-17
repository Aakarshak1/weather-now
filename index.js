require('dotenv').config();
const express = require('express');
const app = express();

require('./src/startup/routes')(app);

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
