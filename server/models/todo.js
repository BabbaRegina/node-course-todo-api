
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    },
    completed: {
        type: Boolean,
        default: false
    },
    competedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};