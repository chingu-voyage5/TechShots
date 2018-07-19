const { mongoose } = require('./../config');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    urlToImage: {
        type: String,
        required: true
    },    
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    source: {
        url: {
            type: String
        },
        name: {
            type: String
        }

    }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };