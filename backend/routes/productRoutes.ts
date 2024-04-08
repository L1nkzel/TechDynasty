import express from 'express';
const router = express.Router();
import { addProduct, addProductReview, deleteProduct, editProduct, incrementProductViews, getAllproducts, getPopularProducts, getProductById, getProductsByCategory, toggleReviewDislike, toggleReviewLike } from '../controllers/productController';
import { protect, admin } from '../middleware/authMiddleware';

router.route('/').get(getAllproducts).post(protect, admin, addProduct);
router.route('/popular').get(getPopularProducts);
router.route('/increment/:id').put(incrementProductViews);
router.route('/:id').get(getProductById).put(protect, admin, editProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, addProductReview);
router.route('/:id/reviews/:reviewId/likes').post(protect, toggleReviewLike);
router.route('/:id/reviews/:reviewId/dislikes').post(protect, toggleReviewDislike);
router.route('/category/:category').get(getProductsByCategory);

export default router;
