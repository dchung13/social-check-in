const { ObjectId } = require('mongoose').Types;
const { Duelist, Thought } = require('../models');

//Aggregate function to get the number of thoughts overall
const getThoughtsCount = async () => 
    Thought.aggregate()
        .count('thoughtsCount')
        .then((numberOfThoughts) => res.json(numberOfThoughts));

module.exports = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    //get a single thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('-__v')
            .then((thought) => 
                !thought 
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json({
                        thought,
                        reactions: reaction(req.params.id)
                    }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    //create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : Duelist.findOneAndUpdate(
                    { thoughts: req.params.id },
                    { $pull: { thoughts: req.params.id } }
                    { new: true }
                )
            )
            .then((duelist) =>
                !duelist
                    ? res.status(404).json({ message: 'Thought deleted, but no duelist found with this id!' })
                    : res.json({ message: 'Thought deleted!' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    //add a reaction
    addReaction(req, res) {
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    //delete a reaction from a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
};