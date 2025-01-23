const express = require('express');
const { check } = require('express-validator');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/products');
const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    validarCampos,
], getProductById);

router.post('/', [
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('stock', 'La cantidad en stock es obligatoria').not().isEmpty(),
    validarCampos,
], createProduct);

router.put('/:id', [
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    check('name', 'El nombre del producto es obligatorio').optional().not().isEmpty(),
    check('category', 'La categoría es obligatoria').optional().not().isEmpty(),
    check('price', 'El precio es obligatorio').optional().not().isEmpty(),
    check('stock', 'La cantidad en stock es obligatoria').optional().not().isEmpty(),
    validarCampos,
], updateProduct);

router.delete('/:id', [
    check('id', 'El ID proporcionado no es válido').isMongoId(),
    validarCampos,
], deleteProduct);

module.exports = router;
