const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var indexRouter = require('./routes/index');
const blogRouter = require('./routes/blog')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('you just hit the home page\n')
})

app.use('/user', indexRouter);
app.use('/api', blogRouter);

app.listen(6000, () => {
  console.log('Listening on localhost:6000')
})

