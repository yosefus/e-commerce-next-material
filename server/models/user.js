import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      isDeleted: { type: Boolean, default: false },
      isAdmin: { type: Boolean, default: false },
      password: { type: String, required: true, select: false }
   },
   {
      timestamps: true,
   }
);

const Product = mongoose.models.User || mongoose.model('User', userSchema);
export default Product;
