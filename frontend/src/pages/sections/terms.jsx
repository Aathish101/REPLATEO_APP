import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  const [activeSection, setActiveSection] = useState("");

  // Table of Contents Data
  const toc = [
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "services", label: "2. Description of Services" },
    { id: "eligibility", label: "3. Eligibility" },
    { id: "donor-responsibilities", label: "4. Donor Responsibilities" },
    { id: "ngo-responsibilities", label: "5. NGO Responsibilities" },
    { id: "admin-oversight", label: "6. Administrative Oversight" },
    { id: "prohibited", label: "7. Prohibited Conduct" },
    { id: "liability", label: "8. Limitation of Liability" },
    { id: "ip-rights", label: "9. IP Rights" },
    { id: "data-protection", label: "10. Data Protection" },
    { id: "suspension", label: "11. Suspension" },
    { id: "disclaimer", label: "12. Disclaimer" },
    { id: "force-majeure", label: "13. Force Majeure" },
    { id: "amendments", label: "14. Amendments" },
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
    <div className="min-h-screen bg-white py-16 px-6 lg:px-12">
         <div className="max-w-7xl mx-auto flex gap-12 relative"></div>
        
       
       {/* =========================================
           1. CENTER CONTENT (Scrollable Text) 
           ========================================= */}
       <div className="flex-1 max-w-4xl pr-0 xl:pr-16 pb-20">
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
              <Link to="/" className="hover:text-black">Home</Link> 
              <span className="text-gray-300">/</span>
              <span className="text-gray-800">Terms of Service</span>
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">TERMS AND CONDITIONS</h1>
          
          {/* Introduction Block */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12 text-[15px] text-gray-600 leading-relaxed italic">
            This document is an electronic record as defined in the Information Technology Act, 2000, and the applicable rules thereunder, including the amended provisions about electronic records in various statutes as amended from time to time. This document is published in accordance with Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, which mandate publishing the rules and regulations, privacy policy, and Terms of Use for access or usage of the Replateo website and mobile applications.
          </div>

          <div className="space-y-16 text-gray-800">
             
             <section id="acceptance" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   These Terms and Conditions (“Terms”) govern the access to and use of the Replateo website, mobile application, and related services (collectively referred to as the “Platform”). The Platform is owned and operated by Replateo Technologies, a company incorporated under the laws of India, having its registered office at [Insert Registered Address].
                 </p>
                 <p className="text-gray-600 leading-8 mb-4">
                   By accessing, browsing, registering, downloading, installing, or otherwise using the Platform, you agree to be legally bound by these Terms and all policies referenced herein. If you do not agree to these Terms, you must immediately discontinue use of the Platform.
                 </p>
                 <p className="text-gray-600 leading-8">
                   For these Terms, the expressions “you”, “user”, “donor”, or “NGO” shall mean any individual or legal entity accessing or registered on the Platform. The expressions “Replateo”, “we”, “us”, or “our” shall mean Replateo Technologies.
                 </p>
             </section>

             <section id="services" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   Replateo operates as a digital intermediary platform that facilitates the redistribution of surplus food from individuals, restaurants, institutions, caterers, and other food providers (“Donors”) to verified non-governmental organisations (“NGOs”) for charitable redistribution to beneficiaries.
                 </p>
                 
                 <div className="grid md:grid-cols-2 gap-6 mt-6">
                     <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                         <h4 className="font-bold text-[#ff4500] mb-3 uppercase text-xs tracking-wider">The Platform Enables</h4>
                         <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-6">
                             <li>Listing of surplus food by donors</li>
                             <li>Claiming of listings by verified NGOs</li>
                             <li>Communication and coordination between users</li>
                             <li>Administrative monitoring and moderation</li>
                         </ul>
                     </div>
                     <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                         <h4 className="font-bold text-gray-800 mb-3 uppercase text-xs tracking-wider">Replateo Does Not</h4>
                         <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-6">
                             <li>Manufacture, prepare, package, or store food</li>
                             <li>Physically transport food</li>
                             <li>Take ownership of food listings</li>
                             <li>Guarantee redistribution</li>
                         </ul>
                     </div>
                 </div>
                 <p className="text-gray-500 text-sm mt-4 italic">
                    The Platform acts solely as a technology facilitator and coordination infrastructure.
                 </p>
             </section>

             <section id="eligibility" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility and Account Registration</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   Access to the Platform is available only to individuals who are capable of entering into legally binding contracts under the Indian Contract Act, 1872. Individuals under eighteen (18) years of age are not permitted to register.
                 </p>
                 
                 <div className="mb-4">
                    <h4 className="font-bold text-gray-800 mb-2">NGOs registering on the Platform must:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-7">
                        <li>Be legally recognised entities.</li>
                        <li>Provide valid registration documentation.</li>
                        <li>Comply with applicable laws governing charitable operations.</li>
                    </ul>
                 </div>

                 <p className="text-gray-600 leading-8">
                   Replateo reserves the right to approve, reject, suspend, or revoke any registration at its sole discretion without prior notice. Users agree to provide accurate, current, and complete information and to update such information as necessary.
                 </p>
             </section>

             <section id="donor-responsibilities" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Donor Responsibilities</h3>
                 <p className="text-gray-600 leading-8 mb-3">
                   Donors listing food on the Platform represent and warrant that:
                 </p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>The food is safe for human consumption at the time of listing and handover.</li>
                     <li>The food has been prepared and stored in hygienic conditions.</li>
                     <li>Accurate details are provided regarding preparation time, ingredients, allergen information, quantity, and expiration date.</li>
                     <li>The food complies with applicable food safety and hygiene regulations.</li>
                 </ul>
                 <p className="text-gray-600 leading-8 font-medium">
                    Donors acknowledge that they remain fully responsible for the condition and legality of food until it is handed over to the claiming NGO.
                 </p>
             </section>

             <section id="ngo-responsibilities" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">5. NGO Responsibilities</h3>
                 <p className="text-gray-600 leading-8 mb-3">NGOs claiming listings agree that:</p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>Food will be collected within the specified timeframe.</li>
                     <li>Proper transportation standards will be maintained.</li>
                     <li>Redistribution will occur in compliance with applicable health and safety regulations.</li>
                     <li>Beneficiaries will be informed of relevant consumption details where necessary.</li>
                 </ul>
                 <p className="text-gray-600 leading-8">
                   Upon collection, NGOs assume full responsibility for storage, handling, and redistribution of the food.
                 </p>
             </section>

             <section id="admin-oversight" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Administrative Oversight</h3>
                 <p className="text-gray-600 leading-8 mb-3">
                   Replateo may monitor listings, claims, and user activity for compliance purposes. The Platform reserves the right to:
                 </p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>Remove or modify listings.</li>
                     <li>Suspend or terminate accounts.</li>
                     <li>Request additional verification documents.</li>
                     <li>Deny access in cases of suspected misuse.</li>
                 </ul>
                 <p className="text-gray-600 leading-8 italic">
                    Administrative decisions are final and made to protect platform integrity.
                 </p>
             </section>

             <section id="prohibited" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Conduct</h3>
                 <p className="text-gray-600 leading-8 mb-3">Users shall not:</p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>Post false, misleading, or harmful information.</li>
                     <li>Misrepresent food quality or safety.</li>
                     <li>Engage in fraudulent, unlawful, or harmful activities.</li>
                     <li>Attempt to bypass platform processes</li>
                     <li>Interfere with platform security or functionality.</li>
                 </ul>
                 <p className="text-red-600 font-medium mt-2">
                    Violation of these provisions may result in immediate suspension or termination.
                 </p>
             </section>

             <section id="liability" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h3>
                 <p className="text-gray-600 leading-8 mb-4">
                   Replateo functions solely as an intermediary and does not assume responsibility for the safety, quality, or suitability of any food listed or redistributed.
                 </p>
                 <h4 className="font-bold text-gray-800 mb-2">Replateo shall not be liable for:</h4>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>Foodborne illness</li>
                     <li>Injury or health complications</li>
                     <li>Loss of property</li>
                     <li>Operational delays</li>
                     <li>Disputes between users</li>
                 </ul>
                 <p className="text-gray-600 leading-8">
                   Users agree to indemnify and hold harmless Replateo, its directors, employees, and affiliates from any claims, damages, liabilities, costs, or legal expenses arising from use of the Platform or violation of these Terms.
                 </p>
             </section>

             <section id="ip-rights" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property Rights</h3>
                 <p className="text-gray-600 leading-8 mb-3">
                   All content, software, trademarks, logos, graphics, design elements, and branding associated with the Platform are the exclusive property of Replateo or its licensors.
                 </p>
                 <p className="text-gray-600 leading-8">
                   Users shall not copy, reproduce, distribute, reverse engineer, or exploit any intellectual property without prior written consent.
                 </p>
             </section>

             <section id="data-protection" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">10. Data Protection and Privacy</h3>
                 <p className="text-gray-600 leading-8 mb-3">
                   Replateo collects and processes user data in accordance with its Privacy Policy and applicable data protection laws.
                 </p>
                 <h4 className="font-bold text-gray-800 mb-2">By using the Platform, users consent to:</h4>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>Collection of registration details</li>
                     <li>Storage of transaction records</li>
                     <li>Communication via notifications and emails</li>
                     <li>Use of anonymised data for analytics</li>
                 </ul>
                 <p className="text-gray-600 leading-8">
                   Replateo implements reasonable security measures but does not guarantee absolute security.
                 </p>
             </section>

             <section id="suspension" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">11. Suspension and Termination</h3>
                 <p className="text-gray-600 leading-8 mb-3">
                   Replateo reserves the right to suspend or terminate user accounts at its discretion in cases of:
                 </p>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4 leading-7">
                     <li>Violation of Terms</li>
                     <li>Fraudulent conduct</li>
                     <li>Regulatory non-compliance</li>
                     <li>Harmful activity</li>
                 </ul>
                 <p className="text-gray-600 leading-8">Termination does not limit Replateo’s right to pursue legal remedies.</p>
             </section>

             <section id="disclaimer" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">12. Disclaimer of Warranties</h3>
                 <p className="text-gray-600 leading-8">
                   The Platform is provided on an “as-is” and “as-available” basis. Replateo makes no warranties, express or implied, regarding uninterrupted access, accuracy, reliability, or suitability of services.
                 </p>
             </section>

             <section id="force-majeure" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">13. Force Majeure</h3>
                 <p className="text-gray-600 leading-8">
                   Replateo shall not be liable for failure or delay in performance due to events beyond its reasonable control, including natural disasters, government actions, internet failures, pandemics, or other unforeseen circumstances.
                 </p>
             </section>

             <section id="amendments" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">14. Amendments</h3>
                 <p className="text-gray-600 leading-8">
                   Replateo reserves the right to modify these Terms at any time. Updated Terms shall be effective upon publication. Continued use of the Platform constitutes acceptance of revised Terms.
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