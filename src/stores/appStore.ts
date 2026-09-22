import { create } from 'zustand';
import { Product, CartItem, TransactionLog } from '../types';
import type { User } from 'firebase/auth';

// ─── Initial Products ──────────────────────────────────────────────────────────
export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "1",
    "sku": "ORG-FRUI-001",
    "name": "Fresh Red Apples",
    "category": "Fruits & Vegetables",
    "price": 149,
    "stock": 28,
    "shardId": "nam5-shard-01",
    "temperature": 3.6,
    "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Crisp, juicy red apples picked at peak sweetness.",
    "rating": 4.8,
    "isOrganic": true,
    "unit": "1 kg",
    "description": "Crisp, juicy red apples picked at peak sweetness.",
    "emoji": "🍎",
    "discount": "17% OFF",
    "oldPrice": 179,
    "reviews": 128,
    "available": true
  },
  {
    "id": "2",
    "sku": "ORG-FRUI-002",
    "name": "Fresh Bananas",
    "category": "Fruits & Vegetables",
    "price": 59,
    "stock": 40,
    "shardId": "nam5-shard-02",
    "temperature": 3.6,
    "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Naturally ripened bananas — great for breakfast bowls and smoothies.",
    "rating": 4.7,
    "isOrganic": true,
    "unit": "1 dozen",
    "description": "Naturally ripened bananas — great for breakfast bowls and smoothies.",
    "emoji": "🍌",
    "discount": "16% OFF",
    "oldPrice": 70,
    "reviews": 96,
    "available": true
  },
  {
    "id": "3",
    "sku": "ORG-FRUI-003",
    "name": "Farm Spinach",
    "category": "Fruits & Vegetables",
    "price": 35,
    "stock": 25,
    "shardId": "nam5-shard-03",
    "temperature": 3.6,
    "image": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Tender farm spinach, washed and ready to cook.",
    "rating": 4.6,
    "isOrganic": true,
    "unit": "250 g",
    "description": "Tender farm spinach, washed and ready to cook.",
    "emoji": "🥬",
    "discount": "22% OFF",
    "oldPrice": 45,
    "reviews": 74,
    "available": true
  },
  {
    "id": "4",
    "sku": "ORG-FRUI-004",
    "name": "Fresh Tomatoes",
    "category": "Fruits & Vegetables",
    "price": 65,
    "stock": 30,
    "shardId": "nam5-shard-04",
    "temperature": 3.6,
    "image": "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Firm red tomatoes for curries, salads and sauces.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "1 kg",
    "description": "Firm red tomatoes for curries, salads and sauces.",
    "emoji": "🍅",
    "discount": "19% OFF",
    "oldPrice": 80,
    "reviews": 84,
    "available": true
  },
  {
    "id": "5",
    "sku": "ORG-DAIR-005",
    "name": "Amul Taaza Milk",
    "category": "Dairy & Eggs",
    "price": 68,
    "stock": 44,
    "shardId": "nam5-shard-05",
    "temperature": 2.4,
    "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Fresh toned milk, pasteurised and packed daily.",
    "rating": 4.8,
    "isOrganic": true,
    "unit": "1 litre",
    "description": "Fresh toned milk, pasteurised and packed daily.",
    "emoji": "🥛",
    "discount": "6% OFF",
    "oldPrice": 72,
    "reviews": 210,
    "available": true
  },
  {
    "id": "6",
    "sku": "ORG-DAIR-006",
    "name": "Farm Fresh Eggs",
    "category": "Dairy & Eggs",
    "price": 92,
    "stock": 27,
    "shardId": "nam5-shard-06",
    "temperature": 2.4,
    "image": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Farm-fresh eggs, graded and packed in a 12-piece tray.",
    "rating": 4.7,
    "isOrganic": true,
    "unit": "12 pieces",
    "description": "Farm-fresh eggs, graded and packed in a 12-piece tray.",
    "emoji": "🥚",
    "discount": "16% OFF",
    "oldPrice": 110,
    "reviews": 156,
    "available": true
  },
  {
    "id": "7",
    "sku": "ORG-DAIR-007",
    "name": "Greek Yogurt",
    "category": "Dairy & Eggs",
    "price": 125,
    "stock": 9,
    "shardId": "nam5-shard-07",
    "temperature": 2.4,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Thick, creamy Greek yogurt with live cultures.",
    "rating": 4.6,
    "isOrganic": true,
    "unit": "400 g",
    "description": "Thick, creamy Greek yogurt with live cultures.",
    "emoji": "🥣",
    "discount": "14% OFF",
    "oldPrice": 145,
    "reviews": 112,
    "available": true
  },
  {
    "id": "8",
    "sku": "ORG-DAIR-008",
    "name": "Butter",
    "category": "Dairy & Eggs",
    "price": 255,
    "stock": 6,
    "shardId": "nam5-shard-08",
    "temperature": 2.4,
    "image": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Rich table butter for toast, cooking and baking.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "500 g",
    "description": "Rich table butter for toast, cooking and baking.",
    "emoji": "🧈",
    "discount": "9% OFF",
    "oldPrice": 280,
    "reviews": 90,
    "available": true
  },
  {
    "id": "9",
    "sku": "ORG-BAKE-009",
    "name": "Butter Croissant",
    "category": "Bakery",
    "price": 180,
    "stock": 14,
    "shardId": "nam5-shard-09",
    "temperature": 20,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Flaky butter croissants, baked fresh each morning.",
    "rating": 4.8,
    "isOrganic": true,
    "unit": "4 pieces",
    "description": "Flaky butter croissants, baked fresh each morning.",
    "emoji": "🥐",
    "discount": "18% OFF",
    "oldPrice": 220,
    "reviews": 65,
    "available": true
  },
  {
    "id": "10",
    "sku": "ORG-BAKE-010",
    "name": "Whole Wheat Bread",
    "category": "Bakery",
    "price": 48,
    "stock": 22,
    "shardId": "nam5-shard-10",
    "temperature": 20,
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Soft whole wheat sliced bread with no added maida.",
    "rating": 4.6,
    "isOrganic": true,
    "unit": "400 g",
    "description": "Soft whole wheat sliced bread with no added maida.",
    "emoji": "🍞",
    "discount": "13% OFF",
    "oldPrice": 55,
    "reviews": 121,
    "available": true
  },
  {
    "id": "11",
    "sku": "ORG-SNAC-011",
    "name": "Classic Potato Chips",
    "category": "Snacks",
    "price": 35,
    "stock": 50,
    "shardId": "nam5-shard-11",
    "temperature": 18.5,
    "image": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Lightly salted, extra-crunchy potato chips.",
    "rating": 4.4,
    "isOrganic": true,
    "unit": "120 g",
    "description": "Lightly salted, extra-crunchy potato chips.",
    "emoji": "🥔",
    "discount": "12% OFF",
    "oldPrice": 40,
    "reviews": 187,
    "available": true
  },
  {
    "id": "12",
    "sku": "ORG-SNAC-012",
    "name": "Roasted Almonds",
    "category": "Snacks",
    "price": 210,
    "stock": 2,
    "shardId": "nam5-shard-12",
    "temperature": 18.5,
    "image": "https://images.pexels.com/photos/7771998/pexels-photo-7771998.jpeg",
    "farmOrigin": "Dry-roasted whole almonds, lightly salted.",
    "rating": 4.8,
    "isOrganic": true,
    "unit": "200 g",
    "description": "Dry-roasted whole almonds, lightly salted.",
    "emoji": "🌰",
    "discount": "16% OFF",
    "oldPrice": 250,
    "reviews": 142,
    "available": true
  },
  {
    "id": "13",
    "sku": "ORG-BEVE-013",
    "name": "Orange Juice",
    "category": "Beverages",
    "price": 110,
    "stock": 26,
    "shardId": "nam5-shard-13",
    "temperature": 2.4,
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "100% orange juice, no added sugar.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "1 litre",
    "description": "100% orange juice, no added sugar.",
    "emoji": "🍊",
    "discount": "15% OFF",
    "oldPrice": 130,
    "reviews": 103,
    "available": true
  },
  {
    "id": "14",
    "sku": "ORG-STAP-014",
    "name": "Basmati Rice",
    "category": "Staples",
    "price": 620,
    "stock": 18,
    "shardId": "nam5-shard-14",
    "temperature": 18.5,
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Long-grain aged basmati rice — fluffy and aromatic.",
    "rating": 4.7,
    "isOrganic": true,
    "unit": "5 kg",
    "description": "Long-grain aged basmati rice — fluffy and aromatic.",
    "emoji": "🍚",
    "discount": "11% OFF",
    "oldPrice": 700,
    "reviews": 133,
    "available": true
  },
  {
    "id": "15",
    "sku": "ORG-HOUS-015",
    "name": "Dishwash Liquid",
    "category": "Household",
    "price": 115,
    "stock": 34,
    "shardId": "nam5-shard-15",
    "temperature": 18.5,
    "image": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Lemon dishwash liquid that cuts grease fast.",
    "rating": 4.4,
    "isOrganic": true,
    "unit": "500 ml",
    "description": "Lemon dishwash liquid that cuts grease fast.",
    "emoji": "🧴",
    "discount": "15% OFF",
    "oldPrice": 135,
    "reviews": 71,
    "available": true
  },
  {
    "id": "16",
    "sku": "ORG-PERS-016",
    "name": "Hand Wash",
    "category": "Personal Care",
    "price": 85,
    "stock": 30,
    "shardId": "nam5-shard-16",
    "temperature": 18.5,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
    "farmOrigin": "Gentle antibacterial hand wash.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "250 ml",
    "description": "Gentle antibacterial hand wash.",
    "emoji": "🧼",
    "discount": "14% OFF",
    "oldPrice": 99,
    "reviews": 89,
    "available": true
  },
  {
    "id": "17",
    "sku": "ORG-FRUI-017",
    "name": "Potatoes",
    "category": "Fruits & Vegetables",
    "price": 40,
    "stock": 59,
    "shardId": "nam5-shard-01",
    "temperature": 3.6,
    "image": "https://images.pexels.com/photos/36400786/pexels-photo-36400786.jpeg",
    "farmOrigin": "Everyday potatoes, good for sabzi, fries and bhaji.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "1 kg",
    "description": "Everyday potatoes, good for sabzi, fries and bhaji.",
    "emoji": "🥔",
    "discount": "17% OFF",
    "oldPrice": 48,
    "reviews": 88,
    "available": true
  },
  {
    "id": "18",
    "sku": "ORG-FRUI-018",
    "name": "Onions",
    "category": "Fruits & Vegetables",
    "price": 35,
    "stock": 54,
    "shardId": "nam5-shard-02",
    "temperature": 3.6,
    "image": "https://images.pexels.com/photos/38088072/pexels-photo-38088072.jpeg",
    "farmOrigin": "Firm red onions with a sharp, sweet bite.",
    "rating": 4.4,
    "isOrganic": true,
    "unit": "1 kg",
    "description": "Firm red onions with a sharp, sweet bite.",
    "emoji": "🧅",
    "discount": "17% OFF",
    "oldPrice": 42,
    "reviews": 102,
    "available": true
  },
  {
    "id": "19",
    "sku": "ORG-FRUI-019",
    "name": "Green Peas",
    "category": "Fruits & Vegetables",
    "price": 45,
    "stock": 29,
    "shardId": "nam5-shard-03",
    "temperature": 3.6,
    "image": "https://images.pexels.com/photos/38435617/pexels-photo-38435617.jpeg",
    "farmOrigin": "Sweet green peas, shelled and cleaned.",
    "rating": 4.6,
    "isOrganic": true,
    "unit": "250 g",
    "description": "Sweet green peas, shelled and cleaned.",
    "emoji": "🫛",
    "discount": "18% OFF",
    "oldPrice": 55,
    "reviews": 61,
    "available": true
  },
  {
    "id": "20",
    "sku": "ORG-BAKE-020",
    "name": "Ladi Pav",
    "category": "Bakery",
    "price": 30,
    "stock": 24,
    "shardId": "nam5-shard-04",
    "temperature": 20,
    "image": "https://images.pexels.com/photos/13424737/pexels-photo-13424737.jpeg",
    "farmOrigin": "Soft, freshly baked Mumbai-style pav.",
    "rating": 4.7,
    "isOrganic": true,
    "unit": "6 pieces",
    "description": "Soft, freshly baked Mumbai-style pav.",
    "emoji": "🍞",
    "discount": "14% OFF",
    "oldPrice": 35,
    "reviews": 140,
    "available": true
  },
  {
    "id": "21",
    "sku": "ORG-STAP-021",
    "name": "Pav Bhaji Masala",
    "category": "Staples",
    "price": 25,
    "stock": 40,
    "shardId": "nam5-shard-05",
    "temperature": 18.5,
    "image": "https://images.pexels.com/photos/4198430/pexels-photo-4198430.jpeg",
    "farmOrigin": "Signature spice blend for authentic pav bhaji.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "50 g",
    "description": "Signature spice blend for authentic pav bhaji.",
    "emoji": "🌶️",
    "discount": "17% OFF",
    "oldPrice": 30,
    "reviews": 77,
    "available": true
  },
  {
    "id": "22",
    "sku": "ORG-STAP-022",
    "name": "Spaghetti Pasta",
    "category": "Staples",
    "price": 110,
    "stock": 20,
    "shardId": "nam5-shard-06",
    "temperature": 18.5,
    "image": "https://images.pexels.com/photos/36346860/pexels-photo-36346860.jpeg",
    "farmOrigin": "Durum wheat spaghetti that stays firm when cooked.",
    "rating": 4.6,
    "isOrganic": true,
    "unit": "500 g",
    "description": "Durum wheat spaghetti that stays firm when cooked.",
    "emoji": "🍝",
    "discount": "15% OFF",
    "oldPrice": 130,
    "reviews": 93,
    "available": true
  },
  {
    "id": "23",
    "sku": "ORG-STAP-023",
    "name": "Pasta Sauce",
    "category": "Staples",
    "price": 130,
    "stock": 16,
    "shardId": "nam5-shard-07",
    "temperature": 18.5,
    "image": "https://media.istockphoto.com/id/1210170349/photo/sweet-and-sour-sauce-isolated-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=7dgZpPTaF7bKzEXnTAoO8OLWawca47445svI27Kyj9I=",
    "farmOrigin": "Slow-cooked tomato and basil sauce.",
    "rating": 4.4,
    "isOrganic": true,
    "unit": "400 g",
    "description": "Slow-cooked tomato and basil sauce.",
    "emoji": "🍅",
    "discount": "13% OFF",
    "oldPrice": 150,
    "reviews": 58,
    "available": true
  },
  {
    "id": "24",
    "sku": "ORG-DAIR-024",
    "name": "Mozzarella Cheese",
    "category": "Dairy & Eggs",
    "price": 120,
    "stock": 12,
    "shardId": "nam5-shard-08",
    "temperature": 2.4,
    "image": "https://images.pexels.com/photos/15781258/pexels-photo-15781258.jpeg",
    "farmOrigin": "Shredded mozzarella that melts and stretches.",
    "rating": 4.7,
    "isOrganic": true,
    "unit": "200 g",
    "description": "Shredded mozzarella that melts and stretches.",
    "emoji": "🧀",
    "discount": "14% OFF",
    "oldPrice": 140,
    "reviews": 81,
    "available": true
  },
  {
    "id": "25",
    "sku": "ORG-STAP-025",
    "name": "Oregano & Chilli Flakes",
    "category": "Staples",
    "price": 45,
    "stock": 35,
    "shardId": "nam5-shard-09",
    "temperature": 18.5,
    "image": "https://images.pexels.com/photos/4871222/pexels-photo-4871222.jpeg",
    "farmOrigin": "Pizza and pasta seasoning sachet.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "20 g",
    "description": "Pizza and pasta seasoning sachet.",
    "emoji": "🌿",
    "discount": "10% OFF",
    "oldPrice": 50,
    "reviews": 47,
    "available": true
  },
  {
    "id": "26",
    "sku": "ORG-STAP-026",
    "name": "Strawberry Jam",
    "category": "Staples",
    "price": 99,
    "stock": 15,
    "shardId": "nam5-shard-10",
    "temperature": 18.5,
    "image": "https://images.pexels.com/photos/26727860/pexels-photo-26727860.jpeg",
    "farmOrigin": "Fruity strawberry jam made with real fruit.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "300 g",
    "description": "Fruity strawberry jam made with real fruit.",
    "emoji": "🍓",
    "discount": "14% OFF",
    "oldPrice": 115,
    "reviews": 69,
    "available": true
  },
  {
    "id": "27",
    "sku": "ORG-STAP-027",
    "name": "Poha",
    "category": "Staples",
    "price": 55,
    "stock": 27,
    "shardId": "nam5-shard-11",
    "temperature": 18.5,
    "image": "https://media.istockphoto.com/id/1292043405/photo/a-bowl-of-kanada-batata-poha.jpg?b=1&s=612x612&w=0&k=20&c=2n4tHKjdoEvFw5E6dpDd-pbO4ffjWwMR5JLlQ3remtI=",
    "farmOrigin": "Thick flattened rice for a quick, light breakfast.",
    "rating": 4.5,
    "isOrganic": true,
    "unit": "500 g",
    "description": "Thick flattened rice for a quick, light breakfast.",
    "emoji": "🍚",
    "discount": "11% OFF",
    "oldPrice": 62,
    "reviews": 54,
    "available": true
  },
  {
    "id": "28",
    "sku": "ORG-FRUI-028",
    "name": "Lemons",
    "category": "Fruits & Vegetables",
    "price": 30,
    "stock": 44,
    "shardId": "nam5-shard-12",
    "temperature": 3.6,
    "image": "https://images.pexels.com/photos/31428126/pexels-photo-31428126.jpeg",
    "farmOrigin": "Juicy lemons, bright and tangy.",
    "rating": 4.4,
    "isOrganic": true,
    "unit": "250 g",
    "description": "Juicy lemons, bright and tangy.",
    "emoji": "🍋",
    "discount": "17% OFF",
    "oldPrice": 36,
    "reviews": 39,
    "available": true
  },
  {
    "id": "29",
    "sku": "ORG-STAP-029",
    "name": "Toor Dal",
    "category": "Staples",
    "price": 165,
    "stock": 22,
    "shardId": "nam5-shard-13",
    "temperature": 18.5,
    "image": "https://images.pexels.com/photos/34940646/pexels-photo-34940646.jpeg",
    "farmOrigin": "Unpolished toor dal for everyday dal tadka.",
    "rating": 4.6,
    "isOrganic": true,
    "unit": "1 kg",
    "description": "Unpolished toor dal for everyday dal tadka.",
    "emoji": "🫘",
    "discount": "11% OFF",
    "oldPrice": 185,
    "reviews": 72,
    "available": true
  },
  {
    "id": "30",
    "sku": "ORG-SNAC-030",
    "name": "Walnuts",
    "category": "Snacks",
    "price": 260,
    "stock": 14,
    "shardId": "nam5-shard-14",
    "temperature": 18.5,
    "image": "https://images.pexels.com/photos/39432877/pexels-photo-39432877.jpeg",
    "farmOrigin": "Crunchy walnut kernels — a great almond alternative.",
    "rating": 4.6,
    "isOrganic": true,
    "unit": "200 g",
    "description": "Crunchy walnut kernels — a great almond alternative.",
    "emoji": "🌰",
    "discount": "13% OFF",
    "oldPrice": 300,
    "reviews": 44,
    "available": true
  }
];

// ─── Store Interface ────────────────────────────────────────────────────────────
interface AppState {
  // Auth
  user: User | null;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;

  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalCartCount: () => number;

  // Modals & Drawers
  isCartOpen: boolean;
  isQueryModalOpen: boolean;
  isConsoleOpen: boolean;
  isAuthModalOpen: boolean;
  isOrderHistoryOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setQueryModalOpen: (open: boolean) => void;
  setConsoleOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setOrderHistoryOpen: (open: boolean) => void;

  // Order Success
  orderSuccessData: {
    txId: string;
    latencyMs: number;
    quorumAck: string;
    items: CartItem[];
    total: number;
  } | null;
  setOrderSuccessData: (data: AppState['orderSuccessData']) => void;

  // Toast notification
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;

  // Transaction Logs (reactive, replaces module-level mutable var)
  logs: TransactionLog[];
  addLog: (log: Omit<TransactionLog, 'id' | 'timestamp'>) => void;
  setLogs: (logs: TransactionLog[]) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // ── Auth ────────────────────────────────────────────────────────────────────
  user: null,
  authLoading: true,
  setUser: (user) => set({ user }),
  setAuthLoading: (authLoading) => set({ authLoading }),

  // ── Products ────────────────────────────────────────────────────────────────
  products: INITIAL_PRODUCTS,
  setProducts: (products) => set({ products }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  // ── Cart ────────────────────────────────────────────────────────────────────
  cartItems: [],

  toastMessage: null,
  setToastMessage: (toastMessage) => set({ toastMessage }),

  addToCart: (product) =>
    set((state) => {
      const existing = state.cartItems.find((item) => item.product.id === product.id);
      const newItems = existing
        ? state.cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { product, quantity: 1 }];

      return {
        cartItems: newItems,
        toastMessage: `Added "${product.name}" to cart`,
      };
    }),

  updateQuantity: (productId, delta) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    })),

  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== productId),
    })),

  clearCart: () => set({ cartItems: [] }),

  totalCartCount: () =>
    get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

  // ── Modals ──────────────────────────────────────────────────────────────────
  isCartOpen: false,
  isQueryModalOpen: false,
  isConsoleOpen: false,
  isAuthModalOpen: false,
  isOrderHistoryOpen: false,
  setCartOpen: (isCartOpen) => set({ isCartOpen }),
  setQueryModalOpen: (isQueryModalOpen) => set({ isQueryModalOpen }),
  setConsoleOpen: (isConsoleOpen) => set({ isConsoleOpen }),
  setAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),
  setOrderHistoryOpen: (isOrderHistoryOpen) => set({ isOrderHistoryOpen }),

  // ── Order Success ───────────────────────────────────────────────────────────
  orderSuccessData: null,
  setOrderSuccessData: (orderSuccessData) => set({ orderSuccessData }),

  // ── Logs ────────────────────────────────────────────────────────────────────
  logs: [
    {
      id: 'tx-init-01',
      timestamp: new Date().toISOString(),
      type: 'RAFT_SYNC',
      target: 'nam5-us-central1-primary',
      status: 'COMMITTED',
      latencyMs: 1.4,
      details: 'Initial Raft leader heartbeat acked across 3 regions',
    },
    {
      id: 'tx-init-02',
      timestamp: new Date().toISOString(),
      type: 'READ',
      target: 'inventory_live',
      status: 'COMMITTED',
      latencyMs: 0.9,
      details: 'Loaded 12 SKU partitions with 0 lock contentions',
    },
  ],

  addLog: (log) =>
    set((state) => ({
      logs: [
        {
          id: `tx-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: new Date().toISOString(),
          ...log,
        },
        ...state.logs.slice(0, 49),
      ],
    })),

  setLogs: (logs) => set({ logs }),
}));
