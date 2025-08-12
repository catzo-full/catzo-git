import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_2hlxpld';
const TEMPLATE_ID = 'template_jvl4q6d';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const PRIVATE_KEY = '1_RBYI_7HqfYiFHRwp-bJ';

emailjs.init(PUBLIC_KEY);

export const sendOrderConfirmation = async (orderData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderItems: string;
  totalAmount: number;
  deliveryDate: string;
  orderId: string;
}) => {
  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_name: orderData.customerName,
        to_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        order_items: orderData.orderItems,
        total_amount: orderData.totalAmount,
        delivery_date: orderData.deliveryDate,
        order_id: orderData.orderId,
        shop_phone: '8637498818',
        shop_email: 'catzowithao@gmail.com',
      },
      PRIVATE_KEY
    );
    return result;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};