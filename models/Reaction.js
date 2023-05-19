const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new mongoose.Schema({
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
    reactionBody: {type: String, required: true, maxlength: 280},
    duelistname: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, get: timestamp => dateFormat(timestamp)}
});