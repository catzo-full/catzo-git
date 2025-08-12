/*
  # Create products table for Catzo Pet Shop

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `category` (text, product category)
      - `price` (numeric, product price)
      - `description` (text, product description)
      - `image_url` (text, product image URL)
      - `stock_quantity` (integer, available stock)
      - `age` (text, age information for pets)
      - `delivery_days` (integer, delivery time in days)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
    - Add policy for authenticated users to insert/update products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  price numeric(10,2) NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  stock_quantity integer DEFAULT 0 NOT NULL,
  age text,
  delivery_days integer DEFAULT 3 NOT NULL,
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
('Persian Cat', 'cats', 15000.00, 'Beautiful Persian cat with long silky fur. Very friendly and well-trained.', 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400', 3, '2 months', 2),
('British Shorthair Kitten', 'cats', 12000.00, 'Adorable British Shorthair kitten with blue-grey coat. Perfect family pet.', 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=400', 2, '3 months', 2),
('Love Birds Pair', 'birds', 2500.00, 'Beautiful pair of love birds. Very social and colorful. Includes basic care guide.', 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400', 5, '6 months', 1),
('Cockatiel', 'birds', 3500.00, 'Hand-tamed cockatiel with beautiful crest. Very intelligent and can learn to whistle.', 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400', 3, '4 months', 1),
('Goldfish', 'fish', 150.00, 'Healthy goldfish perfect for beginners. Easy to care for and very hardy.', 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=400', 20, 'Adult', 1),
('Betta Fish', 'fish', 300.00, 'Colorful Betta fish with flowing fins. Comes in various colors.', 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=400', 15, 'Adult', 1),
('Premium Cat Food', 'food', 850.00, 'High-quality dry cat food with real chicken. 2kg pack for adult cats.', 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=400', 25, null, 1),
('Bird Seed Mix', 'food', 450.00, 'Nutritious seed mix for all types of birds. 1kg pack with vitamins.', 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=400', 30, null, 1),
('Fish Food Flakes', 'food', 250.00, 'Premium fish food flakes for tropical fish. 200g container.', 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=400', 40, null, 1),
('Aquarium Filter', 'equipment', 1200.00, 'High-efficiency aquarium filter for tanks up to 50 gallons. Includes filter media.', 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=400', 8, null, 2),
('Bird Cage Large', 'cages', 3500.00, 'Spacious bird cage suitable for medium to large birds. Includes perches and feeders.', 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400', 5, null, 3),
('Cat Carrier', 'equipment', 1800.00, 'Comfortable and secure cat carrier for travel. Airline approved design.', 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400', 10, null, 2);