import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXXXXXXXX',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_test_secret_here'
});

export interface PaymentOrder {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, any>;
}

export interface PaymentResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, any>;
  created_at: number;
}

class RazorpayService {
  async createOrder(orderData: PaymentOrder): Promise<PaymentResponse> {
    try {
      const order = await razorpay.orders.create({
        amount: orderData.amount * 100, // Convert to paise
        currency: orderData.currency || 'INR',
        receipt: orderData.receipt,
        notes: orderData.notes || {},
        payment_capture: true
      });

      return order as unknown as PaymentResponse;
    } catch (error) {
      console.error('Razorpay order creation error:', error);
      throw new Error('Failed to create payment order');
    }
  }

  async verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean> {
    try {
      const crypto = require('crypto');
      const secret = process.env.RAZORPAY_KEY_SECRET || 'your_test_secret_here';
      
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      return generatedSignature === signature;
    } catch (error) {
      console.error('Payment verification error:', error);
      return false;
    }
  }

  async fetchPayment(paymentId: string): Promise<any> {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return payment;
    } catch (error) {
      console.error('Fetch payment error:', error);
      throw new Error('Failed to fetch payment details');
    }
  }

  getTestCredentials(): { keyId: string; message: string } {
    return {
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXXXXXXXX',
      message: 'Using test credentials - no actual charges will be made'
    };
  }
}

export default new RazorpayService();
