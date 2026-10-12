import React, { useState, useMemo } from 'react';
import { Sliders, HardDrive, Shield, Server, Camera, KeyRound, Cpu, CheckCircle2, ArrowRight, Download, FileText, Check } from 'lucide-react';

interface SolutionSizerProps {
  onApplyToQuote: (summaryText: string) => void;
}

export const SolutionSizer: React.FC<SolutionSizerProps> = ({ onApplyToQuote }) => {
  // Config state
  const [facilityType, setFacilityType] = useState<'office' | 'datacenter' | 'logistics' | 'financial'>('office');
  const [cameraCount, setCameraCount] = useState<number>(16);
  const [retentionDays, setRetentionDays] = useState<number>(60);
  const [doorCount, setDoorCount] = useState<number>(6);
  const [serverNodes, setServerNodes] = useState<number>(3);
  const [switchPorts, setSwitchPorts] = useState<number>(48);
  const [includeEnvSensors, setIncludeEnvSensors] = useState<boolean>(true);
  const [slaTier, setSlaTier] = useState<'standard' | 'enterprise'>('enterprise');
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic calculations based on industry formulas
  const calculations = useMemo(() => {
    // 4K camera ~ 8 Mbps H.265 stream continuous recording:
    // 8 Mbps = 1 MB/s = 86.4 GB/camera/day
    const dailyGbPerCamera = 86.4;
    const rawStorageTb = Math.ceil((cameraCount * dailyGbPerCamera * retentionDays) / 1000);
    // RAID-6 + 20% parity/hot-spare overhead
    const usableSanStorageTb = Math.ceil(rawStorageTb * 1.35);

    // Rack Units estimation
    const serverU = serverNodes * 2; // 2U each
    const storageU = Math.ceil(usableSanStorageTb / 80) * 2; // 2U per 80TB shelf
    const switchU = Math.ceil(switchPorts / 48) * 2 + 2; // Core + Access switches
    const accessControllerU = Math.ceil(doorCount / 8) * 2;
    const upsU = 4;
    const totalRackU = serverU + storageU + switchU + accessControllerU + upsU;
    const rackEnclosures = Math.ceil(totalRackU / 42);

    return {
      storageTb: usableSanStorageTb,
      rackUnits: totalRackU,
      rackEnclosures: rackEnclosures,
      estimatedPoEWatts: cameraCount * 25 + doorCount * 15,
      complianceStandard:
        facilityType === 'financial'
          ? 'MAS TRM & IM8 High-Security Ready'
          : facilityType === 'datacenter'
          ? 'Tier-3 Uptime & ISO 27001 Ready'
          : 'Singapore PDPA & BCA Safe-Access Ready',
    };
  }, [cameraCount, retentionDays, doorCount, serverNodes, switchPorts, facilityType]);

  // Generate clean BoM text
  const bomText = useMemo(() => {
    return `--- JEB VAR ARCHITECTURAL SIZING SPECIFICATION ---
Facility Profile: ${facilityType.toUpperCase()}
• IP CCTV Cameras: ${cameraCount} x 4K AI Optics with ${retentionDays} Days Retention
• Dedicated SAN/NVR Storage: ${calculations.storageTb} TB (RAID-6 Enterprise Spec)
• Biometric / Access Doors: ${doorCount} Doors (Suprema/HID Biometric Readers)
• Enterprise Server Compute: ${serverNodes} Nodes (Dell/HPE 2U Clustering)
• Managed Optical Switching: ${switchPorts} x 10G/PoE+ Ports (Cisco/Fortinet Fabric)
• Environmental Telemetry: ${includeEnvSensors ? 'APC NetBotz (Water Leak + Temp/Humidity)' : 'None'}
• SLA Support Tier: ${slaTier === 'enterprise' ? 'Enterprise 24x7 (4-Hour Onsite Response)' : 'Standard 8x5 Next-Business-Day'}
• Estimated Total Rack Space: ${calculations.rackUnits}U across ${calculations.rackEnclosures} Rack Enclosure(s)
• Compliance Profile: ${calculations.complianceStandard}
Generated for JEB Innovations & Technologies Pte Ltd (jeb-int.com)`;
  }, [facilityType, cameraCount, retentionDays, calculations, doorCount, serverNodes, switchPorts, includeEnvSensors, slaTier]);

  const handleDownloadSpec = () => {
    const element = document.createElement('a');
    const file = new Blob([bomText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `JEB_VAR_Sizing_Specification_${facilityType}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(bomText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="solution-sizer" className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 border border-cyan-500/20">
            <Sliders className="h-3.5 w-3.5" />
            Interactive Engineering Tool
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            VAR Solution Sizer & Hardware BoM Configurator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Estimate your required storage bandwidth, compute nodes, and physical security footprint before procurement. Generates an instant Bill-of-Materials ready for executive sign-off.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sizer Controls (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm space-y-6">
            {/* 1. Facility Type */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
                1. Select Facility Profile
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'office', label: 'Commercial HQ', sub: '50-250 pax' },
                  { id: 'datacenter', label: 'Datacenter', sub: 'Colo / Server Rm' },
                  { id: 'logistics', label: 'Logistics Hub', sub: 'Industrial / Yard' },
                  { id: 'financial', label: 'Finance / Branch', sub: 'High Compliance' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFacilityType(item.id as any)}
                    className={`p-3 rounded-lg text-left border transition-all ${
                      facilityType === item.id
                        ? 'border-cyan-400 bg-cyan-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <p className="text-xs font-bold leading-none">{item.label}</p>
                    <p className="text-[10px] mt-1 text-slate-400 font-mono">{item.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Physical Security Sliders */}
            <div className="pt-4 border-t border-slate-800/80 space-y-5">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="h-4 w-4" /> Physical Security Parameters
              </span>

              {/* Cameras Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">4K IP CCTV Cameras</span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">{cameraCount} Channels</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="64"
                  step="4"
                  value={cameraCount}
                  onChange={(e) => setCameraCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>4 Cameras</span>
                  <span>32 Cameras</span>
                  <span>64 Cameras</span>
                </div>
              </div>

              {/* Retention Days */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Video Retention Archive</span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">{retentionDays} Days</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 60, 90, 180].map((days) => (
                    <button
                      key={days}
                      onClick={() => setRetentionDays(days)}
                      className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                        retentionDays === days
                          ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 font-bold'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Access Doors */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Biometric & RFID Access Doors</span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">{doorCount} Controlled Doors</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="32"
                  step="2"
                  value={doorCount}
                  onChange={(e) => setDoorCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* 3. IT Infrastructure Sliders */}
            <div className="pt-4 border-t border-slate-800/80 space-y-5">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Server className="h-4 w-4" /> Enterprise IT Infrastructure Parameters
              </span>

              {/* Server Nodes */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Enterprise Compute Server Nodes</span>
                  <span className="font-mono text-blue-400 font-bold tabular-nums">{serverNodes} Nodes (2U Clustering)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={serverNodes}
                  onChange={(e) => setServerNodes(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              {/* Network Switch Ports */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Managed 10G/PoE+ Switch Ports</span>
                  <span className="font-mono text-blue-400 font-bold tabular-nums">{switchPorts} Ports</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[24, 48, 96].map((ports) => (
                    <button
                      key={ports}
                      onClick={() => setSwitchPorts(ports)}
                      className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                        switchPorts === ports
                          ? 'border-blue-400 bg-blue-400/20 text-blue-300 font-bold'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {ports} Ports
                    </button>
                  ))}
                </div>
              </div>

              {/* Environmental Telemetry Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-white">Server Room Environmental Telemetry</p>
                  <p className="text-[11px] text-slate-400">APC NetBotz with water leak rope & rack thermal sensors</p>
                </div>
                <button
                  onClick={() => setIncludeEnvSensors(!includeEnvSensors)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                    includeEnvSensors
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {includeEnvSensors ? 'Included' : 'Omitted'}
                </button>
              </div>

              {/* SLA Tier */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  SLA Support Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSlaTier('standard')}
                    className={`p-2.5 rounded-lg text-left border transition-all ${
                      slaTier === 'standard'
                        ? 'border-cyan-400 bg-cyan-500/10 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <p className="text-xs font-bold">Standard 8x5</p>
                    <p className="text-[10px] text-slate-400">Next-Business-Day Spare Part</p>
                  </button>
                  <button
                    onClick={() => setSlaTier('enterprise')}
                    className={`p-2.5 rounded-lg text-left border transition-all ${
                      slaTier === 'enterprise'
                        ? 'border-cyan-400 bg-cyan-500/10 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <p className="text-xs font-bold text-cyan-300">Enterprise 24x7</p>
                    <p className="text-[10px] text-slate-400">4-Hour On-Site Engineer Response</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Bill of Materials Output (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                  JEB VAR SIZING RESULT
                </span>
                <h3 className="text-lg font-bold text-white">Estimated Architecture Specs</h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Calculated Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Required SAN/NVR</span>
                <span className="text-xl font-extrabold text-cyan-400 font-mono tabular-nums">
                  {calculations.storageTb} TB
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">RAID-6 + Hot Spares</span>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Rack Footprint</span>
                <span className="text-xl font-extrabold text-white font-mono tabular-nums">
                  {calculations.rackUnits}U
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  ({calculations.rackEnclosures} x 42U Enclosure)
                </span>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">PoE+ Power Budget</span>
                <span className="text-xl font-extrabold text-white font-mono tabular-nums">
                  ~{calculations.estimatedPoEWatts} W
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Network switches</span>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Support Level</span>
                <span className="text-xs font-bold text-cyan-300 font-mono block mt-1">
                  {slaTier === 'enterprise' ? '24/7 4h SLA' : '8x5 NBD SLA'}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Local SG Spares</span>
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="rounded-lg bg-cyan-950/30 p-3 border border-cyan-800/40 text-xs">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Compliance Standard Ready
              </div>
              <p className="mt-1 text-[11px] text-slate-300 font-mono">
                {calculations.complianceStandard}
              </p>
            </div>

            {/* Raw BoM Code Block */}
            <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed max-h-44 overflow-y-auto">
              <p className="text-cyan-400 font-bold mb-1">// Bill-of-Materials Summary</p>
              <p>• Optics: {cameraCount}x 4K AI Cameras ({retentionDays}d)</p>
              <p>• Storage: {calculations.storageTb}TB Usable SAN RAID-6</p>
              <p>• Doors: {doorCount}x Biometric/RFID Access Doors</p>
              <p>• Compute: {serverNodes}x Enterprise 2U Servers</p>
              <p>• Network: {switchPorts}x 10G/PoE+ Ports Fabric</p>
              <p>• Environment: {includeEnvSensors ? 'NetBotz Telemetry' : 'Omitted'}</p>
              <p>• SLA: {slaTier.toUpperCase()} Singapore Coverage</p>
            </div>

            {/* Actions: Transfer to quote form / Download */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onApplyToQuote(bomText)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors shadow-md shadow-cyan-950"
              >
                Apply to Quotation Request
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadSpec}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Download className="h-3.5 w-3.5 text-cyan-400" />
                  Download Spec
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <FileText className="h-3.5 w-3.5 text-cyan-400" />}
                  {copied ? 'Copied!' : 'Copy Spec'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
