import express from 'express';
const router = express.Router();
import { getAllproducts, getProductById } from '../controllers/productController';

router.route('/').get(getAllproducts);
router.route('/:id').get(getProductById);

export default router;