const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'TechShots',
        content: 'lorem ipsum and things like that...'
    });
});

app.listen(3000, () => {
    console.log('Server is working...')
})