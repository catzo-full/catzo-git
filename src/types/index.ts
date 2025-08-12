export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  stock_quantity: number;
  age?: string;
  delivery_days: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  items: CartItem[];
  total_amount: number;
  payment_method: string;
  order_date: string;
  delivery_date: string;
  status: string;
  created_at: string;
}