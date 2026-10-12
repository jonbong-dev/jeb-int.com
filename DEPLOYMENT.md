# Cloudflare Pages Free Tier Deployment Quickstart
# JEB Innovations & Technologies Pte Ltd (jeb-int.com)

This guide provides a rapid reference for deploying the website on Cloudflare's Free Tier with zero monthly cost.

---

## Pre-flight Checklist
- [x] `wrangler.toml` configured with output dir `dist`
- [x] `public/_redirects` created (`/* /index.html 200`)
- [x] `public/_headers` configured with security and caching headers
- [x] `.vscode/` configured for VS Code workspace

---

## 30-Second Wrangler CLI Deployment

```bash
# 1. Build
npm run build

# 2. Deploy
npx wrangler pages deploy dist --project-name=jeb-innovations-website
```

---

## Custom Domain Setup (jeb-int.com)

1. Open Cloudflare Dashboard -> **Workers & Pages** -> `jeb-innovations-website`
2. Select **Custom Domains** -> **Set up a domain**
3. Input:
   - Apex domain: `jeb-int.com`
   - Subdomain: `www.jeb-int.com`
4. Confirm DNS record additions (Cloudflare automatically sets CNAME to `<project>.pages.dev`).
5. SSL/TLS is automatically provisioned and active within 5-10 minutes.
