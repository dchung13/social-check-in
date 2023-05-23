const router = require('express').Router();
const duelistRoutes = require('./duelist-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/duelists', duelistRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;