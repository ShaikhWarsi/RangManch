import { Request, Response } from "express";
import Product, { IProduct, IReview } from "../models/product";
import { asyncHandler } from "../middleware/errorHandler";

// Get all products with pagination
export const getProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments()
  ]);

  res.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  });
});

// Create a new product
export const createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const newProduct: IProduct = await Product.create(req.body);
  res.status(201).json({ success: true, data: newProduct });
});

// Get products by artisan with pagination
export const getProductsByArtisan = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { artisanId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find({ artisanId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments({ artisanId })
  ]);

  res.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  });
});

// Delete a product
export const deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedProduct: IProduct | null = await Product.findByIdAndDelete(id);
  
  if (!deletedProduct) {
    res.status(404).json({ success: false, error: "Product not found" });
    return;
  }
  
  res.json({ success: true, message: "Product deleted successfully" });
});

// Add a review to a product
export const addProductReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { user, comment, rating }: IReview = req.body;
  
  const product: IProduct | null = await Product.findById(id);
  if (!product) {
    res.status(404).json({ success: false, error: "Product not found" });
    return;
  }
  
  product.reviews.push({ user, comment, rating, date: new Date() });
  await product.save();
  
  res.status(201).json({ success: true, data: product.reviews });
});
