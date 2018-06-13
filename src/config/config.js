const env = process.env.NODE_ENV || 'dev';

const newsAPI = 'YOUR_NEWSAPI';

if (env === 'dev'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TechShots';
} else if (env === 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TechShotsTest'
}