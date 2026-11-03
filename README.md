# TrustGig

Hire vetted professionals you can trust.

## Fix Vercel deploy (important)

The app code lives in the `project/` folder. In Vercel:

1. Open your project → **Settings** → **General**
2. Find **Root Directory**
3. Set it to: `project`
4. Click **Save**
5. Go to **Deployments** → **Redeploy** the latest commit

If you are importing the repo for the first time:
1. [vercel.com/new](https://vercel.com/new)
2. Import `ewekatreasure8-bot/trustgig`
3. Set **Root Directory** to `project` before Deploy
4. Framework Preset: **Next.js**
5. Deploy

## Local

```bash
cd project
npm install
npm run dev
```
