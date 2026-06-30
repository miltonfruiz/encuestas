const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const authenticate = require('../middleware/auth');

router.get('/api/polls', authenticate, controller.list);
router.post('/api/polls', authenticate, controller.create);
router.get('/api/polls/:id', authenticate, controller.getById);
router.put('/api/polls/:id', authenticate, controller.update);
router.delete('/api/polls/:id', authenticate, controller.delete);
router.post('/api/polls/:id/vote', authenticate, controller.vote);
router.get('/api/polls/:id/results', authenticate, controller.getResults);

module.exports = router;