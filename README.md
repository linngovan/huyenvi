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
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```
   The app will open on `http://localhost:3000/`

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
6. Before deploying, set environment variables:
   - Go to **Project Settings** → **Environment Variables**
   - Add `GEMINI_API_KEY` with your actual Gemini API key
7. Click "Deploy"

### Manual Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Then set the environment variable when prompted, or add it in the Vercel dashboard after deployment.

### Environment Variables on Vercel

In your Vercel project settings, add:

| Variable | Value |
|----------|-------|
| `GEMINI_API_KEY` | Your Gemini API key (get it from [Google AI Studio](https://aistudio.google.com/app/apikey)) |

The `vercel.json` file in the root directory is pre-configured to:
- Build: `npm run build`
- Output: `dist/` directory
- Auto-load environment variables during build

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
    └── geminiService.ts       # Gemini AI integration
```

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 (with PostCSS)
- **AI**: Google Gemini API 2.5 Flash
- **Deployment**: Vercel

## Notes

- `.env.local` is ignored by git (in `.gitignore`) and should never be committed
- `GEMINI_API_KEY` is used by the serverless function in `api/interpret.ts`
- All Tailwind CSS is processed locally (no CDN dependency)
- App supports Vietnamese language throughout

