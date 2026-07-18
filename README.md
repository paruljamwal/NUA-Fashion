# NUA Fashion

A modern fashion e-commerce application built with React and Vite. The project focuses on delivering a clean shopping experience while implementing common e-commerce features such as product browsing, variant selection, shopping cart management, and a simple checkout flow.

---

## Live Demo

https://nua-fashion.netlify.app

---

## Repository

https://github.com/paruljamwal/NUA-Fashion

---

## Screenshots

### Home

![Home](./screenshots/home.png)

### Product Search

![Search](./screenshots/search.png)

### Search Empty State

![Search Empty](./screenshots/search-empty.png)

### Product Details

![Product Details](./screenshots/product-details.png)

### Add to Cart

![Add to Cart](./screenshots/add-to-cart.png)

### Shopping Cart

![Cart](./screenshots/cart.png)

### Empty Cart

![Empty Cart](./screenshots/empty-cart.png)

### Compare Recently Viewed

![Compare Recently Viewed](./screenshots/compare-recently-viewed.png)

### Checkout

![Checkout](./screenshots/checkout.png)

---

## Performance (Before Optimization)

Baseline Lighthouse, build, and network results captured before any performance work.

### Lighthouse — Mobile

![Lighthouse Mobile Before](./screenshots/lighthouse-mobile-before.png)

![Lighthouse Mobile Metrics Before](./screenshots/lighthouse-mobile-before-metrics.png)

### Lighthouse — Desktop

![Lighthouse Desktop Before](./screenshots/lighthouse-desktop-before.png)

![Lighthouse Desktop Diagnostics Before](./screenshots/lighthouse-desktop-before-diagnostics.png)

### Production Build

![Build Before](./screenshots/build-before.png)

### Chunking / Network

![Chunking Before](./screenshots/chunking-before.png)

---

## Performance (After Optimization)

Lighthouse and build results after performance improvements (lazy routes, code splitting, and related optimizations).

### Lighthouse — Desktop

![Lighthouse Desktop After](./screenshots/lighthouse-desktop-after.png)

![Lighthouse Desktop Metrics After](./screenshots/lighthouse-desktop-after-metrics.png)

### Lighthouse — Mobile

![Lighthouse Mobile After](./screenshots/lighthouse-mobile-after.png)

![Lighthouse Mobile Metrics After](./screenshots/lighthouse-mobile-after-metrics.png)

### Production Build

![Build After](./screenshots/build-after.png)

---

## Features

- Product listing
- Product search
- Category filtering
- Client-side pagination
- Product details page
- Size & color variants
- Deep-linkable product variants using URL query parameters
- Shopping cart
- Branded empty cart state with NUA illustration
- Quick Add drawer
- Quantity management
- Mock async Add to Cart flow
- Loading and error states
- Checkout page
- Compare recently viewed products
- Responsive design
- Lighthouse optimization

---

## Tech Stack

- React
- Vite
- React Router
- Context API
- SCSS

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/paruljamwal/NUA-Fashion.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## Folder Structure

```text
src
│
├── assets
├── components
├── context
├── data
├── pages
├── services
├── styles
├── utils
├── App.jsx
└── main.jsx
```

---

## Design Decisions

A few implementation highlights:

- React Context is used for shared cart state.
- Local component state manages page-specific UI.
- Product variants are synchronized with URL query parameters for deep linking.
- Client-side pagination is used due to the small dataset.
- A mock async API simulates the Add to Cart flow.
- The empty cart uses a lightweight custom SVG illustration aligned with the NUA brand.

More details are available in **DECISIONS.md**.

---

## Future Improvements

- Real backend integration
- Authentication
- Wishlist
- Product recommendations
- Recently viewed products
- Unit & integration tests
- Image optimization
- Server-side pagination

---

## Author

**Parul Jamwal**
