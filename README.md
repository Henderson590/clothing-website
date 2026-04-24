## Tech Stack

- React 18
- React Router DOM
- Vite
- CSS3 with CSS Variables
- PayPal SDK

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
- Product images: Crop images to a 4:5 ratio
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

This project is protected under copyright of 806 Threads and may not be used for personal or commerical use.

