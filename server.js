const express = require('express');
const { request } = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.listen(process.env.PORT || 3001, () => {
    console.log('listening at 3001')
})
app.use(express.static('public'));
app.use(express.json());

