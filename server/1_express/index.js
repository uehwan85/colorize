// Global import
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// Local import
const { port } = require('./../0_config');
const router = require('./../2_routes');

const app = express();

const whitelist = ['https://colorize.io', 'https://www.colorize.io'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/', express.static(path.join(__dirname, './../../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`[1_express ] activated ${process.env.NODE_ENV || 'production'} mode...`);
});

module.exports = app;
