import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Home, LogOut, Filter, FileText, Info } from "lucide-react";
import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import FilterDonors from "./FilterDonors";
import Publications from "../src/components/Publications";
import PressReleases from "../src/components/PressReleases";
import Programmes from "../src/components/Programmes";
import Footer from "../src/components/Footer";
import PrivacyNotice from "../src/components/PrivacyNotice";
import DeclarationAdmin from "../src/components/DeclarationAdmin";
import AdminInstructions from "./AdminInstructions";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  }, [navigate]);

  // -------------------------------
  // 🔐 AUTO LOGOUT AFTER 10 MIN
  // -------------------------------
  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        alert("You were logged out due to 10 minutes of inactivity.");
        handleLogout();
      }, 10 * 60 * 1000); // 10 minutes
    };

    // Events that count as "activity"
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer(); // start initial timer

    return () => {
      clearTimeout(logoutTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [handleLogout]);

  const components = [
    { id: "hero", title: "HOME PAGE", icon: <Home size={18} /> },
    { id: "filterDonors", title: "FILTER DONORS", icon: <Filter size={18} /> },
    { id: "privacyPolicy", title: "PRIVACY POLICY", icon: <FileText size={18} /> },
    { id: "declaration", title: "DECLARATION", icon: <FileText size={18} /> },
    { id: "instructions", title: "INSTRUCTIONS", icon: <Info size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-heroBG">
      
      {/* Sidebar */}
      <div
        className={`bg-heroBG shadow-lg transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } flex flex-col`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-text">Admin Panel</h1>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveComponent(comp.id)}
              className={`flex items-center w-full text-left px-4 py-2 mb-2 rounded-md transition ${
                activeComponent === comp.id
                  ? "bg-heroBG text-text"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {comp.icon}
              {sidebarOpen && <span className="ml-3">{comp.title}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-gray-700 hover:text-red-600"
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeComponent === "hero" && (
          <>
            <Navbar />
            <Hero isAdmin={true} />
            <Publications isAdmin={true} />
            <PressReleases isAdmin={true} />
            <Programmes isAdmin={true} />
            <Footer isAdmin={true} />
          </>
        )}

        {activeComponent === "filterDonors" && <FilterDonors />}
        {activeComponent === "declaration" && <DeclarationAdmin />}
        {activeComponent === "privacyPolicy" && (
          <PrivacyNotice isAdmin={true} onClose={() => setActiveComponent("hero")} />
        )}
        {activeComponent === "instructions" && <AdminInstructions />}
      </div>
    </div>
  );
};

export default AdminDashboard;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Home, LogOut, Filter, FileText, Info } from "lucide-react"; // added Info icon
// import Navbar from "../src/components/Navbar";
// import Hero from "../src/components/Hero";
// import FilterDonors from "./FilterDonors";
// import Publications from "../src/components/Publications";
// import PressReleases from "../src/components/PressReleases";
// import Programmes from "../src/components/Programmes";
// import Footer from "../src/components/Footer";
// import PrivacyNotice from "../src/components/PrivacyNotice";
// import DeclarationAdmin from "../src/components/DeclarationAdmin";
// import AdminInstructions from "./AdminInstructions"; // ✅ NEW IMPORT

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeComponent, setActiveComponent] = useState("hero");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     navigate("/");
//   };

//   const components = [
//     { id: "hero", title: "HOME PAGE", icon: <Home size={18} /> },
//     { id: "filterDonors", title: "FILTER DONORS", icon: <Filter size={18} /> },
//     { id: "privacyPolicy", title: "PRIVACY POLICY", icon: <FileText size={18} /> },
//     { id: "declaration", title: "DECLARATION", icon: <FileText size={18} /> },
//     { id: "instructions", title: "INSTRUCTIONS", icon: <Info size={18} /> }, // ✅ ADDED
//   ];

//   return (
//     <div className="flex min-h-screen bg-heroBG">
//       {/* Sidebar */}
//       <div
//         className={`bg-heroBG shadow-lg transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-16"
//         } flex flex-col`}
//       >
//         <div className="p-6 border-b flex justify-between items-center">
//           {sidebarOpen && <h1 className="text-2xl font-bold text-text">Admin Panel</h1>}
//           <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//             {sidebarOpen ? "<" : ">"}
//           </button>
//         </div>

//         <nav className="flex-1 p-4">
//           {components.map((comp) => (
//             <button
//               key={comp.id}
//               onClick={() => setActiveComponent(comp.id)}
//               className={`flex items-center w-full text-left px-4 py-2 mb-2 rounded-md transition ${
//                 activeComponent === comp.id
//                   ? "bg-heroBG text-text"
//                   : "text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {comp.icon}
//               {sidebarOpen && <span className="ml-3">{comp.title}</span>}
//             </button>
//           ))}
//         </nav>

//         <div className="p-4 border-t">
//           <button
//             onClick={handleLogout}
//             className="flex items-center w-full text-gray-700 hover:text-red-600"
//           >
//             <LogOut size={18} />
//             {sidebarOpen && <span className="ml-2">Logout</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-y-auto">
//         {activeComponent === "hero" && (
//           <>
//             <Navbar />
//             <Hero isAdmin={true} />
//             <Publications isAdmin={true} />
//             <PressReleases isAdmin={true} />
//             <Programmes isAdmin={true} />
//             <Footer isAdmin={true} />
//           </>
//         )}

//         {activeComponent === "filterDonors" && <FilterDonors />}
//         {activeComponent === "declaration" && <DeclarationAdmin />}
//         {activeComponent === "privacyPolicy" && (
//           <PrivacyNotice isAdmin={true} onClose={() => setActiveComponent("hero")} />
//         )}
//         {activeComponent === "instructions" && <AdminInstructions />} {/* ✅ NEW */}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

