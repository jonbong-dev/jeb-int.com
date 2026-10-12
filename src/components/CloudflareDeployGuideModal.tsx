import React, { useState } from 'react';
import { X, Cloud, Terminal, CheckCircle2, Copy, Check, ExternalLink, Code2, ShieldAlert, Download } from 'lucide-react';

interface CloudflareDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
}

export const CloudflareDeployGuideModal: React.FC<CloudflareDeployGuideModalProps> = ({
  isOpen,
  onClose,
  onDownloadZip,
}) => {
  if (!isOpen) return null;

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Cloudflare Free Tier Deployment & VS Code Guide
              </h3>
              <p className="text-xs text-slate-400">
                100% Free Hosting · Unlimited Bandwidth · Free SSL · Custom Domain (jeb-int.com)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
          {/* 1-Click Download Callout */}
          <div className="rounded-xl border border-cyan-400/50 bg-gradient-to-r from-cyan-950/60 to-blue-950/60 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-cyan-950/40">
            <div>
              <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                1-Click Ready
              </span>
              <h4 className="font-bold text-white text-base">
                Download Complete Project for VS Code (.ZIP)
              </h4>
              <p className="text-slate-300 text-xs mt-1">
                Bundles all source code, components, images, <code className="text-cyan-300 font-mono">wrangler.toml</code>, and <code className="text-cyan-300 font-mono">.vscode</code> configurations in a single zip archive.
              </p>
            </div>
            <button
              onClick={onDownloadZip}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shadow-md shadow-cyan-950 shrink-0"
            >
              <Download className="h-4 w-4" />
              Download ZIP File
            </button>
          </div>

          {/* Quick Summary of Included Files */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              All Required Deployment Files Are Pre-Configured
            </h4>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold">wrangler.toml</span>: Cloudflare Pages config
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold">public/_redirects</span>: SPA client routing
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold">public/_headers</span>: Security & cache headers
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold">.vscode/</span>: Recommended settings & tasks
              </div>
            </div>
          </div>

          {/* Deployment Method 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-slate-950 text-xs font-bold">1</span>
              Method A: Cloudflare Dashboard + Git (Recommended / Automated)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1 leading-relaxed">
              <li>Commit & push this repository to your GitHub or GitLab account from VS Code.</li>
              <li>Log in to the free <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Cloudflare Dashboard</a>.</li>
              <li>Navigate to <strong>Workers & Pages</strong> &gt; <strong>Create Application</strong> &gt; <strong>Pages</strong> &gt; <strong>Connect to Git</strong>.</li>
              <li>Select your repository. Cloudflare will automatically detect Vite:
                <ul className="list-disc list-inside pl-4 mt-1 font-mono text-[11px] text-cyan-300">
                  <li>Build command: <code className="bg-slate-950 px-1 py-0.5 rounded">npm run build</code></li>
                  <li>Build output directory: <code className="bg-slate-950 px-1 py-0.5 rounded">dist</code></li>
                </ul>
              </li>
              <li>Click <strong>Save and Deploy</strong>. Your website is live worldwide on Cloudflare's edge network in ~60 seconds!</li>
            </ol>
          </div>

          {/* Deployment Method 2 */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-slate-950 text-xs font-bold">2</span>
              Method B: 1-Line CLI Deploy via Wrangler (Inside VS Code Terminal)
            </h4>
            <p className="text-slate-400">
              You can deploy directly from your VS Code integrated terminal without Git:
            </p>
            <div className="relative rounded-lg bg-slate-950 p-3.5 border border-slate-800 font-mono text-[11px] text-cyan-300">
              <p># 1. Build the production bundle</p>
              <p className="text-white">npm run build</p>
              <p className="mt-2"># 2. Deploy to Cloudflare Pages (Free Tier)</p>
              <p className="text-white">npx wrangler pages deploy dist --project-name=jeb-innovations-website</p>

              <button
                onClick={() => copySnippet('npm run build\nnpx wrangler pages deploy dist --project-name=jeb-innovations-website', 'cli')}
                className="absolute top-3 right-3 rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:text-white flex items-center gap-1"
              >
                {copiedCode === 'cli' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copiedCode === 'cli' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Linking Custom Domain */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-slate-950 text-xs font-bold">3</span>
              Attaching Custom Domain: jeb-int.com
            </h4>
            <p className="text-slate-300">
              Once deployed, go to your project in Cloudflare Pages &gt; <strong>Custom domains</strong> &gt; <strong>Set up a custom domain</strong> &gt; enter <code className="text-cyan-400 font-mono">jeb-int.com</code> and <code className="text-cyan-400 font-mono">www.jeb-int.com</code>. Cloudflare provisions free automated SSL certificates with zero maintenance!
            </p>
          </div>

          {/* Future Updates */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="h-4 w-4 text-cyan-400" />
              How to Update Website Content in the Future
            </h4>
            <p className="text-slate-300">
              Every piece of content is stored in <code className="text-cyan-400 font-mono">src/data/siteConfig.ts</code>. You can either:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li>Use the in-app <strong>Live Site Editor</strong> button at any time to modify text and export the file.</li>
              <li>Or simply open <code className="text-slate-200 font-mono">src/data/siteConfig.ts</code> in VS Code, change the text, and push to Git. Cloudflare automatically redeploys in seconds.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-800 px-6 py-4 bg-slate-950">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-xs font-bold text-slate-950 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
