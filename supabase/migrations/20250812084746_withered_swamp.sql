/*
  # Create orders table for Catzo Pet Shop

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `customer_name` (text, customer name)
      - `customer_phone` (text, customer phone)
      - `customer_email` (text, customer email)
      - `customer_address` (text, delivery address)
      - `items` (jsonb, ordered items)
      - `total_amount` (numeric, total order amount)
      - `payment_method` (text, payment method)
      - `order_date` (text, order date)
      - `delivery_date` (text, expected delivery date)
      - `status` (text, order status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for users to read their own orders
    - Add policy for users to create orders
    - Add policy for users to update their own orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text NOT NULL,
  customer_address text NOT NULL,
  items jsonb NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  payment_method text DEFAULT 'cod' NOT NULL,
  order_date text NOT NULL,
  delivery_date text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);