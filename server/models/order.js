import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    cartItems: [{
      name: { type: Object, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true }
    }],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    subtotalNum: { type: Number, required: true },
    shippingPrice: { type: String, required: true },
    tax: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    DeliveredAt: { type: Date },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      email_address: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
