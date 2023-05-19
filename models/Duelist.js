const mongoose = require('mongoose');

const duelistSchema = new mongoose.Schema({
    duelistname: {type: String, required: true, unique: true, trim: true  },
    email: {type: String, required: true, unique: true, validate: function(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email) ? true : "Invalid Email Address";
    }},
    thoughts: {
        type: [Schema.Types.ObjectId],
        ref: "Thought"
    },
    rivals: {
        type: [Schema.Types.ObjectId],
        ref: "Duelist",
        virtuals: true
    }
});

duelistSchema.virtual('rivalCount').get(function() {
    return this.rivals.length;
});

const Duelist = mongoose.model('Duelist', duelistSchema);

const handleError = (err) => console.error(err);

Duelist.create({
    duelisttname: 'Yugi Muto',
    email: 'poweroffriendship@gmail.com',
    thoughts: ['Dark Magician Girl is so cute!'],
    rivals: [{
        duelistname: 'Seto Kaiba'
    },
    {
        duelistname: 'Joey Wheeler'
    }]
} , (err) => (err ? handleError(err) : console.log('Duelist created!'))
);

Duelist.create({
    duelisttname: 'Seto Kaiba',
    email: 'screwtherules+ihavemoney@gmail.com',
    thoughts: ['Blue Eyes White Dragon is the best card ever!'],
    rivals: [{
        duelistname: 'Yugi Muto'
    },
    {
        duelistname: 'Joey Wheeler'
    }]
} , (err) => (err ? handleError(err) : console.log('Duelist created!'))
);

Duelist.create({
    duelistname: 'Joey Wheeler',
    email: 'timeroulettego@gmail.com',
    thoughts: ['Red-eyed Black Dragon is the strongest monster!'],
    rivals: [{
        duelistname: 'Yugi Muto'
    },
    {
        duelistname: 'Seto Kaiba'
    }]
} , (err) => (err ? handleError(err) : console.log('Duelist created!'))
);

