-- SQL to set up your tables in Supabase SQL Editor

-- 1. Profiles Table (Linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  handle TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('influencer', 'seller', 'customer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Influencers Table (Extending profile if needed, or link it)
CREATE TABLE influencers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID REFERENCES profiles(id),
  handle TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  instagram TEXT,
  followers TEXT,
  earnings TEXT,
  image TEXT,
  banner TEXT,
  bio TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  category TEXT,
  rating DECIMAL DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  image TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  influencer_handle TEXT REFERENCES influencers(handle),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Cart Table (Example for users)
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  product_id BIGINT REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Allow users to read all profiles (public info)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Allow public read access to influencers and products
CREATE POLICY "Allow public read influencers" ON influencers FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);

-- Allow users to manage their own carts
CREATE POLICY "Users can manage their own carts" ON carts
  FOR ALL USING (auth.uid() = user_id);
