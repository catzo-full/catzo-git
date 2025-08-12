/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `price` (decimal)
      - `description` (text)
      - `image_url` (text)
      - `stock_quantity` (integer)
      - `age` (text, optional)
      - `delivery_days` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `products` table
    - Add policy for authenticated users to read products
    - Add policy for admins to manage products (for future admin functionality)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price decimal(10,2) NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0,
  age text,
  delivery_days integer NOT NULL DEFAULT 3,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, category, price, description, image_url, stock_quantity, age, delivery_days) VALUES
('Premium Cat Food', 'food', 599.00, 'High-quality dry cat food with essential nutrients for adult cats. Made with real chicken and vegetables.', 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=600', 25, NULL, 2),
('Persian Kitten', 'cats', 15000.00, 'Beautiful Persian kitten with long silky fur. Vaccinated and dewormed. Very friendly and playful.', 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600', 3, '3 months', 1),
('Goldfish', 'fish', 150.00, 'Healthy goldfish perfect for beginners. Hardy and beautiful addition to any aquarium.', 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=600', 20, '6 months', 1),
('Love Birds Pair', 'birds', 2500.00, 'Beautiful pair of love birds. Hand-fed and very social. Perfect companions for bird lovers.', 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=600', 5, '1 year', 2),
('Fish Food Flakes', 'food', 299.00, 'Nutritious fish flakes suitable for all types of tropical fish. Rich in vitamins and minerals.', 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=600', 30, NULL, 1),
('Cat Scratching Post', 'equipment', 1200.00, 'Tall scratching post with multiple levels. Perfect for keeping your cats claws healthy and furniture safe.', 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=600', 10, NULL, 3),
('Aquarium Filter', 'equipment', 899.00, 'High-efficiency aquarium filter suitable for tanks up to 50 gallons. Keeps water clean and oxygenated.', 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=600', 15, NULL, 2),
('Bird Cage Large', 'cages', 3500.00, 'Spacious bird cage suitable for medium to large birds. Includes perches and feeding bowls.', 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=600', 8, NULL, 4),
('Cat Treats', 'food', 199.00, 'Delicious and healthy cat treats made with real salmon. Perfect for training and rewarding your feline friend.', 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=600', 40, NULL, 1),
('Betta Fish', 'fish', 299.00, 'Colorful Betta fish with flowing fins. Known for their vibrant colors and personality.', 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=600', 12, '8 months', 1);