import mongoose, { Document, Schema } from "mongoose";

export interface IReview {
  user: string;
  comment: string;
  rating: number;
  date: Date;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  description?: string;
  material?: string;
  craftsmanship?: string;
  imageUrl?: string;
  inStock: boolean;
  quantity: number;
  artisanId?: string;
  dateAdded: Date;
  salesCount: number;
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  material: { type: String },
  craftsmanship: { type: String },
  imageUrl: { type: String },
  inStock: { type: Boolean, default: true },
  quantity: { type: Number, default: 1 },
  artisanId: { type: String },
  dateAdded: { type: Date, default: Date.now },
  salesCount: { type: Number, default: 0 },
  reviews: [reviewSchema]
}, {
  timestamps: true
});

// Database indexes for performance
productSchema.index({ category: 1 });
productSchema.index({ artisanId: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
