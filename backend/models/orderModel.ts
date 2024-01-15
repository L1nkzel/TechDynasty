import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentOption: { type: String, required: true },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    priceOfItems: { type: Number, required: true, default: 0.0 },
    taxAmount: { type: Number, required: true, default: 0.0 },
    shippingCost: { type: Number, required: true, default: 0.0 },
    finalPrice: { type: Number, required: true, default: 0.0 },
    isPaymentCompleted: { type: Boolean, required: true, default: false },
    paymentDate: { type: Date },
    isDeliveryCompleted: { type: Boolean, required: true, default: false },
    deliveryDate: { type: Date },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;