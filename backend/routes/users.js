const { Router } = require('express');
const {
    getAll, create, updateById, deleteAll, deleteById
} = require('../controllers/users');

const router = Router();

router.get('', getAll);
router.post('', create);
router.put('/:id', updateById);
router.delete('', deleteAll);
router.delete('/:id', deleteById);

module.exports = router;