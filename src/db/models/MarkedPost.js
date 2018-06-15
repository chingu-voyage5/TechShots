const { mongoose } = require('./../config');

const MarkedPost = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    source: {
        type: mongoose.Types.ObjectId
    }
})

const MarkedPost = mongoose.model('MarkedPost', MarkedPost);

model.exports = { MarkedPost };