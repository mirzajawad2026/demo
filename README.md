# Crafto E-commerce Frontend

A polished, responsive React + Vite frontend inspired by the supplied Crafto reference designs.

## Included
- Premium responsive home page
- Hero slider
- Category browsing
- Product grid, search and sorting
- Product details page
- Functional cart with quantity controls
- Wishlist with add/remove
- Search overlay
- Checkout UI with order confirmation
- Account dashboard
- Order history
- Responsive mobile navigation
- Toast notifications
- Modern purple/lavender visual system
- Framer Motion interactions
- React Router navigation

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Notes

This is a frontend-only implementation. Product data and cart/wishlist state are kept in React state for demonstration. Replace the product array and StoreContext actions with your MERN API calls when the backend is ready.

Remote product imagery uses public Unsplash image URLs so the project stays lightweight. You can replace these URLs with Cloudinary/ImageKit/CDN assets later.

## Suggested production backend integration

- `/api/products`
- `/api/categories`
- `/api/cart`
- `/api/wishlist`
- `/api/orders`
- `/api/auth`
- `/api/users`

The UI is intentionally organized so those API calls can be connected without redesigning the frontend.
