const express = require('express');
const path = require('path');
const NewsAPI = require('newsapi');

// require('./config/config');
require('dotenv').config();

const app = express();

const newsapi = new NewsAPI(process.env.NEWSAPI);

// const { Post } = require('./db/models/Post');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('assets'));

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

app.listen(3000, () => {
    console.log('Server is working...')
})