import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";
import Product from "../models/productModel";

const deleteUnpaidOrder = async () => {
    try {
        const thresholdTime = new Date(Date.now() - 1 * 60 * 1000); // 1 minute ago
        const unpaidOrders = await Order.find({
            isPaymentCompleted: false,
            createdAt: { $lt: thresholdTime }
        });

        for (const order of unpaidOrders) {
            if (!order.isPaymentCompleted) {
                // Update product counts for order items
                for (const item of order.orderItems) {
                    const product = await Product.findById(item.product);
                    if (product) {
                        product.countInStock += item.qty;
                        await product.save();
                    }
                }

                await order.deleteOne();
                console.log('Order deleted:', order._id);
            }
        }
    } catch (error) {
        console.error('Error processing unpaid orders:', error);
    }
};

// Schedule batch processing to run every 1 minute
setInterval(deleteUnpaidOrder, 1 * 60 * 1000);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createNewOrder = asyncHandler(async (req: any, res: any) => {
    const { orderItems, shippingAddress, paymentOptions, priceOfItems, taxAmount,
        shippingCost, totalPrice } = req.body;

    if (orderItems && orderItems.length > 0) {
        const itemsToUpdate = [];

        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (product) {
                const originalCountInStock = product.countInStock;
                product.countInStock -= item.qty;
                await product.save();
                itemsToUpdate.push({ product, originalCountInStock });
            }
        }

        const newOrder = new Order({
            orderItems: orderItems.map((item: any) => ({ ...item, _id: undefined })),
            user: req.user._id,
            shippingAddress,
            paymentOptions,
            priceOfItems,
            taxAmount,
            shippingCost,
            totalPrice,
        });

        const createdOrder = await newOrder.save();
        console.log('Order created:', createdOrder);

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
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDeliveryCompleted = true;
        order.deliveryDate = new Date(Date.now());

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }

});

// @desc  Get all orders
// @route GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");

    res.status(200).json(orders);
});

// @desc  Delete order
// @route DELETE /api/orders
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        res.status(400);
        throw new Error('Order ID is required');
    }

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // Update product counts for order items
    for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
            product.countInStock += item.qty;
            await product.save();
        }
    }

    await order.deleteOne();
    console.log('Order deleted:', order._id);
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
