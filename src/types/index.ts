import type { User as FirebaseUser } from 'firebase/auth';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Produce' | 'Cold-Pressed' | 'Dairy & Ferments' | 'Pantry';
  price: number;
  stock: number;
  shardId: string;
  temperature: number;
  image: string;
  farmOrigin: string;
  rating: number;
  isOrganic: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TransactionLog {
  id: string;
  timestamp: string;
  type: 'READ' | 'WRITE' | '2PC_LOCK' | 'RAFT_SYNC';
  target: string;
  status: 'COMMITTED' | 'PREPARED' | 'ACKED' | 'ABORTED';
  latencyMs: number;
  details: string;
}

export interface Order {
  id: string;
  txId: string;
  userId: string;
  customer: {
    name: string;
    address: string;
    deliverySpeed: string;
  };
  items: {
    id: string;
    sku: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  totalAmount: number;
  status: string;
  protocol: string;
  clusterRegions: string[];
  createdAt: string;
}

export type AppUser = FirebaseUser | null;
