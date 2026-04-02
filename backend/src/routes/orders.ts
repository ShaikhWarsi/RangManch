import { Router } from "express";
import { MongoClient } from 'mongodb';
import { validateMongoId } from "../middleware/validation";

const router = Router();

// GET /api/orders - Get all orders
router.get("/", async (req, res) => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
    
    res.json({
      success: true,
      orders,
      count: orders.length
    });
    
  } catch (error: any) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get orders',
      message: error?.message || 'Unknown error'
    });
  }
});

// GET /api/orders/user/:userId - Get orders by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const orders = await db.collection('orders').find({ 'customer.email': userId }).sort({ createdAt: -1 }).toArray();
    
    res.json({
      success: true,
      orders,
      count: orders.length
    });
    
  } catch (error: any) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user orders',
      message: error?.message || 'Unknown error'
    });
  }
});

// GET /api/orders/:orderId - Get order by ID
router.get("/:orderId", validateMongoId, async (req: any, res: any) => {
  try {
    const { orderId } = req.params;
    
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const order = await db.collection('orders').findOne({ _id: orderId });
    
    if (order) {
      res.json({
        success: true,
        order,
        message: 'Order found'
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Order not found',
        message: 'Order not found'
      });
    }
    
  } catch (error: any) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get order',
      message: error?.message || 'Unknown error'
    });
  }
});

// PATCH /api/orders/:orderId - Update order status
router.patch("/:orderId", validateMongoId, async (req: any, res: any) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const updatedOrder = await db.collection('orders').updateOne(
      { _id: orderId },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        }
      }
    );
    
    if (updatedOrder.modifiedCount > 0) {
      res.json({
        success: true,
        message: 'Order updated successfully',
        orderId,
        status
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Order not found',
        message: 'Order not found'
      });
    }
    
  } catch (error: any) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update order',
      message: error?.message || 'Unknown error'
    });
  }
});

// DELETE /api/orders/:orderId - Delete order
router.delete("/:orderId", validateMongoId, async (req: any, res: any) => {
  try {
    const { orderId } = req.params;
    
    const client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch');
    await client.connect();
    const db = client.db();
    
    const deletedOrder = await db.collection('orders').deleteOne({ _id: orderId });
    
    if (deletedOrder.deletedCount > 0) {
      res.json({
        success: true,
        message: 'Order deleted successfully',
        orderId
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Order not found',
        message: 'Order not found'
      });
    }
    
  } catch (error: any) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete order',
      message: error?.message || 'Unknown error'
    });
  }
});

export default router;
