const router = require('express').Router();
const gamesControllers = require('../controllers/gamesControllers');

router
  .route('/games/:id')
  .get(gamesControllers.retrieval);

router
  .route('/games')
  .post(gamesControllers.create)
  .get(gamesControllers.retrievalAll)
  .put(gamesControllers.update)
  .delete(gamesControllers.remove);

module.exports = router;