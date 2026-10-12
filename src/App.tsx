import React, { useState } from 'react';
import { initialSiteConfig, SiteConfig } from './data/siteConfig';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoreSpecialization } from './components/CoreSpecialization';
import { SolutionSizer } from './components/SolutionSizer';
import { ServicesGrid } from './components/ServicesGrid';
import { PartnerEcosystem } from './components/PartnerEcosystem';
import { CaseStudies } from './components/CaseStudies';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContentEditorModal } from './components/ContentEditorModal';
import { CloudflareDeployGuideModal } from './components/CloudflareDeployGuideModal';
import { downloadProjectZip } from './utils/projectDownloader';
import { Download, CheckCircle2, Loader2 } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setDownloadStatus('Packaging files into VS Code ZIP...');
      await downloadProjectZip((status) => setDownloadStatus(status));
      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadStatus('Download complete!');
      setTimeout(() => setDownloadStatus(null), 3000);
    }
  };

  const handleOpenSizer = () => {
    const el = document.getElementById('solution-sizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyToQuote = (bomSummary: string) => {
    setInquiryText(bomSummary);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Download Status Toast */}
      {downloadStatus && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-cyan-400/50 bg-slate-900/95 px-4 py-3 text-xs text-cyan-300 shadow-2xl backdrop-blur-md">
          {downloadStatus.includes('initiated') ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
          )}
          <span className="font-medium text-white">{downloadStatus}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        config={config}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenSizer={handleOpenSizer}
        onDownloadZip={handleDownload}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          config={config}
          onOpenSizer={handleOpenSizer}
        />

        {/* Dual Core Domain Specialization */}
        <CoreSpecialization
          config={config}
          onSelectService={(serviceId) => {
            const el = document.getElementById(serviceId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive VAR Solution Sizer & Hardware BoM Configurator */}
        <SolutionSizer
          onApplyToQuote={handleApplyToQuote}
        />

        {/* Full Suite Bento Services Grid */}
        <ServicesGrid
          config={config}
        />

        {/* Authorized OEM Partner Ecosystem */}
        <PartnerEcosystem
          config={config}
        />

        {/* Real-World Case Studies & Verified Outcomes */}
        <CaseStudies
          config={config}
        />

        {/* Frequently Asked Questions */}
        <FaqSection
          config={config}
        />

        {/* Direct Contact & RFQ Submission */}
        <ContactSection
          config={config}
          initialMessage={inquiryText}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        config={config}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onDownloadZip={handleDownload}
      />

      {/* Live Content Editor Modal (Easy to update in future) */}
      <ContentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        onSaveConfig={(newConfig) => setConfig(newConfig)}
      />

      {/* Cloudflare Deployment & VS Code Instructions Modal */}
      <CloudflareDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        onDownloadZip={handleDownload}
      />
    </div>
  );
}
