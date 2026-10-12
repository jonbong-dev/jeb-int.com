import React, { useState, useEffect } from 'react';
import { SiteConfig } from '../data/siteConfig';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  config: SiteConfig;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, initialMessage = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    company: '',
    projectType: 'converged',
    timeline: '1-3 months',
    requirements: initialMessage,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        requirements: initialMessage,
      }));
    }
  }, [initialMessage]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Enter a valid corporate email';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Please specify your requirements or BoM';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real submission
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const refId = `JEB-RFQ-2026-${randomCode}`;
      setSubmissionSuccess(refId);
    }, 800);
  };

  const handleCopyRef = () => {
    if (submissionSuccess) {
      navigator.clipboard.writeText(submissionSuccess);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Direct Engineering Desk
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
                Consult With a Solutions Architect
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Whether sizing a new datacenter rack, planning an IM8-compliant CCTV overhaul, or procuring enterprise software licenses, our certified engineers are ready to assist.
              </p>

              {/* Direct corporate info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Corporate Headquarters
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">
                      {config.company.headquarters.fullAddress}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {config.company.headquarters.region}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Mail className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Email Inquiries
                    </h4>
                    <div className="mt-1 space-y-0.5 text-xs">
                      <p>
                        <span className="text-slate-400">Direct: </span>
                        <a href={`mailto:${config.company.contact.primaryEmail}`} className="text-cyan-400 hover:underline font-mono">
                          {config.company.contact.primaryEmail}
                        </a>
                      </p>
                      <p>
                        <span className="text-slate-400">Sales: </span>
                        <a href={`mailto:${config.company.contact.salesEmail}`} className="text-cyan-400 hover:underline font-mono">
                          {config.company.contact.salesEmail}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Phone className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Direct Voice Desk
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 font-mono">
                      {config.company.contact.phone}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      WhatsApp: {config.company.contact.whatsapp}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Clock className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Operating Hours
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {config.company.contact.operatingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response turnaround promise */}
            <div className="mt-8 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 text-xs text-slate-300 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0" />
              <span>
                Standard RFQ quotes and engineering reviews dispatched within <strong>1 business day</strong>.
              </span>
            </div>
          </div>

          {/* Right form column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white">
                Request VAR Quotation & Architectural Assessment
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Complete this form with your project specifications. Our engineering team will review your bill of materials.
              </p>

              {submissionSuccess ? (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Quotation Request Successfully Dispatched
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your RFQ has been logged and routed directly to <strong>{config.company.contact.primaryEmail}</strong> and the JEB solutions team.
                  </p>

                  <div className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-400">Reference:</span>
                    <span className="text-cyan-400 font-bold">{submissionSuccess}</span>
                    <button
                      onClick={handleCopyRef}
                      className="ml-2 text-slate-400 hover:text-white"
                      title="Copy Reference ID"
                    >
                      {copiedRef ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmissionSuccess(null);
                        setFormData({
                          fullName: '',
                          workEmail: '',
                          phone: '',
                          company: '',
                          projectType: 'converged',
                          timeline: '1-3 months',
                          requirements: '',
                        });
                      }}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Tan"
                        className={`w-full rounded-lg bg-slate-950 px-3.5 py-2.5 text-xs text-white border transition-colors focus:outline-none ${
                          errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {errors.fullName && <p className="mt-1 text-[10px] text-rose-400">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full rounded-lg bg-slate-950 px-3.5 py-2.5 text-xs text-white border transition-colors focus:outline-none ${
                          errors.workEmail ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {errors.workEmail && <p className="mt-1 text-[10px] text-rose-400">{errors.workEmail}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Organization / Company *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Pte Ltd"
                        className={`w-full rounded-lg bg-slate-950 px-3.5 py-2.5 text-xs text-white border transition-colors focus:outline-none ${
                          errors.company ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {errors.company && <p className="mt-1 text-[10px] text-rose-400">{errors.company}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+65 9123 4567"
                        className="w-full rounded-lg bg-slate-950 px-3.5 py-2.5 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Solution Scope
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full rounded-lg bg-slate-950 px-3.5 py-2.5 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none transition-colors"
                      >
                        <option value="converged">Converged IT & Physical Security</option>
                        <option value="it_infra">Enterprise Compute & Storage (Dell/HPE)</option>
                        <option value="networking">Core Optical Networking & Firewalls</option>
                        <option value="cctv">IP CCTV & Milestone VMS Surveillance</option>
                        <option value="access">Biometric Access & Interlocks</option>
                        <option value="licensing">Software / LDAP Licensing (Softerra)</option>
                        <option value="sla">Maintenance SLA Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full rounded-lg bg-slate-950 px-3.5 py-2.5 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none transition-colors"
                      >
                        <option value="immediate">Immediate (&lt; 30 Days)</option>
                        <option value="1-3 months">1 - 3 Months</option>
                        <option value="quarter">Next Quarter</option>
                        <option value="planning">Budgeting & Feasibility Phase</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Project Requirements & Bill of Materials (BoM) *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Specify your hardware requirements, camera counts, server specifications, or paste output from the Solution Sizer..."
                      className={`w-full rounded-lg bg-slate-950 px-3.5 py-2.5 text-xs text-white font-mono border transition-colors focus:outline-none ${
                        errors.requirements ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {errors.requirements && <p className="mt-1 text-[10px] text-rose-400">{errors.requirements}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors shadow-lg shadow-cyan-950 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Routing to JEB Engineering Desk...'
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Request For Quotation (RFQ)
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-500 text-center">
                    All specifications are handled under corporate non-disclosure. We do not distribute your technical specs to unverified third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
