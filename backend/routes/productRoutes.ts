import express from 'express';
const router = express.Router();
import { getAllproducts, getProductById, getProductsByCategory } from '../controllers/productController';

router.route('/').get(getAllproducts);
router.route('/:id').get(getProductById);
router.route('/category/:category').get(getProductsByCategory);

export default router;