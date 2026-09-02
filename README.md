# Verdant Core (v2.0)

> **Enterprise-Grade Distributed Organic Grocery Platform**  
> Powered by an Active-Active Multi-Region Database Management System (ADBMS) simulation, Two-Phase Commit (2PC) serializable locking, and Google Cloud Firestore.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 🌟 Key Features

- **Distributed 2-Phase Commit (2PC) Checkout**:
  - Phase 1 (Prepare): Acquires simulated exclusive lease locks across sharded inventory partitions with TTL countdowns.
  - Phase 2 (Commit): Executes atomic distributed order writes using Firestore's native `runTransaction()` engine with server-side stock validation to guarantee zero overselling.
- **Real-Time Active ADBMS Telemetry Dock**:
  - Live floating console inspecting multi-region Firestore streaming RPCs (nam5 us-central1).
  - Inspect live collection records (`inventory_live`, `raft_consensus`, `order_locks_2pc`).
  - Read/write throughput counters, replication ping matrices, and composite index status.
- **ADBMS Query & Analysis Workbench**:
  - Query Explorer: Ad-hoc SQL/NoSQL distributed query benchmarking with parallel shard execution plans.
  - Telemetry & Heatmap: 16-shard load balancing visualization and multi-region consensus health.
  - Live Mutation Stream: Reactive audit trail powered by a centralized Zustand store.
  - Seeding Utility: Batch populates 12 curated organic SKUs into Firestore.
- **Firebase Authentication**:
  - Seamless Google Sign-In integration protecting write operations and checkout flows.
  - Order history tracking bound to user UIDs.
- **Instant Client-Side Fuzzy Search (`⌘K`)**:
  - Real-time catalog filtering across names, categories, SKUs, and farm origins.
- **Design & Aesthetics**:
  - Ultra-modern dark glassmorphism styling (`#060D09` background, emerald accents, Plus Jakarta Sans).
  - Scroll-driven 3-stage parallax background system (Fresh Harvest, Cold Chain, Micro-Fulfillment).
  - Shimmer image skeletons eliminating layout shifts.
  - WCAG AA accessibility compliance with keyboard navigation and `Escape` handlers.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript 5.5, Vite 5
- **Styling**: Tailwind CSS 3.4, PostCSS, Lucide React Icons
- **State Management**: Zustand 4.5
- **Backend / Database**: Google Cloud Firestore, Firebase Authentication
- **Protocol Simulation**: Two-Phase Commit (2PC) & Raft Consensus (nam5 multi-region cluster)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Yogesh994501/capstone5.git
cd capstone5
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure your Firebase configuration keys are present:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build & Typecheck
```bash
npm run typecheck
npm run build
```

---

## 🔒 Security Rules

Deploy the included `firestore.rules` to lock down your Firestore instance:
```bash
firebase deploy --only firestore:rules
```

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inventory_live/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{orderId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 📄 License
MIT License. Created by Yogesh994501 for Capstone Project.
