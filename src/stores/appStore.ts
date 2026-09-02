import { create } from 'zustand';
import { Product, CartItem, TransactionLog } from '../types';
import type { User } from 'firebase/auth';

// ─── Initial Products ──────────────────────────────────────────────────────────
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    sku: 'ORG-HASS-AVOCADO-94',
    name: 'Organic Hass Avocados (4-Pack)',
    category: 'Produce',
    price: 6.99,
    stock: 420,
    shardId: 'nam5-shard-04',
    temperature: 3.2,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Verdant Orchards, Salinas Valley',
    rating: 4.9,
    isOrganic: true,
  },
  {
    id: 'prod-02',
    sku: 'ORG-TUSCAN-KALE-12',
    name: 'Wild Tuscan Lacinato Kale',
    category: 'Produce',
    price: 3.49,
    stock: 185,
    shardId: 'nam5-shard-01',
    temperature: 2.8,
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6fa57?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Canyon Creek Organics, Watsonville',
    rating: 4.8,
    isOrganic: true,
  },
  {
    id: 'prod-03',
    sku: 'ORG-HEIRLOOM-TOMATO-88',
    name: 'Rainbow Heirloom Tomatoes (2 lb)',
    category: 'Produce',
    price: 7.99,
    stock: 240,
    shardId: 'nam5-shard-08',
    temperature: 4.1,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'SunRidge Farmstead, Santa Cruz',
    rating: 5.0,
    isOrganic: true,
  },
  {
    id: 'prod-04',
    sku: 'ORG-BERRY-MEDLEY-55',
    name: 'Wild Highland Blackberries & Blueberries',
    category: 'Produce',
    price: 5.99,
    stock: 96,
    shardId: 'nam5-shard-12',
    temperature: 2.5,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Coastal Berries Co., Monterey',
    rating: 4.9,
    isOrganic: true,
  },
  {
    id: 'prod-05',
    sku: 'COLD-GREEN-ELIXIR-09',
    name: 'Cold-Pressed Chlorophyll & Ginger Elixir',
    category: 'Cold-Pressed',
    price: 8.49,
    stock: 310,
    shardId: 'nam5-shard-02',
    temperature: 1.8,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Verdant Micro-Juicery',
    rating: 4.9,
    isOrganic: true,
  },
  {
    id: 'prod-06',
    sku: 'COLD-GOLD-TURMERIC-03',
    name: 'Raw Cold-Pressed Golden Turmeric Citrus',
    category: 'Cold-Pressed',
    price: 7.99,
    stock: 145,
    shardId: 'nam5-shard-06',
    temperature: 2.1,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Verdant Micro-Juicery',
    rating: 4.7,
    isOrganic: true,
  },
  {
    id: 'prod-07',
    sku: 'DAIRY-ALMOND-MILK-77',
    name: 'Sprouted Raw Almond Milk (Unsweetened)',
    category: 'Dairy & Ferments',
    price: 6.29,
    stock: 180,
    shardId: 'nam5-shard-14',
    temperature: 3.0,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Artisan Nut Milk Collective',
    rating: 4.8,
    isOrganic: true,
  },
  {
    id: 'prod-08',
    sku: 'DAIRY-GREEK-YOGURT-31',
    name: 'Grass-Fed Probiotic Cultured Yogurt (24oz)',
    category: 'Dairy & Ferments',
    price: 5.79,
    stock: 215,
    shardId: 'nam5-shard-09',
    temperature: 2.9,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Clover Ridge Dairy, Sonoma',
    rating: 4.9,
    isOrganic: true,
  },
  {
    id: 'prod-09',
    sku: 'PANTRY-SOURDOUGH-BREAD-01',
    name: 'Stone-Milled 72hr Fermented Sourdough',
    category: 'Pantry',
    price: 6.49,
    stock: 75,
    shardId: 'nam5-shard-15',
    temperature: 20.0,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Hearth & Stone Hearth Breads',
    rating: 5.0,
    isOrganic: true,
  },
  {
    id: 'prod-10',
    sku: 'PANTRY-RAW-HONEY-44',
    name: 'Single-Origin Raw Wildflower Honey (16oz)',
    category: 'Pantry',
    price: 11.99,
    stock: 130,
    shardId: 'nam5-shard-11',
    temperature: 21.5,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Coastal Apiaries, Big Sur',
    rating: 4.9,
    isOrganic: true,
  },
  {
    id: 'prod-11',
    sku: 'PANTRY-OLIVE-OIL-22',
    name: 'First Cold-Pressed Extra Virgin Olive Oil',
    category: 'Pantry',
    price: 18.99,
    stock: 88,
    shardId: 'nam5-shard-03',
    temperature: 19.5,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Napa Valley Olive Groves',
    rating: 5.0,
    isOrganic: true,
  },
  {
    id: 'prod-12',
    sku: 'ORG-PORTOBELLO-MUSHROOM-16',
    name: 'Wild Forest King Oyster & Portobello Blend',
    category: 'Produce',
    price: 8.99,
    stock: 110,
    shardId: 'nam5-shard-10',
    temperature: 3.4,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    farmOrigin: 'Redwood Mycological Reserve',
    rating: 4.8,
    isOrganic: true,
  },
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
  cartItems: [
    { product: INITIAL_PRODUCTS[0], quantity: 2 },
    { product: INITIAL_PRODUCTS[4], quantity: 1 },
    { product: INITIAL_PRODUCTS[8], quantity: 1 },
  ],

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
