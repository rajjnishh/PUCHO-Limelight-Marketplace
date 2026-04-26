export const products = [
  // Fashion
  {
    id: 1,
    name: "Oversized Graphic T-Shirt",
    price: 999,
    category: "Fashion",
    rating: 4.5,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    slug: "oversized-graphic-t-shirt",
    description: "Stylish and comfortable oversized graphic tee made from 100% premium cotton.",
    tags: ["Cotton", "Streetwear", "Oversized", "Unisex"],
    variations: {
      colors: [
        { name: 'Pure White', value: '#FFFFFF', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop' },
        { name: 'Onyx Black', value: '#1A1A1A', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop', priceModifier: 100 },
        { name: 'Soft Peach', value: '#FFDAB9', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    influencer: { name: "Komal Pandey", handle: "komalpandeyofficial", image: "https://picsum.photos/seed/komal/100/100" }
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 1999,
    category: "Fashion",
    rating: 4.4,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
    slug: "slim-fit-denim-jeans",
    description: "Classic slim-fit denim jeans with a modern stretch for all-day comfort.",
    influencer: { name: "Komal Pandey", handle: "komalpandeyofficial", image: "https://picsum.photos/seed/komal/100/100" }
  },
  {
    id: 3,
    name: "Women’s Floral Maxi Dress",
    price: 2499,
    category: "Fashion",
    rating: 4.7,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
    slug: "womens-floral-maxi-dress",
    description: "Beautiful floral print maxi dress, perfect for summer outings and brunches.",
    influencer: { name: "Komal Pandey", handle: "komalpandeyofficial", image: "https://picsum.photos/seed/komal/100/100" }
  },
  {
    id: 4,
    name: "Casual Sneakers",
    price: 2999,
    category: "Fashion",
    rating: 4.6,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
    slug: "casual-sneakers",
    description: "Versatile casual sneakers that pair perfectly with jeans or shorts.",
    influencer: { name: "Komal Pandey", handle: "komalpandeyofficial", image: "https://picsum.photos/seed/komal/100/100" }
  },

  // Electronics
  {
    id: 5,
    name: "Wireless Bluetooth Earbuds",
    price: 2499,
    category: "Electronics",
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
    slug: "wireless-bluetooth-earbuds",
    description: "Crystal clear sound with noise cancellation and up to 20 hours of battery life.",
    tags: ["Wireless", "Audio", "Bluetooth", "Music"],
    variations: {
      colors: [
        { name: 'Carbon Black', value: '#1C1C1C', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop' },
        { name: 'Glacier White', value: '#F5F5F7', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop', priceModifier: 500 },
        { name: 'Rose Gold', value: '#E0BFB8', image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=800&auto=format&fit=crop' }
      ]
    },
    influencer: { name: "Marques Brownlee", handle: "mkbhd", image: "https://picsum.photos/seed/mkbhd/100/100" }
  },
  {
    id: 6,
    name: "Smartwatch Series X",
    price: 4999,
    category: "Electronics",
    rating: 4.7,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
    slug: "smartwatch-series-x",
    description: "Advanced fitness tracking, heart rate monitoring, and always-on display.",
    influencer: { name: "Marques Brownlee", handle: "mkbhd", image: "https://picsum.photos/seed/mkbhd/100/100" }
  },
  {
    id: 7,
    name: "Portable Power Bank 20000mAh",
    price: 1499,
    category: "Electronics",
    rating: 4.5,
    reviews: 280,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop",
    slug: "portable-power-bank-20000mah",
    description: "High-capacity power bank with fast charging capabilities for all your devices.",
    influencer: { name: "Marques Brownlee", handle: "mkbhd", image: "https://picsum.photos/seed/mkbhd/100/100" }
  },
  {
    id: 8,
    name: "Noise Cancelling Headphones",
    price: 8999,
    category: "Electronics",
    rating: 4.9,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    slug: "noise-cancelling-headphones",
    description: "Immersive sound experience with superior active noise cancellation.",
    influencer: { name: "Marques Brownlee", handle: "mkbhd", image: "https://picsum.photos/seed/mkbhd/100/100" }
  },

  // Beauty
  {
    id: 9,
    name: "Vitamin C Face Serum",
    price: 799,
    category: "Beauty",
    rating: 4.6,
    reviews: 560,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop",
    slug: "vitamin-c-face-serum",
    description: "Brighten and rejuvenate your skin with our powerful Vitamin C serum.",
    influencer: { name: "Huda Kattan", handle: "hudabeauty", image: "https://picsum.photos/seed/huda/100/100" }
  },
  {
    id: 10,
    name: "Matte Liquid Lipstick Set",
    price: 1299,
    category: "Beauty",
    rating: 4.5,
    reviews: 240,
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=800&auto=format&fit=crop",
    slug: "matte-liquid-lipstick-set",
    description: "Long-lasting matte liquid lipsticks in 6 gorgeous shades.",
    influencer: { name: "Huda Kattan", handle: "hudabeauty", image: "https://picsum.photos/seed/huda/100/100" }
  },
  {
    id: 11,
    name: "Sunscreen SPF 50 PA+++",
    price: 599,
    category: "Beauty",
    rating: 4.8,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=800&auto=format&fit=crop",
    slug: "sunscreen-spf-50-pa",
    description: "Broad-spectrum protection without any white cast. Perfect for daily wear.",
    influencer: { name: "Huda Kattan", handle: "hudabeauty", image: "https://picsum.photos/seed/huda/100/100" }
  },
  {
    id: 12,
    name: "Hair Growth Oil",
    price: 499,
    category: "Beauty",
    rating: 4.4,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop",
    slug: "hair-growth-oil",
    description: "Natural blend of oils to strengthen hair and promote healthy growth.",
    influencer: { name: "Huda Kattan", handle: "hudabeauty", image: "https://picsum.photos/seed/huda/100/100" }
  },

  // Home Decor
  {
    id: 13,
    name: "LED Wall Lights",
    price: 1599,
    category: "Home Decor",
    rating: 4.6,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop",
    slug: "led-wall-lights",
    description: "Modern LED wall lights to enhance the ambiance of your living space.",
    influencer: { name: "Mr. Kate", handle: "mrkate", image: "https://picsum.photos/seed/mrkate/100/100" }
  },
  {
    id: 14,
    name: "Minimalist Table Lamp",
    price: 1299,
    category: "Home Decor",
    rating: 4.7,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop",
    slug: "minimalist-table-lamp",
    description: "Sleek and minimalist table lamp for your study or bedside table.",
    influencer: { name: "Mr. Kate", handle: "mrkate", image: "https://picsum.photos/seed/mrkate/100/100" }
  },
  {
    id: 15,
    name: "Decorative Wall Frames Set",
    price: 899,
    category: "Home Decor",
    rating: 4.5,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
    slug: "decorative-wall-frames-set",
    description: "Set of 3 artistic wall frames to add personality to your walls.",
    influencer: { name: "Mr. Kate", handle: "mrkate", image: "https://picsum.photos/seed/mrkate/100/100" }
  },
  {
    id: 16,
    name: "Artificial Indoor Plants",
    price: 699,
    category: "Home Decor",
    rating: 4.8,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop",
    slug: "artificial-indoor-plants",
    description: "High-quality artificial plants that look real and require zero maintenance.",
    influencer: { name: "Mr. Kate", handle: "mrkate", image: "https://picsum.photos/seed/mrkate/100/100" }
  },

  // Fitness
  {
    id: 17,
    name: "Resistance Bands Set",
    price: 599,
    category: "Fitness",
    rating: 4.6,
    reviews: 670,
    image: "https://images.unsplash.com/photo-1517438984742-1262db08379e?q=80&w=800&auto=format&fit=crop",
    slug: "resistance-bands-set",
    description: "Set of 5 resistance levels, ideal for home workouts and mobility.",
    tags: ["Fitness", "Home Workout", "Strength", "Training"],
    influencer: { name: "Sahil Khan", handle: "sahilkhan", image: "https://picsum.photos/seed/sahil/100/100" }
  },
  {
    id: 18,
    name: "Adjustable Dumbbells",
    price: 4999,
    category: "Fitness",
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?q=80&w=800&auto=format&fit=crop",
    slug: "adjustable-dumbbells",
    description: "Space-saving adjustable dumbbells for a complete upper body workout.",
    influencer: { name: "Sahil Khan", handle: "sahilkhan", image: "https://picsum.photos/seed/sahil/100/100" }
  },
  {
    id: 19,
    name: "Yoga Mat Anti-Slip",
    price: 899,
    category: "Fitness",
    rating: 4.7,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop",
    slug: "yoga-mat-anti-slip",
    description: "Extra thick, eco-friendly anti-slip mat for yoga and pilates.",
    influencer: { name: "Sahil Khan", handle: "sahilkhan", image: "https://picsum.photos/seed/sahil/100/100" }
  },
  {
    id: 20,
    name: "Skipping Rope",
    price: 299,
    category: "Fitness",
    rating: 4.5,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=800&auto=format&fit=crop",
    slug: "skipping-rope",
    description: "High-speed skipping rope with comfortable foam handles.",
    influencer: { name: "Sahil Khan", handle: "sahilkhan", image: "https://picsum.photos/seed/sahil/100/100" }
  },

  // Grocery (Food)
  {
    id: 21,
    name: "Organic Basmati Rice",
    price: 499,
    category: "Grocery (Food)",
    rating: 4.8,
    reviews: 1500,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
    slug: "organic-basmati-rice",
    description: "Long-grain aromatic basmati rice, grown organically for pure taste.",
    tags: ["Organic", "Healthy", "Kitchen", "Pantry"],
    influencer: { name: "Ranveer Brar", handle: "ranveer.brar", image: "https://picsum.photos/seed/ranveer/100/100" }
  },
  {
    id: 22,
    name: "Cold Pressed Mustard Oil",
    price: 299,
    category: "Grocery (Food)",
    rating: 4.7,
    reviews: 840,
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop",
    slug: "cold-pressed-mustard-oil",
    description: "Pure and nutrient-rich cold-pressed mustard oil for traditional cooking.",
    influencer: { name: "Ranveer Brar", handle: "ranveer.brar", image: "https://picsum.photos/seed/ranveer/100/100" }
  },
  {
    id: 23,
    name: "Dry Fruits Combo Pack",
    price: 1299,
    category: "Grocery (Food)",
    rating: 4.9,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=800&auto=format&fit=crop",
    slug: "dry-fruits-combo-pack",
    description: "Premium mix of almonds, cashews, walnuts, and raisins.",
    influencer: { name: "Ranveer Brar", handle: "ranveer.brar", image: "https://picsum.photos/seed/ranveer/100/100" }
  },
  {
    id: 24,
    name: "Instant Oats",
    price: 199,
    category: "Grocery (Food)",
    rating: 4.6,
    reviews: 950,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
    slug: "instant-oats",
    description: "Quick and healthy breakfast option, rich in fiber.",
    influencer: { name: "Sahil Khan", handle: "sahilkhan", image: "https://picsum.photos/seed/sahil/100/100" }
  },

  // Jewellery
  {
    id: 25,
    name: "Gold Plated Necklace Set",
    price: 3499,
    category: "Jewellery",
    rating: 4.7,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    slug: "gold-plated-necklace-set",
    description: "Elegant gold-plated necklace set with intricate traditional designs.",
    influencer: { name: "Masoom Minawala", handle: "masoomminawala", image: "https://picsum.photos/seed/masoom/100/100" }
  },
  {
    id: 26,
    name: "Silver Hoop Earrings",
    price: 799,
    category: "Jewellery",
    rating: 4.6,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    slug: "silver-hoop-earrings",
    description: "Classic silver hoop earrings for a minimalist and chic look.",
    influencer: { name: "Masoom Minawala", handle: "masoomminawala", image: "https://picsum.photos/seed/masoom/100/100" }
  },
  {
    id: 27,
    name: "Diamond Style Ring",
    price: 1599,
    category: "Jewellery",
    rating: 4.8,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    slug: "diamond-style-ring",
    description: "Sparkling diamond-style adjustable ring to add a touch of grace.",
    influencer: { name: "Masoom Minawala", handle: "masoomminawala", image: "https://picsum.photos/seed/masoom/100/100" }
  },
  {
    id: 28,
    name: "Pearl Bracelet",
    price: 1299,
    category: "Jewellery",
    rating: 4.7,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop",
    slug: "pearl-bracelet",
    description: "Timeless pearl bracelet that complements any modern or traditional outfit.",
    influencer: { name: "Masoom Minawala", handle: "masoomminawala", image: "https://picsum.photos/seed/masoom/100/100" }
  }
];
