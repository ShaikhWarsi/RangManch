import { Router } from "express";
import supabase from "../db";

const router = Router();

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