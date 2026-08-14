<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy it to production.

View your app in AI Studio: https://ai.studio/apps/drive/1K0iYwAeUE0BjoK_EKMmbQjNt1ppmor3U

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run dev
   ```
   The app will open on `http://localhost:3002/`

## Build for Production

To create a production build:

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Deploy to Vercel

### Quick Deploy (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

### Manual Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

The `vercel.json` file in the root directory is pre-configured to:
- Build: `npm run build`
- Output: `dist/` directory

## Project Structure

```
.
├── App.tsx                    # Main React component
├── index.tsx                  # Entry point
├── index.html                 # HTML template
├── index.css                  # Global styles + Tailwind
├── types.ts                   # TypeScript type definitions
├── vite.config.ts             # Vite configuration
├── tailwind.config.cjs        # Tailwind CSS configuration
├── postcss.config.cjs         # PostCSS configuration
├── vercel.json                # Vercel deployment config
├── package.json               # Dependencies
└── components/
    ├── CoinToss.tsx           # Coin toss animation & logic
    ├── HexagramVisual.tsx      # I Ching hexagram display
    └── YinYangSymbol.tsx       # Yin-Yang symbol component
└── services/
    └── interpretService.ts    # Calls /api/interpret and returns the result
└── api/
    └── interpret.js            # Serverless function; static lookup over the 64 hexagrams (no external API calls)
```

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 (with PostCSS)
- **Interpretation data**: static curated dataset of the 64 I Ching hexagrams (no AI/external API calls, no cost per request)
- **Deployment**: Vercel

## Notes

- All Tailwind CSS is processed locally (no CDN dependency)
- App supports Vietnamese language throughout

