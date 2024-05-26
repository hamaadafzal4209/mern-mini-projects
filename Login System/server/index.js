const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const model = require('./model/User.js')

app.use(cors());
app.use(bodyParser.json());





app.listen(3000, () => {
    console.log('Server is running at PORT : 3000');
})