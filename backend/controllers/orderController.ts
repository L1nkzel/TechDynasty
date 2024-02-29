import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createNewOrder = asyncHandler(async (req: any, res: any) => {
    const {
        orderItems,
        shippingAddress,
        paymentOptions,
        priceOfItems,
        taxAmount,
        shippingCost,
        totalPrice } = req.body;

    if (orderItems && orderItems.length > 0) {
        const order = new Order({
            orderItems: orderItems.map((item: any) => ({
                ...item,
                product: item._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentOptions,
            priceOfItems,
            taxAmount,
            shippingCost,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } else {
        res.status(400);
        throw new Error("No order items");
    }
});

// @desc    Get my orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: any, res: any) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc  Mark order as paid
// @route GET /api/orders
// @access Private
const markOrderAsPaid = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }

        order.isPaymentCompleted = true;
        order.paymentDate = new Date(Date.now());

        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }

        await order.save();

        res.json({ message: 'Order paid successfully' });
    } catch (error) {
        console.error("Error marking order as paid:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// @desc  Mark order as delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const markOrderAsDelivered = asyncHandler(async (req, res) => {


});

// @desc  Get all orders
// @route GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send("Retrieve all orders");
});

// @desc  Delete order
// @route DELETE /api/orders
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    // Check if orderId is provided
    if (!orderId) {
        res.status(400);
        throw new Error('Order ID is required');
    }

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    await order.deleteOne();

    res.json({ message: 'Order deleted successfully' });
});


export {
    createNewOrder,
    getMyOrders,
    getOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
    getAllOrders,
    deleteOrder
}
