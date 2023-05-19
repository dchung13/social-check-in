const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {type: String, required: true, minlength: 1, maxlength: 280},
    createdAt: {type: Date, default: Date.now, get: timestamp => dateFormat(timestamp)},
    duelistname: {type: String, required: true},
    reactions: {
        type: [reactionSchema],
        virtuals: true
    }
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);