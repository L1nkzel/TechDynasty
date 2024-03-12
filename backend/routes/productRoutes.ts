import express from 'express';
const router = express.Router();
import { addProduct, editProduct, getAllproducts, getProductById, getProductsByCategory } from '../controllers/productController';
import { protect, admin } from '../middleware/authMiddleware';

router.route('/').get(getAllproducts).post(protect, admin, addProduct);
router.route('/:id').get(getProductById).put(protect, admin, editProduct);
router.route('/category/:category').get(getProductsByCategory);

export default router;