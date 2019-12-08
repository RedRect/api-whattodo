const mongoose =require('mongoose');

const listSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    title: String,
    subtitle: String,
    date: Date,
    todos: [String],
    checked: [Boolean],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('List', listSchema);