const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('You are on the home page');
});

app.listen(3000, () => {
    console.log('Server is working...')
})