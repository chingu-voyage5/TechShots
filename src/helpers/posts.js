const NewsAPI = require('newsapi');

require('dotenv').config();

const newsapi = new NewsAPI(process.env.NEWSAPI);

const { Post } = require('../db/models/Post');
const { User } = require('../db/models/User');

module.exports.getPosts = (page = 1, cookies) => {
    return new Promise((resolve, reject) => {
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
                page
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
            const getPost = (post) => {
                return new Promise((resolve, reject) => {
                    Post.findOne({title: post.title})
                        .then((found) => {
                            if (!found){
                                post.views = 0;
                                post.likes = 0;
                                return post;
                            } else {
                                post.views = found.views;
                                post.likes = found.likes;
                                if (cookies.token){
                                    return User.checkByToken(cookies.token)
                                        .then((user) => {
                                            if (user.favorites.indexOf(found._id.toString()) > -1){
                                                post.liked = 'active';
                                                return post;
                                            } else {
                                                post.liked = '';
                                                return post;
                                            }
                                        })
                                        .catch(console.log)
                                } else {
                                    return post;
                                }
                            }
                            
                        })
                        .then(resolve)
                        .catch(console.log)
                });  
            } 
    
            const allPromises = [];
    
            posts.forEach((post) => {
                allPromises.push(getPost(post))
            });
    
            resolve(Promise.all(allPromises));
        })
    })
    
};