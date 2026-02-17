import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Guidelines() {
  const [activeSection, setActiveSection] = useState("");

  // Table of Contents Data
  const toc = [
    { id: "about", label: "1. About Replateo" },
    { id: "vision", label: "2. Vision and Mission" },
    { id: "eligibility", label: "3. Eligibility and Registration" },
    { id: "nature", label: "4. Nature of Services" },
    { id: "standards", label: "5. Food Listing Standards" },
    { id: "acceptance", label: "6. Acceptance and Pickup Process" },
    { id: "distribution", label: "7. Distribution Responsibilities" },
    { id: "safety", label: "8. Food Safety and Legal Compliance" },
    { id: "conduct", label: "9. User Conduct and Ethical Standards" },
    { id: "records", label: "10. Digital Records and Monitoring" },
    { id: "liability", label: "11. Limitation of Liability" },
    { id: "suspension", label: "12. Suspension and Termination" },
    { id: "data", label: "13. Data Protection and Privacy" },
    { id: "reporting", label: "14. Reporting and Support" },
    { id: "amendments", label: "15. Amendments to Guidelines" },
    { id: "indemnification", label: "17. Indemnification" },
    { id: "force-majeure", label: "18. Force Majeure" },
    { id: "ip", label: "19. Intellectual Property Rights" },
    { id: "disputes", label: "20. Dispute Resolution" },
    { id: "grievance", label: "21. Grievance Redressal Mechanism" },
    { id: "severability", label: "22. Severability" },
    { id: "entire-agreement", label: "23. Entire Agreement" },
  ];

  // Intersection Observer to highlight the active section in the Right Sidebar
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
    // Changed to relative to allow sticky children
    <div className="w-full flex flex-row relative">
      
      {/* ========================================= */}
      {/* 1. CENTER CONTENT (The Guidelines Text)     */}
      {/* ========================================= */}
      <div className="flex-1 max-w-4xl pr-0 xl:pr-16 pb-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
          <Link to="/" className="hover:text-black">Home</Link> 
          <span className="text-gray-300">/</span>
          <span className="text-gray-800">Guidelines and Policies</span>
        </div>

        {/* Main Title & Intro */}
        <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
          Guidelines and Terms of Use
        </h1>
        
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12 text-[15px] text-gray-600 leading-relaxed italic">
          These Guidelines govern the access and use of the Replateo application and website. By registering on, accessing, or using the platform, users expressly agree to comply with the policies, responsibilities, and operational standards outlined in this document, along with all applicable laws and regulatory requirements in India. These Guidelines are intended to create a structured, transparent, and legally compliant environment for surplus food redistribution while protecting all participating stakeholders.
        </div>

        <div className="space-y-14">
          
          <section id="about" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. About Replateo</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Replateo is a technology-enabled coordination platform developed to address the growing issue of surplus food wastage in India. The platform connects verified caterers who generate excess food after events with registered NGOs capable of redistributing that food responsibly to individuals and communities in need. Replateo facilitates structured communication, digital acceptance, pickup confirmation, and impact tracking through a secure and traceable system.
            </p>
            <p className="text-gray-600 leading-8 font-medium">
              It is important to clarify that Replateo <strong className="text-gray-900">does not prepare, cook, modify, inspect, store, transport, or distribute food.</strong> The platform acts solely as an intermediary that enables coordination between independent parties. Operational responsibility, including compliance with food safety standards, remains entirely with the respective users of the platform.
            </p>
          </section>

          <section id="vision" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Vision and Mission</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Replateo envisions a society in which no safe and edible food is unnecessarily discarded while communities continue to face hunger and food insecurity. The long-term vision is to create a responsible ecosystem where surplus food redistribution becomes structured, compliant, and socially impactful across India.
            </p>
            <p className="text-gray-600 leading-8">
              Our mission is to leverage technology to reduce post-event food waste, strengthen accountability between donors and receivers, promote awareness of food safety standards, and encourage ethical redistribution practices. Through consistent digital monitoring and impact tracking, Replateo aims to build trust, transparency, and measurable social value within the food redistribution process.
            </p>
          </section>

          <section id="eligibility" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility and Registration</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Access to the platform is restricted to legally operating catering businesses and verified NGOs or charitable organizations. During registration, users must provide accurate, complete, and verifiable information, including business identification, organizational credentials, and contact details.
            </p>
            <p className="text-gray-600 leading-8 mb-4">
              Caterers are expected to comply with the Food Safety and Standards Act, 2006, and maintain valid FSSAI registration or licensing wherever applicable. NGOs must be legally recognized entities capable of arranging safe transportation and ethical food distribution.
            </p>
            <p className="text-gray-600 leading-8">
              Replateo reserves the absolute right to review submitted information, conduct verification checks, approve or reject applications, and suspend or revoke registration if any information is found to be inaccurate, misleading, incomplete, or non-compliant with applicable regulations.
            </p>
          </section>

          <section id="nature" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Nature of Services</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Replateo provides a digital infrastructure that enables surplus food listings, real-time notifications to nearby NGOs, structured acceptance workflows, and transparent confirmation mechanisms. The system records timestamps, listing details, acceptance data, pickup confirmation, and distribution confirmation to maintain accountability.
            </p>
            <p className="text-gray-600 leading-8">
              The platform does not supervise on-ground activities or physically verify food quality. It does not function as a logistics provider or a food handling entity. All physical handling, storage, transport, and final distribution activities are carried out independently by the registered users. Replateo’s role remains limited to providing digital facilitation and documentation of the process.
            </p>
          </section>

          <section id="standards" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Food Listing Standards</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Caterers are fully responsible for ensuring that only freshly prepared, safe, and unserved surplus food is listed on the platform. Each listing must clearly and accurately specify the type of food, approximate quantity, preparation time, and pickup location. Transparency in information is essential to enable NGOs to make informed decisions.
            </p>
            <p className="text-gray-600 leading-8 font-medium">
              Food must be stored under hygienic conditions and packaged securely prior to pickup to prevent contamination. <strong className="text-gray-900">Expired, spoiled, partially consumed, mishandled, or contaminated food must never be listed.</strong> Any misrepresentation regarding food quality, quantity, or preparation timing may lead to immediate suspension, investigation, and potential permanent removal from the platform.
            </p>
          </section>

          <section id="acceptance" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptance and Pickup Process</h2>
            <p className="text-gray-600 leading-8 mb-4">
              NGOs must carefully review all listing details, including preparation time and quantity, before accepting a request. Acceptance should occur only when the organization has the confirmed ability to arrange pickup within the safe consumption window and manage transportation hygienically.
            </p>
            <p className="text-gray-600 leading-8">
              Upon acceptance, the NGO assumes responsibility for arranging transportation, ensuring safe handling during loading, and maintaining cleanliness during transit. If pickup cannot occur within the required timeframe due to operational constraints, the NGO must promptly decline the request so that the listing becomes available to other eligible organizations. Failure to adhere to pickup timelines may impact platform credibility and food safety standards.
            </p>
          </section>

          <section id="distribution" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Distribution Responsibilities</h2>
            <p className="text-gray-600 leading-8 mb-4">
              After pickup confirmation, the NGO assumes full operational and legal responsibility for the safe storage, handling, and distribution of the food. Distribution must be conducted ethically, with a primary focus on serving vulnerable individuals or communities in genuine need.
            </p>
            <p className="text-gray-600 leading-8 font-medium">
              <strong className="text-gray-900">Under no circumstances may donated food be resold, exchanged for financial gain, or used for commercial purposes.</strong> NGOs must maintain hygiene during distribution and ensure that food is served within safe time limits. Digital confirmation of distribution completion must be recorded in the platform to maintain accurate impact data and transparency.
            </p>
          </section>

          <section id="safety" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Food Safety and Legal Compliance</h2>
            <p className="text-gray-600 leading-8 mb-4">
              All users are required to comply with applicable Indian laws, including but not limited to the Food Safety and Standards Act, 2006, FSSAI regulations, and relevant municipal health guidelines. Users must independently ensure adherence to temperature control standards, safe handling practices, and hygiene requirements.
            </p>
            <p className="text-gray-600 leading-8">
              Responsibility for food safety rests with the caterer until the moment of pickup. Upon pickup, responsibility transfers entirely to the NGO. Replateo does not guarantee, certify, or inspect the food and does not assume liability for any health consequences arising from non-compliance by users. Each party remains independently accountable under applicable law.
            </p>
          </section>

          <section id="conduct" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Conduct and Ethical Standards</h2>
            <p className="text-gray-600 leading-8 mb-4">
              All users are expected to conduct themselves with professionalism, honesty, and respect when interacting through the platform. False declarations, fraudulent listings, harassment, misrepresentation, or misuse of donated food are strictly prohibited.
            </p>
            <p className="text-gray-600 leading-8">
              Users must refrain from engaging in unlawful activities, financial misconduct, or actions that may damage the credibility of the platform. Replateo reserves the right to investigate complaints, request clarification, and suspend or terminate accounts involved in unethical or unlawful conduct without prior notice in cases of serious violations.
            </p>
          </section>

          <section id="records" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Digital Records and Monitoring</h2>
            <p className="text-gray-600 leading-8 mb-4">
              To maintain transparency and operational accountability, Replateo records digital logs of all platform activities, including listing creation, timestamps, acceptance records, pickup confirmations, distribution confirmations, and impact metrics such as estimated meals served.
            </p>
            <p className="text-gray-600 leading-8">
              These records may be reviewed internally for compliance monitoring, reporting, dispute resolution, and performance analysis. The existence of digital records promotes responsible participation and helps ensure traceability in case of operational or legal concerns.
            </p>
          </section>

          <section id="liability" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Replateo operates strictly as a digital coordination service and does not assume liability for the preparation, safety, storage, transport, or distribution of food. Any damages, health risks, losses, or claims arising from improper handling or non-compliance with food safety regulations remain the sole responsibility of the respective caterer or NGO involved.
            </p>
            <p className="text-gray-600 leading-8 font-medium">
              By using the platform, users expressly acknowledge that <strong className="text-gray-900">Replateo’s liability is limited to providing the digital infrastructure for coordination and recordkeeping.</strong> Users agree to assume full responsibility for their independent actions.
            </p>
          </section>

          <section id="suspension" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Suspension and Termination</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Replateo may issue warnings for minor violations or procedural lapses. Repeated non-compliance, negligence, or failure to follow platform guidelines may result in temporary suspension. Serious violations involving fraud, intentional misrepresentation, food safety breaches, or legal non-compliance may result in permanent termination of access.
            </p>
            <p className="text-gray-600 leading-8">
              In extreme cases involving legal violations, the matter may be escalated to appropriate regulatory or law enforcement authorities in accordance with Indian law.
            </p>
          </section>

          <section id="data" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Data Protection and Privacy</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Replateo implements reasonable technical and organizational measures to protect user data against unauthorized access, alteration, or disclosure. Information collected is used solely for operational coordination, verification, compliance monitoring, and impact reporting.
            </p>
            <p className="text-gray-600 leading-8">
              Personal data is not sold, rented, or shared for advertising purposes. Access to sensitive information is limited to authorized personnel. Users remain responsible for ensuring that the information they provide is accurate, lawful, and does not infringe upon the rights of others.
            </p>
          </section>

          <section id="reporting" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Reporting and Support</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Users are encouraged to report food safety concerns, pickup failures, misleading listings, misconduct, or technical issues through the official Help & Support mechanism within the application. All reports are reviewed based on severity and compliance requirements.
            </p>
            <p className="text-gray-600 leading-8">
              Replateo reserves the right to take corrective measures, request additional information, temporarily restrict accounts during investigation, or permanently remove access in cases where violations are substantiated.
            </p>
          </section>

          <section id="amendments" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Amendments to Guidelines</h2>
            <p className="text-gray-600 leading-8">
              Replateo may revise or update these Guidelines periodically to reflect regulatory changes, operational improvements, or policy enhancements. Updated versions will be published on the official platform. Continued use of the application after publication of revisions constitutes acceptance of the updated terms.
            </p>
          </section>

          <section id="indemnification" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Indemnification</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Users agree to indemnify, defend, and hold harmless Replateo, its founders, team members, affiliates, and partners from and against any and all claims, demands, damages, losses, liabilities, penalties, fines, costs, and expenses, including reasonable legal fees, arising out of or in connection with their use of the platform.
            </p>
            <p className="text-gray-600 leading-8 mb-4">
              This includes, but is not limited to, any violation of these Guidelines, breach of applicable Indian laws or food safety regulations, misrepresentation regarding the quality, quantity, or condition of food listed or distributed, and any negligent or improper handling, storage, transport, or distribution of food items. This indemnification obligation shall apply to all third-party claims, including those initiated by regulatory authorities, government bodies, or individuals allegedly affected by such actions.
            </p>
            <p className="text-gray-600 leading-8 font-medium">
              <strong className="text-gray-900">Users expressly acknowledge that Replateo operates solely as a digital facilitation platform</strong> and does not assume responsibility for independent operational decisions or actions taken by users, who shall bear full legal and regulatory responsibility for their conduct.
            </p>
          </section>

          <section id="force-majeure" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Force Majeure</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Replateo shall not be held liable for any failure or delay in the performance of its services arising out of circumstances beyond its reasonable control, including but not limited to natural disasters, acts of God, government restrictions or lockdowns, public health emergencies, technical failures beyond its control, internet outages, communication disruptions, or any other unforeseen events that prevent normal operations.
            </p>
            <p className="text-gray-600 leading-8">
              In such circumstances, the platform’s services may be temporarily suspended, restricted, or limited without prior notice. Replateo shall make reasonable and commercially practicable efforts to restore full functionality and resume services at the earliest possible time. However, users acknowledge and agree that certain interruptions, delays, or service limitations may be unavoidable during such events, and Replateo shall not be responsible for any direct or indirect losses arising from such disruptions.
            </p>
          </section>

          <section id="ip" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Intellectual Property Rights</h2>
            <p className="text-gray-600 leading-8 mb-4">
              All intellectual property related to the Replateo platform—including the application design, logo, brand name, text content, system architecture, and digital interface—is the exclusive property of Replateo unless otherwise stated.
            </p>
            <p className="text-gray-600 leading-8 font-medium">
              Users are granted a limited, non-exclusive, non-transferable right to use the platform for its intended purpose. <strong className="text-gray-900">Users may not copy, reproduce, distribute, modify, reverse engineer, or commercially exploit any part of the platform without prior written consent from Replateo.</strong> Unauthorized use of intellectual property may result in legal action under applicable Indian laws.
            </p>
          </section>

          <section id="disputes" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Dispute Resolution</h2>
            <p className="text-gray-600 leading-8 mb-4">
              In the event of any dispute arising out of or related to the use of the platform, users agree to first attempt resolution through good-faith internal communication via the official Help & Support mechanism.
            </p>
            <p className="text-gray-600 leading-8">
              If the matter remains unresolved, disputes may be referred to mediation or arbitration in accordance with applicable Indian laws. Formal legal proceedings, if necessary, shall be subject to the jurisdiction specified in these Guidelines. Users agree that disputes will be handled in a structured and legally compliant manner.
            </p>
          </section>

          <section id="grievance" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Grievance Redressal Mechanism</h2>
            <p className="text-gray-600 leading-8 mb-4">
              In compliance with applicable Indian Information Technology rules, Replateo provides a grievance redressal mechanism for user complaints related to platform usage, misconduct, or compliance concerns.
            </p>
            <p className="text-gray-600 leading-8">
              Users may submit complaints through the in-app Help & Support section. Grievances will be acknowledged and reviewed within a reasonable timeframe. Replateo may request additional information to properly investigate the matter before providing a resolution. The grievance process ensures accountability, transparency, and fair handling of user concerns.
            </p>
          </section>

          <section id="severability" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">22. Severability</h2>
            <p className="text-gray-600 leading-8">
              If any provision of these Guidelines is found to be invalid, unlawful, or unenforceable under applicable law, such provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions. The remaining sections shall continue in full force and effect.
            </p>
          </section>

          <section id="entire-agreement" className="scroll-mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">23. Entire Agreement</h2>
            <p className="text-gray-600 leading-8">
              These Guidelines, together with any additional policies published on the Replateo website or application, constitute the entire agreement between the user and Replateo regarding use of the platform. They supersede any prior understandings, communications, or representations, whether written or oral, relating to the subject matter.
            </p>
          </section>

        </div>
      </div>

      {/* ========================================= */}
      {/* 2. RIGHT SIDEBAR (Table of Contents)        */}
      {/* ========================================= */}
      {/* ✅ Added 'sticky top-0 self-start' here so it locks perfectly without scrolling */}
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

      {/* CSS for a clean, non-intrusive scrollbar for the Table of Contents */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #d1d5db;
        }
      `}</style>
      
    </div>
  );
}