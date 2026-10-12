import JSZip from 'jszip';
import heroOpsImg from '../assets/images/hero_security_ops_1791808906137.jpg';
import physicalSecImg from '../assets/images/physical_security_hardware_1791808928466.jpg';
import itDatacenterImg from '../assets/images/it_datacenter_networking_1791808949741.jpg';

export async function downloadProjectZip(onProgress?: (status: string) => void) {
  if (onProgress) onProgress('Initializing project bundle...');
  const zip = new JSZip();

  // 1. Root configuration files
  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'jeb-innovations-website',
        private: true,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite --port=3000 --host',
          build: 'vite build',
          preview: 'vite preview',
          lint: 'tsc --noEmit',
        },
        dependencies: {
          '@tailwindcss/vite': '^4.3.3',
          '@vitejs/plugin-react': '^6.1.1',
          'lucide-react': '^0.546.0',
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          vite: '^8.3.0',
          jszip: '^3.10.1',
        },
        devDependencies: {
          '@types/node': '^22.14.0',
          '@types/react': '^19.3.0',
          '@types/react-dom': '^19.3.0',
          '@types/jszip': '^3.4.1',
          tailwindcss: '^4.3.3',
          typescript: '^7.0.2',
        },
      },
      null,
      2
    )
  );

  zip.file(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          skipLibCheck: true,
          isolatedModules: true,
        },
        include: ['src'],
      },
      null,
      2
    )
  );

  zip.file(
    'vite.config.ts',
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
});
`
  );

  zip.file(
    'index.html',
    `<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JEB Innovations & Technologies | IT & Physical Security VAR</title>
    <meta name="description" content="JEB Innovations & Technologies Pte Ltd is a premier Singapore IT VAR specializing in enterprise IT infrastructure and physical security solutions." />
    <meta property="og:title" content="JEB Innovations & Technologies | IT & Physical Security VAR" />
    <meta property="og:description" content="Enterprise IT infrastructure, cybersecurity, biometric access control, and physical security solutions from JEB Innovations & Technologies Pte Ltd." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  zip.file(
    'wrangler.toml',
    `# Cloudflare Pages Configuration for Free Tier
name = "jeb-innovations-website"
compatibility_date = "2024-11-01"
pages_build_output_dir = "dist"
`
  );

  // 2. Public folder
  const publicFolder = zip.folder('public');
  if (publicFolder) {
    publicFolder.file(
      '_redirects',
      `# Cloudflare Pages SPA rewrite rule
/*    /index.html   200
`
    );
    publicFolder.file(
      '_headers',
      `# Cloudflare Pages security and cache headers
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`
    );
  }

  // 3. VS Code folder
  const vscodeFolder = zip.folder('.vscode');
  if (vscodeFolder) {
    vscodeFolder.file(
      'settings.json',
      JSON.stringify(
        {
          'editor.formatOnSave': true,
          'editor.defaultFormatter': 'esbenp.prettier-vscode',
          'files.eol': '\n',
          'tailwindCSS.includeLanguages': {
            typescript: 'javascript',
            typescriptreact: 'javascript',
          },
        },
        null,
        2
      )
    );
    vscodeFolder.file(
      'extensions.json',
      JSON.stringify(
        {
          recommendations: [
            'bradlc.vscode-tailwindcss',
            'esbenp.prettier-vscode',
            'cloudflare.wrangler',
          ],
        },
        null,
        2
      )
    );
    vscodeFolder.file(
      'launch.json',
      JSON.stringify(
        {
          version: '0.2.0',
          configurations: [
            {
              type: 'chrome',
              request: 'launch',
              name: 'Launch Chrome against localhost',
              url: 'http://localhost:3000',
              webRoot: '${workspaceFolder}',
            },
          ],
        },
        null,
        2
      )
    );
  }

  // 4. Documentation
  zip.file(
    'README.md',
    `# JEB Innovations & Technologies Pte Ltd (jeb-int.com)
Website package ready for VS Code and Cloudflare Pages Free Tier.

## Quickstart
1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
2. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`
3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`
4. Deploy to Cloudflare Pages (Free Tier):
   \`\`\`bash
   npx wrangler pages deploy dist --project-name=jeb-innovations-website
   \`\`\`

## Updating Content
Edit \`src/data/siteConfig.ts\` to update company info, contacts, services, and vendor partners.
`
  );

  // 5. Source code
  const srcFolder = zip.folder('src');
  if (srcFolder) {
    srcFolder.file(
      'main.tsx',
      `import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
`
    );

    srcFolder.file(
      'index.css',
      `@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  code, pre, .font-mono {
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-variant-numeric: tabular-nums;
  }
}
`
    );
  }

  if (onProgress) onProgress('Fetching images and media assets...');

  // Fetch images as blobs and bundle them
  try {
    const imagesFolder = zip.folder('src/assets/images');
    if (imagesFolder) {
      const img1Blob = await fetch(heroOpsImg).then((r) => r.blob());
      imagesFolder.file('hero_security_ops_1791808906137.jpg', img1Blob);

      const img2Blob = await fetch(physicalSecImg).then((r) => r.blob());
      imagesFolder.file('physical_security_hardware_1791808928466.jpg', img2Blob);

      const img3Blob = await fetch(itDatacenterImg).then((r) => r.blob());
      imagesFolder.file('it_datacenter_networking_1791808949741.jpg', img3Blob);
    }
  } catch (err) {
    console.warn('Could not fetch binary image blobs for zip, skipping binary packing:', err);
  }

  if (onProgress) onProgress('Generating ZIP archive...');

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'jeb-innovations-website-vscode.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);

  if (onProgress) onProgress('Download initiated!');
}
