# TikTok Downloader - Deployment Guide

This guide walks you through deploying your TikTok downloader app to free hosting platforms. The app consists of a React frontend and Node.js backend, both deployable for free.

## Overview

The TikTok downloader is a full-stack application:
- **Frontend:** React 19 with Tailwind CSS (static assets)
- **Backend:** Node.js with Express and tRPC (API server)
- **Database:** Optional (not required for basic functionality)

## Option 1: Deploy on Render (Recommended for Beginners)

Render offers a generous free tier perfect for this app. It automatically deploys from GitHub and provides a free PostgreSQL database if needed.

### Step 1: Prepare Your Repository

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TikTok downloader app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tiktok-downloader.git
   git push -u origin main
   ```

### Step 2: Create a Render Account

1. Go to [render.com](https://render.com)
2. Click **Sign Up** and authenticate with GitHub
3. Authorize Render to access your GitHub repositories

### Step 3: Deploy the Backend

1. In Render dashboard, click **New +** → **Web Service**
2. Select your `tiktok-downloader` repository
3. Configure the service:
   - **Name:** `tiktok-downloader-api`
   - **Environment:** `Node`
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `node dist/index.js`
   - **Plan:** Free
4. Click **Create Web Service**
5. Wait for deployment to complete (5-10 minutes)
6. Copy your service URL (e.g., `https://tiktok-downloader-api.onrender.com`)

### Step 4: Deploy the Frontend

For the frontend, you have two options:

**Option A: Deploy on Vercel (Easiest)**
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project** and import your GitHub repository
3. Set **Framework Preset** to `Vite`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://tiktok-downloader-api.onrender.com` (your Render backend URL)
5. Click **Deploy**

**Option B: Deploy Frontend on Render (Same Service)**
1. In your Render service, go to **Environment** tab
2. Add environment variables if needed
3. The frontend will be served automatically from the same service

### Step 5: Configure Backend Environment Variables

1. In Render dashboard, open your backend service
2. Go to **Environment** tab
3. Add variables (if needed):
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (Render sets this automatically)

## Option 2: Deploy on Railway

Railway is another excellent free hosting option with a simple interface.

### Step 1: Create a Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### Step 2: Deploy Backend

1. Click **New Project** → **Deploy from GitHub repo**
2. Select your `tiktok-downloader` repository
3. Railway auto-detects it's a Node.js project
4. Configure:
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `node dist/index.js`
5. Click **Deploy**
6. Once deployed, go to **Settings** → **Domains** and copy your domain

### Step 3: Deploy Frontend

1. Create a new Railway project for the frontend
2. Set environment variable:
   - `VITE_API_URL`: Your Railway backend domain
3. Deploy the frontend similarly

## Option 3: Deploy Frontend on Vercel

Vercel is perfect for deploying just the frontend if you are hosting the backend on Render or Railway.

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** and authenticate with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click **New Project**
2. Select your `tiktok-downloader` repository
3. Click **Import**

### Step 3: Configure Build Settings

1. Set **Framework Preset:** `Vite`
2. Set **Root Directory:** `client`
3. Set **Build Command:** `pnpm build`
4. Set **Output Directory:** `dist`

### Step 4: Add Environment Variables

1. In project settings, go to **Environment Variables**
2. Add the following:
   - **Name:** `VITE_API_URL`
   - **Value:** Your backend URL (e.g., `https://tiktok-downloader-api.onrender.com`)
   - **Environments:** Production, Preview, Development
3. Click **Save**

### Step 5: Deploy

1. Click **Deploy**
2. Wait for deployment to complete (2-5 minutes)
3. Copy your Vercel domain (e.g., `https://tiktok-downloader.vercel.app`)
4. Test the app by visiting your domain

### Step 6: Connect to Backend

Your frontend is now connected to your backend via the `VITE_API_URL` environment variable. The app should work immediately!

## Option 5: Self-Hosted on Your Own Server

If you have a VPS or dedicated server:

1. SSH into your server
2. Clone your repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/tiktok-downloader.git
   cd tiktok-downloader
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Build the project:
   ```bash
   pnpm build
   ```

5. Start the server:
   ```bash
   NODE_ENV=production node dist/index.js
   ```

6. Use a process manager like PM2 to keep it running:
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name "tiktok-downloader"
   pm2 startup
   pm2 save
   ```

7. Set up a reverse proxy (Nginx) to handle HTTPS and routing.

## Troubleshooting

### "Cannot find module" errors

Ensure all dependencies are installed:
```bash
pnpm install
```

### Build fails with TypeScript errors

Check that TypeScript compilation passes locally:
```bash
pnpm check
```

### API requests fail with CORS errors

The backend should handle CORS automatically. If issues persist, check that your frontend is calling the correct API URL from environment variables.

### Videos won't download

Verify that:
1. The TikTok URL is valid and public
2. tikwm.com is accessible from your server (not blocked by firewall)
3. The video hasn't been deleted or made private

## Performance Tips

1. **Enable Caching:** Add caching headers to static assets
2. **Use CDN:** Deploy frontend on Vercel/Netlify for global CDN
3. **Monitor API Usage:** Keep an eye on tikwm.com rate limits
4. **Database:** Only add if you need to store download history

## Security Considerations

1. **Never commit secrets:** Use environment variables for sensitive data
2. **HTTPS only:** All hosting platforms provide free HTTPS
3. **Rate limiting:** Consider adding rate limiting to prevent abuse
4. **Input validation:** The app validates TikTok URLs on the backend

## Scaling Beyond Free Tier

If your app grows and exceeds free tier limits:

- **Render:** Upgrade to paid plans ($7+/month)
- **Railway:** Pay-as-you-go pricing ($5 credit/month free)
- **Vercel:** Hobby plan is free; Pro is $20/month
- **Self-hosted:** Upgrade VPS to higher tier

## Support

For issues with:
- **Render:** Visit [render.com/docs](https://render.com/docs)
- **Railway:** Visit [railway.app/docs](https://railway.app/docs)
- **Vercel:** Visit [vercel.com/docs](https://vercel.com/docs)

## Next Steps

1. Choose your hosting platform
2. Follow the deployment steps above
3. Test your live app
4. Share the URL with friends!

Enjoy your free TikTok downloader! 🎉
