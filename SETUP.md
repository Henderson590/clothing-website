# Quick Setup Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure PayPal:**
   - Get your PayPal Client ID from [PayPal Developer Dashboard](https://developer.paypal.com/)
   - Open `index.html`
   - Replace `YOUR_CLIENT_ID` with your actual PayPal client ID

3. **Add your images:**
   - Product images: Add URLs to `src/data/products.js` (recommended: 1200x1200px)
   - Hero image: Update `src/pages/Home.jsx` (recommended: 1920x1080px)
   - Look for comments like `// INSERT PRODUCT IMAGE HERE` in the code

4. **Update brand information:**
   - Brand name: Update "Brand" in `src/components/Navigation.jsx`
   - Email: Update email in `src/pages/Support.jsx` (look for `// ADD YOUR BRAND EMAIL HERE`)

5. **Start development:**
   ```bash
   npm run dev
   ```

## Adding Products

Edit `src/data/products.js`:

```javascript
{
  id: 7, // Unique ID
  name: "Your Product Name",
  price: 29.99,
  category: "2025 Collection",
  categoryGroup: "Yearly Collections",
  sizes: ["S", "M", "L", "XL", "2XL"],
  colors: ["Black"], // More colors will be added later
  image: "your-image-url.jpg", // INSERT PRODUCT IMAGE HERE
  featured: false // Set to true to show on homepage
}
```

## Customization

- **Colors**: Edit CSS variables in `src/index.css`
- **Animations**: Adjust transition timings in CSS files
- **Styling**: All components have their own CSS files for easy customization

## Production Build

```bash
npm run build
```

The built files will be in the `dist` folder.

