const { mongoose } = require('./../config');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 10
    },
    image: {
        type: String
    },
    summary: {
        type: String,
        required: true,
        maxlength: 200
    },
    tags: {
        type: Array
    },
    source: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };