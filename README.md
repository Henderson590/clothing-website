# Modern Minimalist Clothing Brand Website

A clean, modern, and minimalistic clothing brand website built with React, featuring smooth animations, a shopping cart system, and PayPal integration.

## Features

- 🎨 **Minimalist Design**: Charcoal gray header with cream accents
- 🧭 **Smooth Navigation**: Hamburger menu with slide-in animation
- 🛍️ **Shop Page**: Category filtering and floating product cards
- 🛒 **Shopping Cart**: Full cart functionality with quantity management
- 💳 **PayPal Integration**: Secure checkout powered by PayPal
- 📱 **Mobile Responsive**: Fully responsive design for all devices
- ✨ **Smooth Animations**: Ease-in/ease-out transitions throughout

## Tech Stack

- React 18
- React Router DOM
- Vite
- CSS3 with CSS Variables
- PayPal SDK

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Update PayPal Client ID:
   - Open `index.html`
   - Replace `YOUR_CLIENT_ID` with your actual PayPal client ID in the PayPal SDK script tag

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.jsx   # Header with hamburger menu
│   ├── ProductCard.jsx  # Product card component
│   ├── ProductModal.jsx # Product detail modal
│   ├── Cart.jsx         # Shopping cart overlay
│   └── PayPalCheckout.jsx # PayPal integration
├── pages/               # Page components
│   ├── Home.jsx         # Home page with hero section
│   ├── Shop.jsx         # Shop page with products
│   └── Support.jsx      # Contact/Support page
├── context/             # React context
│   └── CartContext.jsx  # Cart state management
├── data/                # Data files
│   └── products.js      # Product data structure
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## Customization

### Adding Products

Edit `src/data/products.js` to add or modify products:

```javascript
{
  id: 1,
  name: "Product Name",
  price: 29.99,
  category: "2025 Collection",
  categoryGroup: "Yearly Collections",
  sizes: ["S", "M", "L", "XL", "2XL"],
  colors: ["Black"],
  image: "", // Add image URL here
  featured: true // Set to true to show on homepage
}
```

### Adding Images

Replace image placeholders with your images:
- Product images: Recommended size 1200x1200px
- Hero image: Recommended size 1920x1080px
- Look for comments like `// INSERT PRODUCT IMAGE HERE` in the code

### Updating Brand Email

In `src/pages/Support.jsx`, replace the placeholder email:
```javascript
{/* ADD YOUR BRAND EMAIL HERE */}
yourbrand@email.com
```

### PayPal Configuration

1. Get your PayPal Client ID from the [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Update the script tag in `index.html`:
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_ACTUAL_CLIENT_ID&currency=USD"></script>
```

## Color Scheme

- Charcoal Gray: `#1a1a1a`
- Cream Accent: `#f5f5f0`
- White: `#ffffff`

Colors are defined as CSS variables in `src/index.css` for easy customization.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

