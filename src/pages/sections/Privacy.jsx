import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("");

  // Table of Contents Data
  const toc = [
    { id: "applicability", label: "1. Applicability" },
    { id: "categories", label: "2. Data Collected" },
    { id: "purpose", label: "3. Purpose" },
    { id: "lawful-basis", label: "4. Lawful Basis" },
    { id: "sharing", label: "5. Sharing" },
    { id: "retention", label: "6. Retention" },
    { id: "security", label: "7. Security" },
    { id: "rights", label: "8. User Rights" },
    { id: "cookies", label: "9. Cookies" },
    { id: "cross-border", label: "10. Cross-Border" },
    { id: "children", label: "11. Children" },
    { id: "intermediary", label: "12. Intermediary" },
    { id: "updates", label: "13. Updates" },
  ];

  // Intersection Observer to highlight the active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -70% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-row relative">
       
       {/* =========================================
           1. CENTER CONTENT (Scrollable Text) 
           ========================================= */}
       <div className="flex-1 max-w-4xl pr-0 xl:pr-16 pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
              <Link to="/" className="hover:text-black">Home</Link> 
              <span className="text-gray-300">/</span>
              <span className="text-gray-800">Privacy Policy</span>
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">PRIVACY POLICY</h1>
          
          {/* Intro Block */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12 text-[15px] text-gray-600 leading-relaxed italic">
            Replateo Technologies (“Replateo”, “Company”, “we”, “us”, or “our”) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, store, process, disclose, and safeguard your personal information when you access or use our website, mobile application, and related services (collectively referred to as the “Platform”).
            <br /><br />
            This Privacy Policy is published in accordance with the provisions of the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Digital Personal Data Protection Act, 2023, as amended from time to time.
            <br /><br />
            By accessing or using the Platform, you consent to the practices described in this Privacy Policy.
          </div>

          <div className="space-y-16 text-gray-800">
             
             <section id="applicability" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Applicability and Scope</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   This Privacy Policy applies to all users of the Replateo Platform, including:
                 </p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>Individual Donors</li>
                     <li>Institutional Donors</li>
                     <li>NGOs and charitable organizations</li>
                     <li>Administrators</li>
                     <li>Visitors to our website</li>
                 </ul>
                 <p className="text-gray-600 leading-8">
                   This policy governs only the data collected by Replateo through its Platform and related electronic communications. It does not apply to information collected by third parties such as NGOs, external service providers, or linked websites.
                 </p>
             </section>

             <section id="categories" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Categories of Personal Data Collected</h3>
                 <p className="text-gray-600 leading-8 mb-6">
                   We collect only such information as is necessary for providing our services and ensuring platform integrity.
                 </p>
                 
                 <div className="bg-white border-l-4 border-[#ff4500] pl-6 py-2 mb-8">
                    <h4 className="font-bold text-gray-900 mb-2">2.1 Information You Voluntarily Provide</h4>
                    <p className="text-gray-600 leading-7 mb-2">When you register or interact with the Platform, we may collect:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                        <li>Full name, Mobile number, Email address</li>
                        <li>Organization name (for NGOs)</li>
                        <li>Registration certificates and legal documents (for NGO verification)</li>
                        <li>Government-issued identification (if required for compliance)</li>
                        <li>Address and geolocation data for pickup coordination</li>
                        <li>Profile photographs (if uploaded)</li>
                        <li>Communication records with support</li>
                    </ul>
                 </div>

                 <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h4 className="font-bold text-gray-900 mb-2">2.2 Information Automatically Collected</h4>
                    <p className="text-gray-600 leading-7 mb-2">When you use the Platform, we may automatically collect:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                        <li>IP address, Device identifiers</li>
                        <li>Browser type and version, Operating system</li>
                        <li>Access timestamps, Usage behavior and activity logs</li>
                        <li>Crash reports and diagnostics</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2 italic">This data helps improve security, reliability, and user experience.</p>
                 </div>

                 <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">2.3 Sensitive Personal Data</h4>
                    <p className="text-gray-600 leading-8">
                        Replateo does not intentionally collect sensitive personal data such as financial passwords, biometric data, or health records unless explicitly required for regulatory compliance. If such data is collected, it shall be processed strictly in accordance with applicable law.
                    </p>
                 </div>
             </section>

             <section id="purpose" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Purpose of Data Processing</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   We process personal information for legitimate and lawful purposes, including:
                 </p>
                 <ul className="grid md:grid-cols-2 gap-x-4 gap-y-2 list-disc pl-5 text-gray-600 leading-7 mb-6">
                     <li>Account creation and identity verification</li>
                     <li>NGO verification and compliance screening</li>
                     <li>Enabling food listing and claiming</li>
                     <li>Facilitating communication between users</li>
                     <li>Monitoring misuse and fraud prevention</li>
                     <li>Improving Platform functionality</li>
                     <li>Providing customer support</li>
                     <li>Sending transactional notifications</li>
                     <li>Legal compliance and regulatory reporting</li>
                     <li>Internal analytics and operational planning</li>
                 </ul>
                 <p className="text-gray-800 font-medium">We do not sell personal data to third parties.</p>
             </section>

             <section id="lawful-basis" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Lawful Basis for Processing</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   Personal data is processed on one or more of the following lawful grounds:
                 </p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-7">
                     <li>User consent</li>
                     <li>Performance of contractual obligations</li>
                     <li>Compliance with legal requirements</li>
                     <li>Legitimate interests of the Company</li>
                     <li>Protection of public interest and beneficiary welfare</li>
                 </ul>
             </section>

             <section id="sharing" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h3>
                 <p className="text-gray-600 leading-8 mb-6">Replateo may share data under the following conditions:</p>
                 
                 <div className="space-y-6">
                     <div>
                         <h4 className="font-bold text-gray-800">5.1 Between Platform Participants</h4>
                         <p className="text-gray-600 text-sm leading-6">Limited information such as name, contact number, and pickup location may be shared between donors and NGOs to facilitate coordination.</p>
                     </div>
                     <div>
                         <h4 className="font-bold text-gray-800">5.2 Service Providers</h4>
                         <p className="text-gray-600 text-sm leading-6">We may share information with third-party vendors for hosting, cloud storage, analytics, security monitoring, communication services, and technical support. Such vendors are contractually obligated to maintain confidentiality.</p>
                     </div>
                     <div>
                         <h4 className="font-bold text-gray-800">5.3 Regulatory Authorities</h4>
                         <p className="text-gray-600 text-sm leading-6">We may disclose personal data to law enforcement agencies, regulatory bodies, or government authorities where required by law.</p>
                     </div>
                     <div>
                         <h4 className="font-bold text-gray-800">5.4 Business Transfers</h4>
                         <p className="text-gray-600 text-sm leading-6">In the event of merger, acquisition, restructuring, or sale of assets, user data may be transferred subject to confidentiality safeguards.</p>
                     </div>
                 </div>
             </section>

             <section id="retention" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention Policy</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   Personal data shall be retained only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by applicable law.
                 </p>
                 <p className="text-gray-600 leading-8">
                   Inactive accounts may be retained for regulatory, fraud prevention, audit, and dispute resolution purposes.
                 </p>
             </section>

             <section id="security" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security Measures</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   We implement industry-standard technical and organizational safeguards including:
                 </p>
                 <ul className="grid md:grid-cols-2 gap-2 list-disc pl-5 text-gray-600 leading-7 mb-4">
                     <li>Encrypted data transmission (HTTPS/SSL)</li>
                     <li>Secure cloud infrastructure</li>
                     <li>Access control mechanisms</li>
                     <li>Role-based authentication</li>
                     <li>Audit logging</li>
                     <li>Periodic security assessments</li>
                 </ul>
                 <p className="text-gray-600 leading-8 italic">
                   Despite these measures, no digital system is completely immune from risk. Users acknowledge that data transmission over the internet involves inherent security risks.
                 </p>
             </section>

             <section id="rights" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">8. User Rights</h3>
                 <p className="text-gray-600 leading-8 mb-4">Subject to applicable law, users have the right to:</p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-7 mb-4">
                     <li>Access their personal information</li>
                     <li>Request correction of inaccurate data</li>
                     <li>Request deletion of personal data</li>
                     <li>Withdraw consent (where applicable)</li>
                     <li>Restrict or object to processing</li>
                     <li>Lodge complaints with regulatory authorities</li>
                 </ul>
                 <p className="text-gray-600 leading-8">Requests may be submitted through the Grievance Officer listed below.</p>
             </section>

             <section id="cookies" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h3>
                 <p className="text-gray-600 leading-8 mb-4">Replateo uses cookies and similar technologies to:</p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-7 mb-4">
                     <li>Maintain session authentication</li>
                     <li>Improve platform performance</li>
                     <li>Analyze user behavior</li>
                     <li>Enhance personalization</li>
                 </ul>
                 <p className="text-gray-600 leading-8">
                   Users may disable cookies through browser settings; however, certain functionalities may be impacted.
                 </p>
             </section>

             <section id="cross-border" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">10. Cross-Border Data Transfers</h3>
                 <p className="text-gray-600 leading-8">
                   If data is processed outside India for cloud hosting or technical operations, we ensure that such transfers comply with applicable data protection laws and include appropriate safeguards.
                 </p>
             </section>

             <section id="children" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">11. Children’s Privacy</h3>
                 <p className="text-gray-600 leading-8">
                   The Platform is not intended for individuals under eighteen (18) years of age. We do not knowingly collect personal data from minors. If such data is discovered, we will promptly delete it.
                 </p>
             </section>

             <section id="intermediary" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">12. Platform as an Intermediary</h3>
                 <p className="text-gray-600 leading-8">
                   Replateo functions solely as a digital intermediary connecting donors and NGOs. Once food is collected, NGOs assume responsibility for handling and redistribution. Replateo does not control third-party conduct and is not responsible for privacy practices of NGOs outside the Platform.
                 </p>
             </section>

             <section id="updates" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">13. Updates to This Privacy Policy</h3>
                 <p className="text-gray-600 leading-8">
                   We reserve the right to modify this Privacy Policy at any time. Updated versions will be published on the Platform with a revised “Last Updated” date. Continued use of the Platform constitutes acceptance of such changes.
                 </p>
             </section>

          </div>
       </div>

       {/* =========================================
           2. RIGHT SIDEBAR (Fixed/Sticky Table of Contents)
           ========================================= */}
       <div className="hidden xl:block w-72 flex-shrink-0 sticky top-0 self-start pt-2">
          <div className="border-l border-gray-200 pl-2 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-4">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pl-4 pt-2">
                  Table of Contents
              </h4>
              <nav className="flex flex-col">
                  {toc.map((item) => (
                    <a 
                      key={item.id} 
                      href={`#${item.id}`} 
                      className={`
                        text-[13px] py-2 px-4 block transition-all duration-200 border-l-2 -ml-[2px] leading-snug
                        ${activeSection === item.id 
                          ? "text-[#ff4500] font-bold border-[#ff4500] bg-orange-50/50" 
                          : "text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-50"}
                      `}
                    >
                      {item.label}
                    </a>
                  ))}
              </nav>
          </div>
       </div>

    </div>
  );
}