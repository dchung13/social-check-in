const router = require('express').Router();

const {
    getAllDuelists,
    getOneDuelist,
    createDuelist,
    updateDuelist,
    deleteDuelist,
} = require('../../controllers/duelistController');

// Set up GET all and POST at /api/duelists
router.route('/').get(getAllDuelists).post(createDuelist);

// Set up GET one, PUT, and DELETE at /api/duelists/:id
router
    .route('/:id')
    .get(getOneDuelist)
    .put(updateDuelist)
    .delete(deleteDuelist);

module.exports = router;