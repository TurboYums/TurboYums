const config = require('../config.json');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.port = config.api.port || 5000;
app.google_translate_api_key = config.google_translate.api_key;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;