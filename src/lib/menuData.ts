export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  desc?: string;
}

export const menuItems: MenuItem[] = [
  // Starters (10 items)
  { id: 1, name: "Potato Tikki", price: 5.50, category: "Starters", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", desc: "Crispy spiced potato patties with chutney" },
  { id: 2, name: "Chicken Pakora", price: 6.00, category: "Starters", image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=400&q=80", desc: "Tender chicken in spiced gram flour batter" },
  { id: 3, name: "Prawn Pakora", price: 7.00, category: "Starters", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80", desc: "Juicy prawns in aromatic spiced batter" },
  { id: 4, name: "Fish Pakora", price: 6.50, category: "Starters", image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80", desc: "Fresh cod in spiced gram flour batter" },
  { id: 5, name: "Paneer Pakora", price: 6.00, category: "Starters", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", desc: "Indian cottage cheese in spiced batter" },
  { id: 6, name: "Vegetable Pakora", price: 4.50, category: "Starters", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80", desc: "Assorted vegetables in light spiced batter" },
  { id: 7, name: "Vegetable Samosa", price: 5.50, category: "Starters", image: "https://images.unsplash.com/photo-1601050690118-42cee9999b68?w=400&q=80", desc: "Crispy pastry with spiced potatoes and peas" },
  { id: 8, name: "Chicken Samosa", price: 6.00, category: "Starters", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80", desc: "Flaky pastry with spiced minced chicken" },
  { id: 9, name: "Indian Dumplings (Vegetarian)", price: 7.50, category: "Starters", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80", desc: "Steamed dumplings with spiced vegetables" },
  { id: 10, name: "Indian Dumplings (Chicken)", price: 8.50, category: "Starters", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80", desc: "Handcrafted dumplings with spiced chicken" },

  // Soups (3 items)
  { id: 11, name: "Chicken Soup", price: 6.00, category: "Soups", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", desc: "Hearty chicken soup with aromatic spices" },
  { id: 12, name: "Prawn Soup", price: 7.50, category: "Soups", image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400&q=80", desc: "Rich prawn soup with herbs" },
  { id: 13, name: "Vegetable Soup", price: 5.00, category: "Soups", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", desc: "Fresh vegetable soup with Indian spices" },

  // Tandoor Specialties (7 items)
  { id: 14, name: "Chicken Tikka", price: 11.50, category: "Tandoor", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", desc: "Marinated chicken pieces cooked in clay oven" },
  { id: 15, name: "Chicken Malai Tikka", price: 12.50, category: "Tandoor", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Creamy marinated chicken tikka" },
  { id: 16, name: "Chicken Tikka Skewer", price: 9.50, category: "Tandoor", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", desc: "Skewered chicken tikka pieces" },
  { id: 17, name: "Tandoori Chicken (Half)", price: 12.50, category: "Tandoor", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", desc: "Half chicken marinated in yogurt and spices" },
  { id: 18, name: "Tandoori Chicken (Full)", price: 20.50, category: "Tandoor", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", desc: "Full chicken marinated in yogurt and spices" },
  { id: 19, name: "Prawn Tikka", price: 16.50, category: "Tandoor", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80", desc: "Spiced prawns cooked in tandoor" },
  { id: 20, name: "Mixed Tandoori Grill", price: 24.50, category: "Tandoor", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", desc: "Assortment of tandoori specialties" },

  // Indian Breads (5 items)
  { id: 21, name: "Plain Naan", price: 2.00, category: "Breads", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Traditional clay oven bread" },
  { id: 22, name: "Butter Naan", price: 2.50, category: "Breads", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Naan brushed with butter" },
  { id: 23, name: "Garlic Naan", price: 3.00, category: "Breads", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Naan with fresh garlic and herbs" },
  { id: 24, name: "Cheese Naan", price: 4.00, category: "Breads", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Naan stuffed with cheese" },
  { id: 25, name: "Chapati / Roti", price: 2.00, category: "Breads", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Whole wheat flatbread" },

  // Salads (3 items)
  { id: 26, name: "Chicken Salad", price: 8.50, category: "Salads", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", desc: "Fresh salad with grilled chicken" },
  { id: 27, name: "Mixed Salad", price: 6.50, category: "Salads", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", desc: "Seasonal mixed vegetables" },
  { id: 28, name: "Chef's Special Salad", price: 11.50, category: "Salads", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80", desc: "Signature chef salad" },

  // Chicken Curries (7 items)
  { id: 29, name: "Chicken Karahi", price: 12.50, category: "Chicken Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Traditional wok-cooked chicken" },
  { id: 30, name: "Chicken Curry", price: 12.50, category: "Chicken Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Classic Indian chicken curry" },
  { id: 31, name: "Butter Chicken", price: 13.50, category: "Chicken Curries", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", desc: "Creamy tomato-based chicken curry" },
  { id: 32, name: "Chicken Tikka Masala", price: 13.50, category: "Chicken Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Chicken tikka in spiced masala sauce" },
  { id: 33, name: "Chicken Jalfrezi", price: 12.50, category: "Chicken Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Spicy stir-fried chicken with peppers" },
  { id: 34, name: "Chicken Lababdar", price: 13.50, category: "Chicken Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Rich and creamy chicken curry" },
  { id: 35, name: "Chicken with Spinach", price: 12.50, category: "Chicken Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Chicken cooked with fresh spinach" },

  // Lamb Curries (4 items)
  { id: 36, name: "Lamb Karahi", price: 16.50, category: "Lamb Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Wok-cooked lamb with spices" },
  { id: 37, name: "Lamb Curry", price: 16.50, category: "Lamb Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Traditional lamb curry" },
  { id: 38, name: "Lamb Jalfrezi", price: 15.50, category: "Lamb Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Spicy lamb with peppers" },
  { id: 39, name: "Lamb with Spinach", price: 14.50, category: "Lamb Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Lamb cooked with fresh spinach" },

  // Vegetarian Curries (7 items)
  { id: 40, name: "Vegetable Curry", price: 12.50, category: "Vegetarian Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Mixed vegetables in spiced gravy" },
  { id: 41, name: "Black Lentils (Dal Makhani)", price: 11.50, category: "Vegetarian Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Creamy black lentils" },
  { id: 42, name: "Tempered Lentils (Dal Tadka)", price: 10.50, category: "Vegetarian Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Yellow lentils with tempering" },
  { id: 43, name: "Shahi Paneer", price: 11.50, category: "Vegetarian Curries", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", desc: "Royal cottage cheese in creamy gravy" },
  { id: 44, name: "Paneer with Peas (Matar Paneer)", price: 10.50, category: "Vegetarian Curries", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", desc: "Cottage cheese with green peas" },
  { id: 45, name: "Palak Paneer", price: 10.50, category: "Vegetarian Curries", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", desc: "Cottage cheese in spinach gravy" },
  { id: 46, name: "Chickpea Masala (Chana Masala)", price: 10.50, category: "Vegetarian Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Spiced chickpea curry" },

  // Biryani (4 items)
  { id: 47, name: "Chicken Biryani", price: 14.50, category: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", desc: "Fragrant rice with marinated chicken" },
  { id: 48, name: "Lamb Biryani", price: 15.50, category: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", desc: "Aromatic rice with tender lamb" },
  { id: 49, name: "Vegetable Biryani", price: 12.50, category: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", desc: "Fragrant rice with mixed vegetables" },
  { id: 50, name: "Prawn Biryani", price: 17.50, category: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", desc: "Aromatic rice with spiced prawns" },

  // Seafood (3 items)
  { id: 51, name: "Fish Curry", price: 15.50, category: "Seafood", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", desc: "Fresh fish in aromatic curry" },
  { id: 52, name: "Prawn Curry", price: 16.50, category: "Seafood", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80", desc: "Juicy prawns in spiced gravy" },
  { id: 53, name: "Prawn Masala", price: 17.50, category: "Seafood", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80", desc: "Prawns in rich masala sauce" },

  // Rice (5 items)
  { id: 54, name: "Plain Rice", price: 4.00, category: "Rice", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=80", desc: "Steamed basmati rice" },
  { id: 55, name: "Cumin Rice", price: 5.00, category: "Rice", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=80", desc: "Basmati rice with cumin" },
  { id: 56, name: "Vegetable Fried Rice", price: 6.00, category: "Rice", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=80", desc: "Fried rice with vegetables" },
  { id: 57, name: "Egg Fried Rice", price: 6.50, category: "Rice", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=80", desc: "Fried rice with egg" },
  { id: 58, name: "Chicken Fried Rice", price: 7.50, category: "Rice", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=80", desc: "Fried rice with chicken" },

  // Desserts (3 items)
  { id: 59, name: "Gulab Jamun", price: 5.50, category: "Desserts", image: "https://images.unsplash.com/photo-1666196353539-b7374c1bfe4a?w=400&q=80", desc: "Deep-fried milk balls in sugar syrup" },
  { id: 60, name: "Rice Pudding (Arroz Doce)", price: 5.00, category: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", desc: "Creamy Portuguese-style rice pudding" },
  { id: 61, name: "Carrot Halwa", price: 6.00, category: "Desserts", image: "https://images.unsplash.com/photo-1666196353539-b7374c1bfe4a?w=400&q=80", desc: "Sweet carrot dessert with nuts" },
];

export const allCategories = [
  "All",
  "Starters",
  "Soups",
  "Tandoor",
  "Breads",
  "Salads",
  "Chicken Curries",
  "Lamb Curries",
  "Vegetarian Curries",
  "Biryani",
  "Seafood",
  "Rice",
  "Desserts",
];