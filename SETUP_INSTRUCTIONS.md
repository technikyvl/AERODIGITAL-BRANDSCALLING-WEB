# Setup Instructions for React Globe Component

This project has been set up to support the React Globe component with shadcn/ui, Tailwind CSS, and TypeScript.

## Prerequisites

Make sure you have Node.js (version 18 or higher) installed on your system.

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Additional Dependencies**
   ```bash
   npm install tailwindcss-animate
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000` to see the Globe component in action.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page with Globe demo
├── components/
│   └── ui/
│       ├── globe.tsx        # Main Globe component
│       └── globe-demo.tsx   # Demo component
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── components.json          # shadcn/ui configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## Key Features

- **Interactive 3D Globe**: Rotating globe with markers for major cities
- **Blue Markers**: Customized marker colors (sky-500 blue)
- **Responsive Design**: Works on desktop and mobile
- **TypeScript Support**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui Ready**: Compatible with shadcn/ui components

## Globe Configuration

The Globe component includes markers for:
- Manila, Philippines
- Mumbai, India
- Dhaka, Bangladesh
- Cairo, Egypt
- Beijing, China
- São Paulo, Brazil
- Mexico City, Mexico
- New York, USA
- Tokyo, Japan
- Istanbul, Turkey

## Customization

You can customize the globe by modifying the `GLOBE_CONFIG` object in `components/ui/globe.tsx`:

- `markerColor`: Change marker colors
- `baseColor`: Change globe base color
- `glowColor`: Change glow effect color
- `markers`: Add/remove/modify city markers
- `phi`, `theta`: Adjust rotation angles
- `mapBrightness`: Adjust brightness

## Integration with Existing HTML

To integrate this Globe component with your existing static HTML site, you have two options:

1. **Convert to Full Next.js**: Migrate your existing HTML content to Next.js pages
2. **Hybrid Approach**: Use the Globe component in a specific Next.js page while keeping your static HTML for other pages

## Troubleshooting

If you encounter issues:

1. Make sure all dependencies are installed: `npm install`
2. Check that Node.js version is 18 or higher
3. Clear Next.js cache: `rm -rf .next` (or `rmdir /s .next` on Windows)
4. Restart the development server: `npm run dev`

## Next Steps

1. Customize the globe markers to match your business locations
2. Integrate with your existing content
3. Add more interactive features
4. Deploy to your hosting platform
