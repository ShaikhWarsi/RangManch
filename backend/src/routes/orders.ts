import { Router } from "express";
import supabase from "../db";
import RazorpayService from "../services/razorpayService";

const router = Router();

// Create payment order
router.post("/create-payment", async (req: any, res: any) => {
  try {
    const { amount, currency = 'INR', receipt, customer_name, customer_email, products } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({ success: false, error: "Amount and receipt are required" });
    }

    const order = await RazorpayService.createOrder({
      amount,
      currency,
      receipt,
      notes: {
        customer_name,
        customer_email,
        products: JSON.stringify(products)
      }
    });

    res.json({ 
      success: true, 
      order,
      keyId: RazorpayService.getTestCredentials().keyId,
      testMode: true
    });
  } catch (error: any) {
    console.error('Create payment order error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify payment
router.post("/verify-payment", async (req: any, res: any) => {
  try {
    const { paymentId, orderId, signature, orderData } = req.body;

    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ success: false, error: "Payment ID, Order ID, and signature are required" });
    }

    const isValid = await RazorpayService.verifyPayment(paymentId, orderId, signature);

    if (!isValid) {
      return res.status(400).json({ success: false, error: "Invalid payment signature" });
    }

    // Save order to database
    const { data, error } = await supabase.from('orders').insert([
      {
        order_id: orderId,
        payment_id: paymentId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_contact: orderData.customer_contact,
        products: orderData.products,
        status: 'paid',
        payment_verified: true
      }
    ]).select();

    if (error) throw error;

    res.json({ 
      success: true, 
      order: data?.[0],
      message: "Payment verified and order saved successfully"
    });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get payment details
router.get("/payment/:paymentId", async (req: any, res: any) => {
  try {
    const { paymentId } = req.params;
    const payment = await RazorpayService.fetchPayment(paymentId);
    res.json({ success: true, payment });
  } catch (error: any) {
    console.error('Fetch payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/", async (req: any, res: any) => {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, orders: data || [], count: data?.length || 0 });
  } catch (error: any) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/user/:email", async (req: any, res: any) => {
  try {
    const { email } = req.params;
    const { data, error } = await supabase.from('orders').select('*').eq('customer_email', email).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, orders: data || [], count: data?.length || 0 });
  } catch (error: any) {
    console.error('Get user orders error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:orderId", async (req: any, res: any) => {
  try {
    const { orderId } = req.params;
    const { data, error } = await supabase.from('orders').select('*').eq('order_id', orderId);
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, order: data[0] });
  } catch (error: any) {
    console.error('Get order error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req: any, res: any) => {
  try {
    const { order_id, amount, currency, customer_name, customer_email, customer_contact, products, status } = req.body;
    const { data, error } = await supabase.from('orders').insert([
      { order_id, amount, currency: currency || 'INR', customer_name, customer_email, customer_contact, products, status: status || 'pending' }
    ]).select();
    if (error) throw error;
    res.status(201).json({ success: true, order: data[0] });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.patch("/:orderId", async (req: any, res: any) => {
  try {
    const { orderId } = req.params;
    const { status, shipping_address } = req.body;
    const { data, error } = await supabase.from('orders').update({ status, shipping_address, updated_at: new Date().toISOString() }).eq('order_id', orderId).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, order: data[0] });
  } catch (error: any) {
    console.error('Update order error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;