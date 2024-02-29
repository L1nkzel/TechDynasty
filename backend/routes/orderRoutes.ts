import express from 'express';
const router = express.Router();
import {
    createNewOrder,
    getMyOrders,
    getOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
    getAllOrders,
    deleteOrder

} from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

router.route('/').post(protect, createNewOrder).get(protect, admin, getAllOrders);
router.route('/').put(protect, markOrderAsPaid);
router.route('/').delete(protect, deleteOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/delivered').put(protect, admin, markOrderAsDelivered);


export default router;