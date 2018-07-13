const express = require('express');
const path = require('path');
const NewsAPI = require('newsapi');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

const newsapi = new NewsAPI(process.env.NEWSAPI);

// const { Post } = require('./db/models/Post');
const { User } = require('./db/models/User');

const { authenticate } = require('./middleware/authenticate');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

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
            sources: resources,
            language: 'en',
            page: 1
        })
    })
    .then((news) => {
        // excluding non-English news and hackernews
        return news.articles.filter((article) => {
            return article.url.indexOf('jp.') === -1
                && article.source.id !== 'hacker-news'; 
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
        .then((token) => res.header('x-token', token).send(newUser))
        .catch((e) => res.send(e))
});

app.get('/signin', (req, res) => {
    res.render('pages/signin');
});

app.post('/signin', (req, res) => {
    const user = req.body;
    console.log(req.body)
    User.giveToken(user)
        .then((token) => {
            res.json({token})
        })
        .catch((e) => {
            res.redirect('/signin')
        });
});

app.get('/profile', authenticate, (req, res) => {
    console.log(res.header)
  res.render('pages/profile');
});

app.get('/search', (req, res) => {
  res.render('pages/search');
});

app.listen(3000, () => {
    console.log('Server is working...')
})