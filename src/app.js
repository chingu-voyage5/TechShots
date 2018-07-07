const express = require('express');
const path = require('path');
const NewsAPI = require('newsapi');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const newsapi = new NewsAPI(process.env.NEWSAPI);

// const { Post } = require('./db/models/Post');
const { User } = require('./db/models/User');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    newsapi.v2.sources({
        category: 'technology',
        language: 'en',
        country: 'us'
    })
    .then((data) => {
        return data.sources.reduce((arr, cur) => {
            arr.push(cur.id);
            return arr;
        }, []).join(',');
    })
    .then((resources) => {
        return newsapi.v2.everything({
            sources: 'techcrunch',
            language: 'en',
            page: 1
        })
    })
    .then((news) => {
        // excluding non-English news
        return news.articles.filter((article) => {
            return article.url.indexOf('jp.') === -1; 
        })
    })
    .then((posts) => {
        res.render('pages/home', {posts});
    })
    .catch(console.log)
});

app.get('/signup', (req, res) => {
    res.render('pages/signup');
});

app.post('/signup', (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    newUser.save()
        .then(() => {
            return newUser.generateLoginToken();
        })
        .then((token) => res.header('x-token', token).redirect('/'))
        .catch((e) => res.send(e))
});

app.get('/profile', (req, res) => {
  res.render('pages/profile');
});

app.get('/search', (req, res) => {
  res.render('pages/search');
});

app.listen(3000, () => {
    console.log('Server is working...')
})