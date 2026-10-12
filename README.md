# JEB Innovations & Technologies Pte Ltd (jeb-int.com)
## Modern Enterprise Website & Cloudflare Free Tier Deployment Package

A dynamic, clean, and modern website built for **JEB Innovations & Technologies Pte Ltd**, a premier Singapore IT Value-Added Reseller (VAR) specializing in **IT Infrastructure** and **Physical Security**.

---

## 🚀 Key Features

- **Dual Specialization Architecture**: Dedicated showcases for Enterprise IT Infrastructure (Compute, Storage, Networking, Cybersecurity) and Commercial Physical Security (IP CCTV, Milestone VMS, Biometric Access, Environmental Telemetry).
- **Interactive VAR Solution Sizer**: Dynamic BoM (Bill-of-Materials) calculator that computes usable SAN storage, rack space (U), PoE+ power budget, and compliance readiness (IM8, PDPA, BCA).
- **Authorized OEM Partner Matrix**: Filterable brand showcase featuring Dell, Cisco, Fortinet, Milestone, Axis, Suprema, HID, Softerra, HPE, and more.
- **In-Browser Live Content Editor**: Update company info, contacts, emails, and services directly in your browser with 1-click export to `siteConfig.ts`.
- **Pre-Configured for Cloudflare Free Tier**: Includes `wrangler.toml`, `_redirects`, and `_headers` for zero-cost, blazing-fast global deployment with free SSL on `jeb-int.com`.
- **VS Code Ready**: Includes workspace settings, recommended extensions, and debugger launch configs in `.vscode/`.

---

## 📂 Project Structure & Easy Content Updates

All website content is intentionally separated from code logic and centralized in a single file:

```
📁 project-root
├── 📁 src
│   ├── 📁 data
│   │   └── siteConfig.ts        <-- ⭐️ EDIT THIS FILE TO UPDATE ANY CONTENT
│   ├── 📁 components
│   │   ├── Navbar.tsx           <-- 1-row Top Bar Contract compliant
│   │   ├── Hero.tsx             <-- High-impact 2-column hero + KPI strip
│   │   ├── CoreSpecialization.tsx <-- IT vs Physical Security deep dive
│   │   ├── SolutionSizer.tsx    <-- Interactive hardware BoM estimator
│   │   ├── ServicesGrid.tsx     <-- Bento grid of VAR services
│   │   ├── PartnerEcosystem.tsx <-- OEM vendor partner matrix
│   │   ├── CaseStudies.tsx      <-- Real-world verified metrics
│   │   ├── ContactSection.tsx   <-- RFQ form with instant reference ID
│   │   ├── ContentEditorModal.tsx <-- In-app live CMS drawer
│   │   └── CloudflareDeployGuideModal.tsx
│   ├── App.tsx
│   └── main.tsx
├── 📁 public
│   ├── _redirects               <-- Cloudflare Pages SPA client routing
│   └── _headers                 <-- Security & cache headers
├── 📁 .vscode
│   ├── settings.json            <-- VS Code editor formatting & Tailwind
│   ├── extensions.json          <-- Recommended extensions
│   └── launch.json              <-- Debug launch configuration
├── wrangler.toml                <-- Cloudflare Pages build configuration
├── package.json
└── README.md
```

### How to update website text in the future:
1. Open `src/data/siteConfig.ts` in VS Code.
2. Update company name, phone, address, `jon.bong@jeb-int.co`, services, or partner logos.
3. Save the file. Your website will update automatically!
*(Alternatively, click **Live Site Editor** in the website header or footer to edit visually in your browser and click **Export siteConfig.ts**).*

---

## 💻 Working in VS Code

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer)
- [Visual Studio Code](https://code.visualstudio.com/)

### 2. Opening the Project
1. Open VS Code.
2. Select **File** > **Open Folder...** and choose this project folder.
3. When prompted, install the recommended extensions (Tailwind CSS IntelliSense, ESLint, Prettier).

### 3. Running the Development Server
Open the integrated terminal in VS Code (`Ctrl + ~` or `Cmd + ~`) and run:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## ☁️ Deploying to Cloudflare Pages (Free Tier)

Cloudflare Pages Free Tier provides:
- **$0.00 / month forever**
- **Unlimited bandwidth and requests**
- **Free automated SSL certificates**
- **Global edge network in 300+ cities (including Singapore)**

Choose any of the 3 deployment methods below:

### Method 1: Git-Connected Automatic Deployment (Recommended)
1. Initialize Git and push this repository to GitHub or GitLab:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of JEB Innovations website"
   git remote add origin https://github.com/YOUR_USERNAME/jeb-innovations.git
   git push -u origin main
   ```
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com).
3. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your repository. Cloudflare will automatically detect the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Your site will build and be live worldwide in ~60 seconds!
6. Every time you push a change to GitHub in VS Code, Cloudflare will automatically rebuild and deploy your site for free.

---

### Method 2: Direct Command Line Deploy (Wrangler CLI)
Deploy directly from your VS Code terminal without pushing to Git:

```bash
# 1. Build the production output
npm run build

# 2. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=jeb-innovations-website
```
*(On first run, Wrangler will open your browser to log in to your free Cloudflare account).*

---

### Method 3: Direct Web Drag-and-Drop (No Git or CLI needed)
1. Run `npm run build` in VS Code to produce the `dist` folder.
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages** > **Direct Upload**.
3. Enter your project name (e.g. `jeb-innovations-website`).
4. Drag and drop the `dist` folder into the Cloudflare browser window and click **Deploy Site**.

---

## 🌐 Connecting Custom Domain: `jeb-int.com`

1. In the Cloudflare Dashboard, go to your Pages project (`jeb-innovations-website`).
2. Click on the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter `jeb-int.com` (and repeat for `www.jeb-int.com`).
5. Cloudflare will automatically configure the DNS records and issue free SSL certificates with automatic renewal.

---

## 🛡️ Enterprise Trust & Verification Details
- **Company**: JEB Innovations & Technologies Pte Ltd
- **Domain**: jeb-int.com
- **Headquarters**: 2 Venture Drive, #14-02 Vision Exchange, Singapore 608526
- **Primary Contact**: Jon Bong (`jon.bong@jeb-int.co`)
- **Key Offerings**: Enterprise IT Compute/Storage/Networking VAR, Commercial IP CCTV, Biometric Access Control, IM8/PDPA/BCA Compliance.
