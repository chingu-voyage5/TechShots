const { mongoose } = require('./../config');

const SourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
})

const Source = mongoose.model('Source', SourceSchema);

module.exports = { Source };