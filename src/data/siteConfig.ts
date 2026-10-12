/**
 * Site Configuration & Content Repository
 * JEB Innovations & Technologies Pte Ltd
 * 
 * To update the website content in the future, simply edit the fields in this file!
 * All texts, contact details, services, vendor partners, case studies, and FAQs
 * are centrally defined here.
 */

export interface VendorPartner {
  name: string;
  category: 'compute_storage' | 'networking_cyber' | 'physical_security' | 'access_control' | 'software';
  tagline: string;
  tier: string;
  logoText: string;
}

export interface ServicePillar {
  id: string;
  category: 'it' | 'physical' | 'var_services';
  title: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  techStack: string[];
  metrics: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  clientType: string;
  location: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  tag: string;
}

export interface SiteConfig {
  company: {
    legalName: string;
    tradeName: string;
    domain: string;
    registrationNumber: string;
    tagline: string;
    description: string;
    foundedYear: string;
    headquarters: {
      building: string;
      unit: string;
      street: string;
      country: string;
      postalCode: string;
      fullAddress: string;
      region: string;
    };
    contact: {
      primaryEmail: string;
      salesEmail: string;
      supportEmail: string;
      phone: string;
      whatsapp: string;
      operatingHours: string;
    };
  };
  navigation: {
    label: string;
    href: string;
  }[];
  hero: {
    kicker: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { value: string; label: string; detail: string }[];
  };
  services: ServicePillar[];
  partners: VendorPartner[];
  caseStudies: CaseStudy[];
  faqs: { question: string; answer: string }[];
}

export const initialSiteConfig: SiteConfig = {
  company: {
    legalName: "JEB Innovations & Technologies Pte Ltd",
    tradeName: "JEB Innovations & Technologies",
    domain: "jeb-int.com",
    registrationNumber: "Singapore UEN Registered",
    tagline: "Enterprise IT Systems & Physical Security Converged",
    description: "JEB Innovations & Technologies Pte Ltd is a premier Singapore IT Value-Added Reseller (VAR) delivering enterprise compute, optical networking, AI-driven CCTV surveillance, and biometric access control.",
    foundedYear: "2015",
    headquarters: {
      building: "Vision Exchange",
      unit: "#14-02",
      street: "2 Venture Drive",
      country: "Singapore",
      postalCode: "608526",
      fullAddress: "2 Venture Drive, #14-02 Vision Exchange, Singapore 608526",
      region: "Jurong Lake District commercial hub"
    },
    contact: {
      primaryEmail: "jon.bong@jeb-int.co",
      salesEmail: "sales@jeb-int.com",
      supportEmail: "support@jeb-int.com",
      phone: "+65 6890 1288",
      whatsapp: "+65 9123 4567",
      operatingHours: "Mon – Fri: 09:00 – 18:00 SGT (24/7 SLA for contracted clients)"
    }
  },
  navigation: [
    { label: "Solutions", href: "#solutions" },
    { label: "Physical Security", href: "#physical-security" },
    { label: "IT Infrastructure", href: "#it-infrastructure" },
    { label: "VAR Sizer", href: "#solution-sizer" },
    { label: "Partners", href: "#partners" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    kicker: "SINGAPORE VALUE-ADDED RESELLER (VAR)",
    title: "Enterprise IT Infrastructure & Physical Security",
    highlight: "Converged Under One Roof.",
    subtitle: "We engineer, procure, deploy, and maintain mission-critical technology for Singapore and regional enterprises. From high-density datacenter infrastructure to intelligent AI surveillance and biometric access.",
    primaryCta: "Request VAR Quotation",
    secondaryCta: "Configure Solution Sizer",
    stats: [
      { value: "24/7", label: "SLA Response", detail: "Mission-critical emergency support" },
      { value: "40+", label: "Enterprise Brands", detail: "Direct OEM reseller partnerships" },
      { value: "100%", label: "Compliance Ready", detail: "IM8, PDPA & BCA security standards" },
      { value: "Tier-3", label: "Datacenter Spec", detail: "Turnkey compute & physical access" }
    ]
  },
  services: [
    {
      id: "it-infra",
      category: "it",
      title: "Enterprise IT Systems & Compute",
      shortDesc: "High-density server nodes, SAN/NAS storage architectures, and hyperconverged infrastructure engineered for maximum uptime.",
      fullDesc: "As an authorized VAR, we specify, supply, and rack-mount enterprise compute platforms from Dell Technologies, HPE, Lenovo, and Supermicro. Complete with hardware burn-in testing, RAID validation, and redundant power staging.",
      capabilities: [
        "Rackmount & Blade Server Clusters",
        "All-Flash SAN & High-Capacity NAS Storage",
        "Hyperconverged Infrastructure (HCI)",
        "Hardware Staging, Burn-In & On-Site Installation",
        "Automated Backup & Disaster Recovery RTO/RPO"
      ],
      techStack: ["Dell PowerEdge", "HPE ProLiant", "Lenovo ThinkSystem", "Synology Enterprise", "Veeam"],
      metrics: "99.999% Target Hardware Availability",
      iconName: "Server"
    },
    {
      id: "physical-surveillance",
      category: "physical",
      title: "Commercial IP CCTV & Video Intelligence",
      shortDesc: "Enterprise optical surveillance, thermal detection, and AI Video Management Systems (VMS) with long-term retention arrays.",
      fullDesc: "Complete optical perimeter and indoor security architectures. High-resolution optical zoom, perimeter tripwire analytics, license plate recognition (LPR), and compliant high-retention video storage arrays engineered for 30 to 90 days retention.",
      capabilities: [
        "High-Definition 4K & Panoramic Multi-Sensor Cameras",
        "VMS Management Platforms (Milestone, Axis, Hanwha)",
        "AI Edge Analytics & Automated Intrusion Alerts",
        "High-Density NVR / Storage SAN Enclosures",
        "Centralized Multi-Site Security Operations Center (SOC)"
      ],
      techStack: ["Milestone XProtect", "Axis Communications", "Hanwha Vision", "Hikvision Enterprise", "Network Storage"],
      metrics: "Sub-second Motion & Perimeter Detection",
      iconName: "Camera"
    },
    {
      id: "access-control",
      category: "physical",
      title: "Biometric & RFID Access Control",
      shortDesc: "Fail-secure biometric turnstiles, smart card readers, and centralized multi-door access management controllers.",
      fullDesc: "Control and audit physical access across server rooms, executive suites, and building perimeters. We deploy multi-factor biometric authentication, anti-passback logic, time-attendance synchronization, and emergency lockdown relays.",
      capabilities: [
        "Biometric Facial Recognition & Fingerprint Scanners",
        "Encrypted RFID / Mifare DESFire & Mobile Credentials",
        "Speed Gates, Full-Height Turnstiles & Magnetic Locks",
        "Server Room Interlock Doors & Dual-Custody Access",
        "Audit Trail Logging compliant with ISO 27001 & IM8"
      ],
      techStack: ["Suprema", "HID Global", "Nedap", "ZKTeco Pro", "Gallagher"],
      metrics: "0.2s Authentication Speed with Zero Spoofing",
      iconName: "KeyRound"
    },
    {
      id: "cyber-networking",
      category: "it",
      title: "Core Networking & Perimeter Cybersecurity",
      shortDesc: "10G/25G/100G optical switching, enterprise Wi-Fi 7, SD-WAN, and Next-Generation Firewalls (NGFW).",
      fullDesc: "Resilient network backbone architecture designed for low latency, zero packet loss, and zero-trust perimeter security. From structured fiber cabling to redundant core routing and encrypted site-to-site tunnels.",
      capabilities: [
        "Core, Distribution & Access Layer Optical Switching",
        "Next-Generation Firewalls (NGFW) & SSL Inspection",
        "Secure High-Density Corporate Wi-Fi 6E/7 Deployments",
        "Software-Defined WAN (SD-WAN) & Multi-Homed Routing",
        "VLAN Segmentation isolating IT and CCTV IoT Traffic"
      ],
      techStack: ["Cisco Catalyst", "Fortinet FortiGate", "Aruba Networks", "Palo Alto Networks", "MikroTik"],
      metrics: "Zero-Loss Switching & 100Gbps Backplanes",
      iconName: "ShieldAlert"
    },
    {
      id: "env-monitoring",
      category: "physical",
      title: "Server Room Environmental Telemetry",
      shortDesc: "Continuous IoT monitoring for temperature, humidity, water leak detection, smoke, and UPS power health.",
      fullDesc: "Protect mission-critical server racks and data rooms against physical environmental hazards. Automated alerts via SMS, email, and Webhook when thermal thresholds exceed safe parameters or water intrusion is detected.",
      capabilities: [
        "Spot & Rope Water Leak Detection Sensors",
        "Precision Rack Temperature & Relative Humidity Probes",
        "UPS Battery Telemetry & Automated Clean Shutdown",
        "Dry Contact Integration with Fire Suppression Systems",
        "Single-Pane-of-Glass IoT Dashboard & Historical Logs"
      ],
      techStack: ["Schneider APC NetBotz", "Vertiv Geist", "Sensaphone", "HW group", "Modbus / SNMP"],
      metrics: "Instantaneous Hazard Notification (<3s)",
      iconName: "Cpu"
    },
    {
      id: "var-lifecycle",
      category: "var_services",
      title: "VAR Sizing, Licensing & Turnkey Engineering",
      shortDesc: "End-to-end bill-of-materials sizing, Tier-1 OEM pricing advantage, staging, deployment, and ongoing SLA maintenance.",
      fullDesc: "As an IT Value-Added Reseller, we provide more than boxed hardware. We offer certified pre-sales architectural design, direct vendor quote optimization, on-site staging and installation, and reliable ongoing warranty management.",
      capabilities: [
        "Comprehensive Bill-of-Materials (BoM) Engineering",
        "Directory & Admin Software Licensing (LDAP, Microsoft)",
        "On-Premise Staging & Clean Cabling Integration",
        "Comprehensive As-Built Documentation & User Handover",
        "4-Hour On-Site SLA Maintenance & Spares Management"
      ],
      techStack: ["Softerra LDAP", "Microsoft OEM", "Red Hat Enterprise", "BCA Certified Wiring", "SLA Desk"],
      metrics: "4-Hour Critical Spare Part Dispatch SLA",
      iconName: "Wrench"
    }
  ],
  partners: [
    { name: "Dell Technologies", category: "compute_storage", tagline: "PowerEdge Servers & PowerStore SAN", tier: "Enterprise Partner", logoText: "DELL" },
    { name: "Cisco Systems", category: "networking_cyber", tagline: "Catalyst Switches & Secure Routing", tier: "Certified Reseller", logoText: "CISCO" },
    { name: "Fortinet", category: "networking_cyber", tagline: "FortiGate NGFW & Security Fabric", tier: "Authorized Partner", logoText: "FORTINET" },
    { name: "Milestone Systems", category: "physical_security", tagline: "Open Platform VMS & Video Analytics", tier: "VMS Gold Reseller", logoText: "MILESTONE" },
    { name: "Axis Communications", category: "physical_security", tagline: "Network Video & Perimeter Optics", tier: "Solution Partner", logoText: "AXIS" },
    { name: "Suprema", category: "access_control", tagline: "Biometric Access Control & Time Attendance", tier: "Authorized Integrator", logoText: "SUPREMA" },
    { name: "HID Global", category: "access_control", tagline: "Mobile Credentials & Physical RFID Security", tier: "Certified Partner", logoText: "HID" },
    { name: "HPE", category: "compute_storage", tagline: "ProLiant Servers & Nimble Storage", tier: "OEM Reseller", logoText: "HPE" },
    { name: "Hanwha Vision", category: "physical_security", tagline: "AI Surveillance & Multi-Directional CCTV", tier: "Security Partner", logoText: "HANWHA" },
    { name: "Softerra", category: "software", tagline: "LDAP Administrator & Identity Management", tier: "Authorized Reseller", logoText: "SOFTERRA" },
    { name: "APC by Schneider", category: "compute_storage", tagline: "Smart-UPS & Datacenter NetBotz", tier: "Infrastructure Partner", logoText: "APC" },
    { name: "Veeam", category: "software", tagline: "Enterprise Backup & Ransomware Recovery", tier: "ProPartner", logoText: "VEEAM" }
  ],
  caseStudies: [
    {
      id: "cs-1",
      clientType: "Regional Financial Services Institution",
      location: "Raffles Place, Singapore",
      challenge: "Required an immediate upgrade of dual redundant 10Gbps core network switching and high-security biometric physical access for their trading floor and server room.",
      solution: "JEB supplied and staged Cisco Catalyst redundant fabrics paired with Suprema multi-factor biometric facial recognition, complete with an IM8-compliant audit log trail.",
      impactMetrics: [
        { label: "Hardware Availability", value: "99.999%" },
        { label: "Biometric Verify Time", value: "< 0.3s" },
        { label: "Turnaround Time", value: "3 Weeks" }
      ],
      tag: "Converged IT & Biometrics"
    },
    {
      id: "cs-2",
      clientType: "Multi-Store Commercial Logistics Hub",
      location: "Jurong Industrial Estate, Singapore",
      challenge: "Client struggled with blind spots and disparate CCTV equipment across a 120,000 sq ft warehouse, causing inventory disputes and slow security review.",
      solution: "Designed and deployed a unified 64-channel 4K Axis and Hanwha IP camera array powered by Milestone XProtect, backed by a 90-day RAID storage system.",
      impactMetrics: [
        { label: "Site Coverage", value: "100%" },
        { label: "Incident Resolution", value: "-75% Time" },
        { label: "Storage Retention", value: "90 Days" }
      ],
      tag: "AI Video Intelligence"
    },
    {
      id: "cs-3",
      clientType: "Biomedical & Research Cleanroom Facility",
      location: "Tuas Biomedical Park, Singapore",
      challenge: "Strict cleanroom environment demanded non-contact physical access, precise thermal/humidity environmental logging, and separate IT/IoT VLANs.",
      solution: "Implemented touchless facial recognition turnstiles, APC NetBotz environmental sensory telemetry, and Fortinet segmented networks.",
      impactMetrics: [
        { label: "Regulatory Compliance", value: "100% Passed" },
        { label: "Telemetry Drift Alerts", value: "Real-time" },
        { label: "Support Response", value: "< 2 Hours" }
      ],
      tag: "Cleanroom Physical & Environmental"
    }
  ],
  faqs: [
    {
      question: "What does an IT Value-Added Reseller (VAR) do compared to a direct retailer?",
      answer: "A standard retailer simply sells packaged boxes. As an IT VAR, JEB Innovations & Technologies provides certified architecture sizing, manufacturer enterprise pricing discounts, on-site hardware burn-in testing, rack integration, structured cabling, and 24/7 post-installation maintenance SLA support."
    },
    {
      question: "Can JEB converge both physical security and IT networking together?",
      answer: "Yes, this is our core specialization! Rather than hiring separate vendors for CCTV/access doors and your network switches/servers, JEB designs the entire architecture. We ensure your IP security cameras and access controllers are properly VLAN-segmented, powered with PoE+ switches, and recorded on reliable enterprise storage without choking corporate LAN bandwidth."
    },
    {
      question: "Are your installations compliant with Singapore regulations (PDPA, IM8, BCA)?",
      answer: "Absolutely. Our surveillance data storage and biometric access logs are engineered to satisfy Singapore Personal Data Protection Act (PDPA) privacy regulations, Government IM8 security hygiene standards, and building safety fire-escape override requirements."
    },
    {
      question: "Where is JEB Innovations & Technologies located?",
      answer: "Our registered office and engineering headquarters is at 2 Venture Drive, #14-02 Vision Exchange, Singapore 608526, strategically situated in the Jurong Lake District commercial hub."
    },
    {
      question: "How do we request a quotation or technical site survey?",
      answer: "You can submit an inquiry directly through our website contact form, launch the interactive VAR Solution Sizer tool, or contact Jon Bong directly at jon.bong@jeb-int.co. Our engineering team responds within one business day."
    }
  ]
};
