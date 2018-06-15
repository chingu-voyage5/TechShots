const { mongoose } = require('./../config');

const MarkedPostSchema = new mongoose.Schema({
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

const MarkedPost = mongoose.model('MarkedPost', MarkedPostSchema);

model.exports = { MarkedPost };