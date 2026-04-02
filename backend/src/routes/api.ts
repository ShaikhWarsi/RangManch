import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductsByArtisan,
  deleteProduct,
  addProductReview
} from "../controllers/productController";
import {
  getStates,
  deleteAllStates,
  createState,
  getStateByName,
  deleteState,
  updateState
} from "../controllers/stateController";
import {
  validateProduct,
  validateReview,
  validateState,
  validateMongoId,
  validateStateName
} from "../middleware/validation";
import Razorpay from 'razorpay';
import { MongoClient } from 'mongodb';
import cors from './cors';

const router = Router();

// Apply CORS middleware
router.use(cors);

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890abcdef',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_1234567890abcdef',
});

// Product Routes
router.get("/products", getProducts);
router.post("/products", validateProduct, createProduct);
router.get("/products/artisan/:artisanId", validateStateName, getProductsByArtisan);
router.delete("/products/:id", validateMongoId, deleteProduct);
router.post("/products/:id/reviews", validateMongoId, validateReview, addProductReview);

// State Routes
router.get("/states", getStates);
router.delete("/states", deleteAllStates);
router.post("/states", validateState, createState);
router.get("/states/:stateName", validateStateName, getStateByName);
router.delete("/states/:stateName", validateStateName, deleteState);
router.patch("/states/:stateID", validateStateName, updateState);

// Artisan Routes
router.get("/artisans", async (req: any, res: any) => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const artisans = await db.collection('artisans').find({}).sort({ createdAt: -1 }).toArray();
    
    res.json({
      success: true,
      artisans,
      count: artisans.length
    });
    
  } catch (error: any) {
    console.error('Get artisans error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get artisans',
      message: error?.message || 'Unknown error'
    });
  }
});

router.get("/artisans/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const artisan = await db.collection('artisans').findOne({ _id: id });
    
    if (artisan) {
      res.json({
        success: true,
        artisan,
        message: 'Artisan found'
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Artisan not found',
        message: 'Artisan not found'
      });
    }
    
  } catch (error: any) {
    console.error('Get artisan error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get artisan',
      message: error?.message || 'Unknown error'
    });
  }
});

router.post("/artisans", async (req: any, res: any) => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const artisan = {
      ...req.body,
      _id: new Date().getTime().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      verified: false // New artisans start as unverified
    };
    
    await db.collection('artisans').insertOne(artisan);
    
    res.status(201).json({
      success: true,
      artisan,
      message: 'Artisan created successfully'
    });
    
  } catch (error: any) {
    console.error('Create artisan error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create artisan',
      message: error?.message || 'Unknown error'
    });
  }
});

// Razorpay Routes for Real Transactions
router.post('/create-order', async (req: any, res: any) => {
  try {
    const { amount, currency, receipt, notes, customer, products } = req.body;
    
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: receipt || `order_${Date.now()}`,
      notes: notes || 'Order from RangManch',
      customer: {
        name: customer.name,
        email: customer.email,
        contact: customer.contact,
      },
      products: products.map((p: any) => ({
        name: p.name,
        quantity: p.quantity,
        price: p.price * 100, // Convert to paise
        currency: currency || 'INR'
      })),
      options: {
        checkout: {
          method: 'emi',
          emi: {
            tenure: [3, 6, 9, 12, 18, 24]
          }
        }
      }
    });

    // Store order in MongoDB
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const orderData = {
      _id: order.id,
      amount,
      currency,
      receipt,
      notes,
      customer,
      products,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('orders').insertOne(orderData);
    
    // Notify artisan (in real implementation, this would send email/SMS)
    console.log('Order created:', order.id);
    console.log('Artisan notified for products:', products.map(p => p.name));
    
    res.json({
      success: true,
      orderId: order.id,
      razorpayOrder: order,
      message: 'Order created successfully'
    });
    
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message
    });
  }
});

// Get Order Status
router.get('/order-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const order = await db.collection('orders').findOne({ _id: orderId });
    
    if (order) {
      res.json({
        success: true,
        order: order,
        message: 'Order found'
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Order not found',
        message: 'Order not found'
      });
    }
    
  } catch (error) {
    console.error('Order status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get order status',
      message: error.message
    });
  }
});

// Webhook for Razorpay payment confirmation
router.post('/razorpay-webhook', async (req, res) => {
  try {
    const razorpaySignature = req.headers['x-razorpay-signature'];
    const receivedSignature = req.body;
    
    // Verify webhook signature (in production, implement proper verification)
    const isValid = razorpay.validateWebhookSignature(JSON.stringify(receivedSignature), razorpaySignature);
    
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    
    const { order_id, status } = req.body;
    
    // Update order in MongoDB
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    await db.collection('orders').updateOne(
      { _id: order_id },
      { 
        $set: { 
          status: status === 'captured' ? 'confirmed' : status,
          updatedAt: new Date()
        }
      }
    );
    
    console.log('Payment confirmed for order:', order_id, 'Status:', status);
    
    // Notify artisan about confirmed order
    if (status === 'captured') {
      console.log('Artisan notified of confirmed order:', order_id);
    }
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
