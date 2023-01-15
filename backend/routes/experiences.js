const { Router } = require('express');
const {
    post,
    getAll
} = require('../controllers/experiences');

const router = Router();

router.post('', post);
router.get('', getAll);

module.exports = router;