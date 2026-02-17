import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FAQs() {
  const [activeSection, setActiveSection] = useState("");

  // Table of Contents Data
  const toc = [
    { id: "general", label: "General FAQs" },
    { id: "support", label: "Customer Support" },
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
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-6">
              <Link to="/" className="hover:text-black">Home</Link> 
              <span className="text-gray-300">/</span>
              <span className="text-gray-800">FAQs</span>
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-gray-500 mb-10 text-[15px]">
            Find answers to common questions about using Replateo, donating food, and our policies.
          </p>

          <div className="space-y-12">
             
             {/* SECTION 1: General FAQs */}
             <section id="general" className="scroll-mt-10">
                 <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    Replateo – General FAQs
                 </h3>
                 <div className="space-y-4">
                    <AccordionItem 
                        question="1. What is Replateo?" 
                        answer="Replateo is a digital platform created to redistribute surplus food in a safe and responsible way."
                        points={[
                            "Connects verified caterers with NGOs and food‑receiving organizations",
                            "Focuses on reducing food waste while maintaining food safety",
                            "Ensures transparent coordination between donors and receivers"
                        ]}
                    />
                    <AccordionItem 
                        question="2. Who can donate food on Replateo?" 
                        answer="Only registered and verified caterers are permitted to donate food."
                        points={[
                            "Caterers must follow food safety and hygiene guidelines",
                            "This ensures consistent quality and reliability of donated food"
                        ]}
                    />
                    <AccordionItem 
                        question="3. Can individuals or restaurants donate food?" 
                        points={[
                            "Individuals are not allowed to donate food",
                            "Restaurants are also not permitted to post food",
                            "Replateo currently accepts food donations only from caterers"
                        ]}
                    />
                    <AccordionItem 
                        question="4. Are volunteers involved in this app?" 
                        answer="No volunteers are involved in the Replateo platform."
                        points={[
                            "There are no third‑party delivery partners",
                            "NGOs manage food pickup and distribution directly"
                        ]}
                    />
                    <AccordionItem 
                        question="5. Who picks up the food from the caterer?" 
                        answer="The NGO or receiving organization that accepts the request is responsible for pickup."
                        points={[
                            "The NGO arranges transportation independently",
                            "The same organization manages final distribution"
                        ]}
                    />
                    <AccordionItem 
                        question="6. What type of food can be donated?" 
                        answer="Only freshly prepared food can be donated."
                        points={[
                            "Food must be unserved surplus",
                            "Both vegetarian and non‑vegetarian food are accepted",
                            "Food must be within the safe consumption time window",
                            "Spoiled, expired, or partially consumed food is strictly not allowed"
                        ]}
                    />
                    <AccordionItem 
                        question="7. How does food posting work?" 
                        answer="Caterers post surplus food by entering: Type of food, Quantity, Preparation time, Pickup location."
                        points={[
                            "Nearby NGOs are notified instantly",
                            "Each post is time‑limited to ensure safety and freshness"
                        ]}
                    />
                    <AccordionItem 
                        question="8. How does an NGO accept food?" 
                        points={[
                            "NGOs receive real‑time notifications",
                            "They review the food details before accepting",
                            "Acceptance depends on capacity and pickup timing",
                            "Pickup details are shared once the request is accepted"
                        ]}
                    />
                    <AccordionItem 
                        question="9. What happens if an NGO cannot pick up on time?" 
                        points={[
                            "The NGO should decline the request immediately",
                            "The food post is released to other nearby NGOs",
                            "This process helps prevent food wastage"
                        ]}
                    />
                    <AccordionItem 
                        question="10. Is there any cost to use Replateo?" 
                        points={[
                            "There is no registration fee",
                            "No usage or service charges apply",
                            "Replateo is completely free for both caterers and NGOs"
                        ]}
                    />
                    <AccordionItem 
                        question="11. How is impact measured?" 
                        points={[
                            "Quantity of food redistributed (in kilograms)",
                            "Estimated number of meals served",
                            "Distribution records stored within the app"
                        ]}
                    />
                    <AccordionItem 
                        question="12. What happens if guidelines are violated?" 
                        points={[
                            "Minor issues may result in a warning",
                            "Repeated violations can lead to temporary suspension",
                            "Serious or intentional misuse may result in permanent account removal"
                        ]}
                    />
                    <AccordionItem 
                        question="13. Is my data safe on Replateo?" 
                        points={[
                            "All user data is stored securely",
                            "Data is used only for coordination, safety, and impact tracking",
                            "Information is never shared for commercial purposes"
                        ]}
                    />
                 </div>
             </section>

             {/* SECTION 2: Customer Support FAQs */}
             <section id="support" className="scroll-mt-10 pt-4">
                 <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    Customer Support FAQs
                 </h3>
                 <div className="space-y-4">
                    <AccordionItem 
                        question="14. How do I contact Replateo support?" 
                        points={[
                            "Open the Help & Support section in the app",
                            "Select the appropriate issue category",
                            "Submit a support request with details"
                        ]}
                    />
                    <AccordionItem 
                        question="15. What issues can I report?" 
                        points={[
                            "Food quality or safety concerns",
                            "Pickup delays or missed pickups",
                            "Incorrect or misleading food information",
                            "App or technical issues",
                            "User conduct or misuse issues"
                        ]}
                    />
                    <AccordionItem 
                        question="16. What if food quality is not acceptable at pickup?" 
                        points={[
                            "The NGO has the right to reject the food at pickup",
                            "The issue should be reported immediately through the app",
                            "The support team will review and take appropriate action"
                        ]}
                    />
                    <AccordionItem 
                        question="17. What happens after I raise a support request?" 
                        points={[
                            "The request is logged in the system",
                            "The support team reviews the details",
                            "Status updates are provided within the app"
                        ]}
                    />
                    <AccordionItem 
                        question="18. How long does support take to respond?" 
                        points={[
                            "Requests are handled as quickly as possible",
                            "Food safety issues are prioritized",
                            "Response time may vary depending on issue type"
                        ]}
                    />
                    <AccordionItem 
                        question="19. Can I edit or cancel a support request?" 
                        points={[
                            "Submitted requests cannot be edited",
                            "A new request can be raised if additional information is required"
                        ]}
                    />
                    <AccordionItem 
                        question="20. Is support available for both caterers and NGOs?" 
                        points={[
                            "Customer support is available for all registered users",
                            "Both caterers and NGOs can access help whenever required"
                        ]}
                    />
                    <AccordionItem 
                        question="21. What should I do if the app is not working properly?" 
                        points={[
                            "Check your internet connection",
                            "Restart the app",
                            "Update to the latest version",
                            "Report the issue via Help & Support if it persists"
                        ]}
                    />
                    <AccordionItem 
                        question="22. Will my support request remain confidential?" 
                        points={[
                            "All support requests are handled securely",
                            "Access is limited to authorized personnel only",
                            "User privacy is fully protected"
                        ]}
                    />
                 </div>
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

       {/* CSS for custom scrollbar */}
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

// ------------------------------------------
// Accordion Item Component
// ------------------------------------------
const AccordionItem = ({ question, answer, points }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white text-left focus:outline-none hover:bg-gray-50"
      >
        <span className={`text-[15px] font-semibold ${isOpen ? 'text-[#ff4500]' : 'text-gray-800'}`}>
            {question}
        </span>
        <div className={`transform transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>
            {/* Simple SVG Arrow */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
      </button>
      
      {/* Answer Section with Animation */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-0 bg-white">
            <div className="h-px w-full bg-gray-100 mb-4"></div>
            <div className="text-gray-600 text-[15px] leading-relaxed">
                {answer && <p className="mb-2">{answer}</p>}
                {points && (
                    <ul className="list-disc pl-5 space-y-1">
                        {points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};