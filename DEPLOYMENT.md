# Netlify Deployment Guide

## ✅ Configuration Files Created

1. **`netlify.toml`** - Netlify build configuration
2. **`.node-version`** - Specifies Node.js 20 for builds
3. **`.env.example`** - Template for environment variables

## 🚀 Deployment Steps

### 1. Push Code to GitHub

```bash
git add netlify.toml .node-version .env.example
git commit -m "Add Netlify deployment configuration"
git push
```

### 2. Connect Repository to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository: `VivekcMW/MyPortfolio`
5. Configure build settings:
   - **Branch to deploy:** `main` (or `light-theme-a11y` for current branch)
   - **Build command:** `npm run build` (auto-detected)
   - **Publish directory:** `.next` (auto-detected)
   - **Node version:** 20 (from `.node-version`)

### 3. Set Environment Variables

In Netlify dashboard → **Site settings** → **Environment variables**, add:

| Variable | Value | Notes |
|----------|-------|-------|
| `GMAIL_USER` | `vivekanand.design@gmail.com` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | `[your-app-password]` | 16-char Gmail App Password |
| `NEXT_PUBLIC_SITE_URL` | `https://uxvivek.netlify.app` | Your production URL |
| `NODE_VERSION` | `20` | Node.js version (optional, `.node-version` handles this) |

⚠️ **Important:** Use a Gmail **App Password**, not your regular password.
- Generate at: https://myaccount.google.com/apppasswords
- Requires 2-Step Verification enabled

### 4. Deploy

Click **"Deploy site"** - Netlify will:
1. Install dependencies (`npm install`)
2. Run build (`npm run build`)
3. Deploy the `.next` folder
4. Enable Next.js Runtime for server features (API routes, dynamic rendering)

### 5. Custom Domain (Optional)

If using `uxvivek.netlify.app` or a custom domain:
1. Go to **Domain settings** → **Custom domains**
2. Add your domain
3. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## 🔍 Troubleshooting

### Build Fails with "Command not found: next"

**Solution:** Clear build cache
- Netlify dashboard → **Deploys** → **Deploy settings** → **Clear cache and deploy**

### API Routes Return 404

**Solution:** Ensure Netlify Runtime is enabled
- Next.js 13+ automatically enables Netlify's Next.js Runtime
- Check **Site settings** → **Build & deploy** → **Functions** for active functions

### Environment Variables Not Working

**Solution:** Redeploy after adding variables
- Environment variables require a fresh deploy to take effect
- **Deploys** → **Trigger deploy** → **Deploy site**

### Contact Form Emails Not Sending

**Solution:** Verify Gmail App Password
- Test App Password: https://myaccount.google.com/apppasswords
- Ensure 2-Step Verification is enabled
- Check Netlify function logs: **Functions** tab in dashboard

### Build Succeeds but Site Shows 404

**Solution:** Check publish directory
- Should be `.next` (not `out` or `build`)
- Verify in **Site settings** → **Build & deploy** → **Build settings**

---

## 📊 Expected Build Output

Successful build should show:
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Generating static pages (42/42)
Route (app)
├ ○ / (Static)
├ ƒ /api/contact (Dynamic)
└ ... [42 routes total]
```

## 🔗 Resources

- [Netlify Next.js Docs](https://docs.netlify.com/frameworks/next-js/overview/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

## 📝 Notes

- **Next.js 16 Support:** Netlify has built-in support for Next.js 13-16
- **Server Features:** API routes (`/api/*`) automatically deploy as Netlify Functions
- **Static Pages:** Most pages are pre-rendered at build time (SSG)
- **Dynamic Pages:** Blog posts and case studies use `generateStaticParams`
- **Edge Runtime:** Not used (contact form uses Node.js runtime)

---

**Status:** Ready to deploy 🚀
