const { Duelist, Thought } = require('../models');

module.exports = {
    //get all duelists
    getAllDuelists(req, res) {
        Duelist.find()
            .then((duelists) => res.json(duelists))
            .catch((err) => res.status(500).json(err));
    },
    //get a single duelist
    getOneDuelist(req, res) {
        Duelist.findOne({ _id: req.params.id })
            .select('-__v')
            .then((duelist) => 
                !duelist 
                    ? res.status(404).json({ message: 'No duelist found with this id!' })
                    : res.json(duelist)
            )
            .catch((err) => res.status(500).json(err));
    },
    //create a duelist
    createDuelist(req, res) {
        Duelist.create(req.body)
            .then((duelist) => res.json(duelist))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },
    //update a duelist
    updateDuelist(req, res) {
        Duelist.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        )
            .then((duelist) =>
                !duelist
                    ? res.status(404).json({ message: 'No duelist found with this id!' })
                    : res.json(duelist)
            )
            .catch((err) => res.status(500).json(err));
    },
    //delete a duelist
    deleteDuelist(req, res) {
        Duelist.findOneAndDelete({ _id: req.params.id })
            .then((duelist) =>
                !duelist
                    ? res.status(404).json({ message: 'No duelist found with this id!' })
                    : Thought.deleteMany({ _id: { $in: duelist.thoughts } })
            )
            .then(() => res.json({ message: 'Duelist deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    //add a rival
    addRival(req, res) {
        Duelist.findOneAndUpdate(
            { _id: req.params.id }, 
            { $addToSet: { rivals: req.params.rivalId } }, 
            { new: true }
        )
            .then((duelist) =>
                !duelist
                    ? res.status(404).json({ message: 'No duelist found with this id!' })
                    : res.json(duelist)
            )
            .then(() => res.json({ message: 'Rival added!' }))
            .catch((err) => res.status(500).json(err));
    },
    //remove a rival
    removeRival(req, res) {
        Duelist.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { rivals: req.params.rivalId } },
            { new: true }
        )
            .then((duelist) =>
                !duelist
                    ? res.status(404).json({ message: 'No duelist found with this id!' })
                    : res.json(duelist)
            )
            .then(() => res.json({ message: 'Rival removed!' }))
            .catch((err) => res.status(500).json(err));
        },
    };  
