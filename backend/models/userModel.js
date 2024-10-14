import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

// Ensure unique index on email field for quick lookup
userSchema.index({ email: 1 }, { unique: true });

const userModel =  mongoose.model("user", userSchema);

export default userModel;
