import React, { useState } from 'react';
import { SiteConfig } from '../data/siteConfig';
import { Server, Lock, ShieldCheck, Check, ArrowUpRight, Cpu, Eye, KeyRound, Wifi, Database } from 'lucide-react';
import itDatacenterImg from '../assets/images/it_datacenter_networking_1791808949741.jpg';
import physicalSecImg from '../assets/images/physical_security_hardware_1791808928466.jpg';

interface CoreSpecializationProps {
  config: SiteConfig;
  onSelectService: (serviceId: string) => void;
}

export const CoreSpecialization: React.FC<CoreSpecializationProps> = ({ config, onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'converged' | 'it' | 'physical'>('converged');

  return (
    <section id="solutions" className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Dual Domain Specialization
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            Two Critical Disciplines. One Seamless Integration.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Most organizations juggle separate vendors for their IT servers and their physical security cameras. JEB brings both disciplines together with verified network isolation, enterprise storage sizing, and unified SLA support.
          </p>
        </div>

        {/* View Switcher Filter Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('converged')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'converged'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Converged Architecture
            </button>
            <button
              onClick={() => setActiveTab('it')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'it'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              IT Systems & Cyber
            </button>
            <button
              onClick={() => setActiveTab('physical')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'physical'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Physical Security & Access
            </button>
          </div>
        </div>

        {/* Dual Pillar Comparison Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Pillar 1: Enterprise IT Infrastructure */}
          <div
            id="it-infrastructure"
            className={`rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 ${
              activeTab === 'physical' ? 'opacity-40 scale-[0.98]' : 'opacity-100'
            }`}
          >
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Server className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Pillar A: Enterprise IT Infrastructure</h3>
                  <p className="text-xs text-slate-400">Compute, Optical Fabrics & Cyber Defense</p>
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                VAR CERTIFIED
              </span>
            </div>

            {/* Pillar Media Image */}
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 aspect-[16/9] relative group">
              <img
                src={itDatacenterImg}
                alt="Enterprise Datacenter Server Racks and Optical Switching"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-medium">Tier-3 Server Staging & Optical Cabling</span>
                  <span className="font-mono text-cyan-400">100G Backbone</span>
                </div>
              </div>
            </div>

            {/* Key Subsystems */}
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-cyan-400" />
                  Compute, SAN Storage & Disaster Recovery
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Dell PowerEdge, HPE ProLiant, and Lenovo server clusters with NVMe all-flash SAN storage and Veeam backup replication architectures.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Dell</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">HPE</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Lenovo</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Veeam</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Supermicro</span>
                </div>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-cyan-400" />
                  Core Optical Switching & Perimeter Firewalls
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Cisco Catalyst and Fortinet FortiGate fabrics providing dedicated VLAN isolation, deep packet inspection, and resilient SD-WAN.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Cisco</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Fortinet</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Aruba</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Softerra LDAP</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Complete Hardware Burn-in & Staging Included</span>
              <a href="#contact" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                Configure IT Bill of Materials <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 2: Commercial Physical Security */}
          <div
            id="physical-security"
            className={`rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 ${
              activeTab === 'it' ? 'opacity-40 scale-[0.98]' : 'opacity-100'
            }`}
          >
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Pillar B: Commercial Physical Security</h3>
                  <p className="text-xs text-slate-400">AI Video Surveillance & Biometric Access</p>
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                IM8 & PDPA READY
              </span>
            </div>

            {/* Pillar Media Image */}
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 aspect-[16/9] relative group">
              <img
                src={physicalSecImg}
                alt="Commercial CCTV Dome Camera and Biometric Access Control Reader"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-medium">4K Optical Surveillance & Speed Gates</span>
                  <span className="font-mono text-cyan-400">&lt; 0.3s Facial Match</span>
                </div>
              </div>
            </div>

            {/* Key Subsystems */}
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Eye className="h-4 w-4 text-cyan-400" />
                  AI Video Management (VMS) & High Retention
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Milestone XProtect and Axis high-definition cameras with AI perimeter tripwires, automated vehicle LPR, and 90-day RAID surveillance storage.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Milestone</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Axis</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Hanwha</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Hikvision Pro</span>
                </div>
              </div>

              <div className="rounded-lg bg-slate-950/60 p-4 border border-slate-800/80">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-cyan-400" />
                  Biometric Access Control & Server Room Interlocks
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Suprema touchless facial recognition, encrypted HID RFID card readers, turnstiles, and APC NetBotz environmental temperature/leak sensors.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Suprema</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">HID</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">Nedap</span>
                  <span className="rounded bg-slate-800/80 px-2 py-0.5 font-mono">APC NetBotz</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Singapore Police Force / BCA Standard Compliance</span>
              <a href="#contact" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                Request Security Survey <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* The VAR Value Advantage Banner */}
        <div className="mt-12 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-bold text-white">Direct OEM Price Protection</h5>
                <p className="mt-1 text-slate-400 text-xs">Tier-1 VAR discount quotas from Cisco, Dell, and Milestone passed directly to clients.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-bold text-white">Full Pre-Deployment Burn-In</h5>
                <p className="mt-1 text-slate-400 text-xs">We bench-test all server drives, optics, and camera firmware before physical site installation.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-bold text-white">Local Spares Pool in Singapore</h5>
                <p className="mt-1 text-slate-400 text-xs">Hot-swappable replacement drives, camera domes, and power supplies stocked locally for 4-hour SLAs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
