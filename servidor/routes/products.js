const express = require("express");
const router = express.Router();
const { check, param } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/products");

router.get("/", getProducts);

router.post(
    "/",
    [
        check("name", "El nombre del producto es obligatorio").not().isEmpty(),
        check("category", "La categoría del producto es obligatoria").not().isEmpty(),
        check("price", "El precio debe ser un número válido").isFloat({ gt: 0 }),
        check("stock", "El stock debe ser un número entero válido").isInt({ gt: 0 }),
        validarCampos,
    ],
    createProduct
);

router.put(
    "/:id",
    [
        param("id", "El ID del producto no es válido").isMongoId(),
        check("name", "El nombre del producto es obligatorio").optional().not().isEmpty(),
        check("category", "La categoría del producto es obligatoria").optional().not().isEmpty(),
        check("price", "El precio debe ser un número válido").optional().isFloat({ gt: 0 }),
        check("stock", "El stock debe ser un número entero válido").optional().isInt({ gt: 0 }),
        validarCampos,
    ],
    updateProduct
);

router.delete(
    "/:id",
    [
        param("id", "El ID del producto no es válido").isMongoId(),
        validarCampos,
    ],
    deleteProduct
);

module.exports = router;
