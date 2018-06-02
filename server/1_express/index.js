process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
// Global import
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const path = require('path');

// Local import
const config = require('../0_config');
const router = require('../2_routes');
const { url } = require('../../client/src/config');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(fileUpload());
app.use('/api', router);
app.use('/', express.static(path.join(__dirname, '../../client/build/index.html')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
});

app.listen(config.express.port, () => {
  console.log(`[1_express ] activated on port ${url}...`);
});

module.exports = app;
