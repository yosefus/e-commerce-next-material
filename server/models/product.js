import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: {
      en: { type: String, required: true },
      he: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      he: { type: String, required: true },
    },
    price: { type: Number, required: true },
    discount: { type: Boolean, default: false },
    material: { type: String, required: true },
    diamonds: { type: Boolean, default: false },
    rating: { type: Number, required: true, default: 0 },
    numReview: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    category: { type: Number, required: true },
    image: { type: Number, required: true },
    createDate: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
