# Taco Bel — React App (Vite)

Simple Vite + React scaffold for a taco shop showcasing menu, hours, and an online ordering cart (checkout placeholder).

Quick start

```bash
cd path/to/tacobel
npm install
npm run dev
```

Files of interest

- [src/App.jsx](src/App.jsx) — main app and navigation
- [src/components/Menu.jsx](src/components/Menu.jsx) — menu listing
- [src/components/Order.jsx](src/components/Order.jsx) — cart and summary
- [src/components/Hours.jsx](src/components/Hours.jsx) — store hours
- [src/data/menu.json](src/data/menu.json) — sample menu data

Next steps

- Add backend or payment integration for real checkout
- Add routing (`react-router`) if you prefer URL routes
- Add form fields for customer info and order submission

Backend

The `server` folder contains a simple TypeScript + Express API that exposes REST endpoints used by the frontend.

Run the server (from the project root):

```bash
cd server
npm install
npm run dev
```

Available endpoints:
- `GET /menu` — returns the menu JSON
- `POST /orders` — create a new order (body: `{ items: [...] }`)
- `GET /orders/:id` — fetch order by id
- `POST /orders/:id/checkout` — simulate payment and mark order paid

The server uses in-memory storage for orders; for production replace with a DB and integrate payment processor.
