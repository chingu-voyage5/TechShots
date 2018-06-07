const express = require('express');
const path = require('path');

require('./config/config');

const app = express();

const { Post } = require('./db/models/Post');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    Post
        .find()
        .then((posts) => {
            res.render('home', {
                title: 'TechShots',
                posts
            });
        })
        .catch(console.log)
});

app.listen(3000, () => {
    console.log('Server is working...')
})