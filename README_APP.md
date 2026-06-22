# TikTok Downloader - Free & Easy

Download TikTok videos without watermarks in MP4 format. Built with React, Node.js, and the free tikwm.com API.

## Features

✨ **Elegant UI** - Premium dark theme with gradient accents  
📱 **Mobile-First** - Perfectly optimized for smartphones and tablets  
🎥 **No Watermark** - Download videos in original quality without TikTok watermark  
⚡ **Fast & Reliable** - Powered by tikwm.com scraper  
🔒 **Secure** - No account required, no data stored  
🆓 **Completely Free** - No hidden costs or premium features  

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Git (for cloning)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tiktok-downloader.git
   cd tiktok-downloader
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

### Run Production Build

```bash
pnpm start
```

## How to Use

1. **Paste a TikTok URL** - Copy any TikTok video link and paste it into the input field
2. **Click "Get Video"** - The app fetches the video from tikwm.com
3. **Preview** - Watch the video preview with metadata (author, description)
4. **Download** - Click "Download MP4" to save the video to your device

## Supported TikTok URLs

The app works with all these TikTok URL formats:

- `https://www.tiktok.com/@username/video/1234567890`
- `https://vm.tiktok.com/abcdef123`
- `https://vt.tiktok.com/xyz789`
- `tiktok.com/@user/video/123` (without https://)

## Project Structure

```
tiktok-downloader/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities (tRPC client)
│   │   └── index.css      # Global styles
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── routers.ts         # tRPC API routes
│   ├── db.ts              # Database queries
│   └── _core/             # Framework internals
├── drizzle/               # Database schema
├── DEPLOYMENT.md          # Deployment guide
└── package.json           # Dependencies
```

## Tech Stack

- **Frontend:** React 19, Tailwind CSS 4, Vite
- **Backend:** Node.js, Express, tRPC
- **API:** tikwm.com (free, no API key required)
- **Database:** Optional (MySQL/TiDB)
- **Styling:** Tailwind CSS with custom dark theme

## API Endpoint

The app exposes a tRPC endpoint for downloading videos:

```typescript
trpc.tiktok.download.mutate({ url: "https://www.tiktok.com/..." })
```

**Response:**
```json
{
  "success": true,
  "videoUrl": "https://...",
  "title": "Video title",
  "cover": "https://...",
  "author": "creator_name",
  "desc": "Video description"
}
```

## Error Handling

The app gracefully handles:
- Invalid TikTok URLs
- Network timeouts
- API failures
- Missing video data
- Download failures

All errors are displayed with user-friendly messages.

## Performance

- **First Load:** ~2-3 seconds (includes React hydration)
- **Video Fetch:** ~3-5 seconds (depends on tikwm.com)
- **Download:** Instant (direct video URL)

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Limitations

- **Rate Limiting:** tikwm.com may rate limit if too many requests
- **Private Videos:** Can't download private/restricted videos
- **Deleted Videos:** Returns error if video has been deleted
- **Live Videos:** Doesn't support downloading live streams

## Privacy & Security

- No user data is collected or stored
- No login required
- Videos are downloaded directly from tikwm.com
- HTTPS only in production
- No tracking or analytics

## Contributing

Found a bug or want to improve the app? 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Render (recommended)
- Railway
- Vercel
- Self-hosted servers

## Troubleshooting

### "Invalid TikTok URL" error
- Make sure the URL is complete and correct
- Try copying directly from TikTok app

### "Failed to fetch video" error
- The video might be private or deleted
- Try a different video
- Check your internet connection

### Download doesn't start
- Check browser download settings
- Disable ad blockers
- Try a different browser

### Slow performance
- tikwm.com might be rate limited
- Try again in a few minutes
- Check your internet speed

## FAQ

**Q: Is this legal?**  
A: Downloading videos for personal use is generally legal. Always respect copyright and creators' rights.

**Q: Do I need an API key?**  
A: No! The app uses the free tikwm.com service which requires no API key.

**Q: Can I use this commercially?**  
A: This is for personal use only. Commercial use may violate TikTok's terms of service.

**Q: Will my videos be stored?**  
A: No. Videos are downloaded directly to your device. We don't store anything.

**Q: Can I download private videos?**  
A: No. Only public videos can be downloaded.

**Q: Is there a limit to downloads?**  
A: tikwm.com has rate limits, but for personal use it's unlimited.

## License

MIT License - feel free to use this project for personal or educational purposes.

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
3. Open an issue on GitHub

## Disclaimer

This tool is for personal use only. Users are responsible for respecting copyright and TikTok's terms of service. The developers are not responsible for misuse.

---

**Made with ❤️ for TikTok lovers everywhere**

Happy downloading! 🎉
