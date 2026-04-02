import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { AppError } from "./errorHandler";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return next(new AppError(errorMessages.join(", "), 400));
  }
  next();
};

export const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product name must be between 3 and 100 characters"),
  
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a valid number")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category must be between 2 and 50 characters"),
  
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
  
  body("material")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Material must not exceed 100 characters"),
  
  body("craftsmanship")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Craftsmanship must not exceed 100 characters"),
  
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),
  
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
  
  body("artisanId")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Artisan ID must be at least 3 characters"),
  
  handleValidationErrors
];

export const validateReview = [
  body("user")
    .trim()
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("User name must be between 2 and 50 characters"),
  
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Comment must be between 10 and 500 characters"),
  
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),
  
  handleValidationErrors
];

export const validateState = [
  body("stateID")
    .trim()
    .notEmpty()
    .withMessage("State ID is required")
    .isLength({ min: 2, max: 10 })
    .withMessage("State ID must be between 2 and 10 characters"),
  
  body("stateName")
    .trim()
    .notEmpty()
    .withMessage("State name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("State name must be between 3 and 100 characters"),
  
  body("stateDesc")
    .trim()
    .notEmpty()
    .withMessage("State description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("State description must be between 10 and 1000 characters"),
  
  body("ImagesData")
    .isArray()
    .withMessage("Images data must be an array"),
  
  body("ImagesData.*.cardImage")
    .isURL()
    .withMessage("Card image must be a valid URL"),
  
  body("ImagesData.*.bgImage")
    .isURL()
    .withMessage("Background image must be a valid URL"),
  
  body("ImagesData.*.cardTitle")
    .trim()
    .notEmpty()
    .withMessage("Card title is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Card title must be between 2 and 50 characters"),
  
  handleValidationErrors
];

export const validateMongoId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid ID format"),
  
  handleValidationErrors
];

export const validateStateName = [
  param("stateName")
    .trim()
    .notEmpty()
    .withMessage("State name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("State name must be between 2 and 50 characters"),
  
  handleValidationErrors
];
