



// import React, { useState, useEffect } from "react";
// import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import config from "../config";

// const Footer = ({ isAdmin = false }) => {
//   const [publications, setPublications] = useState([]);
//   const [pressReleases, setPressReleases] = useState([]);
//   const [programmes, setProgrammes] = useState([]);

//   const [popupMessage, setPopupMessage] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Social Media State
//   const [socialLinks, setSocialLinks] = useState([]);
//   const [newLink, setNewLink] = useState({ platform: "", url: "" });

//   // ✅ Load social links from backend
//   useEffect(() => {
//     const fetchSocialLinks = async () => {
//       try {
//         const res = await axios.get(`${config.API_URL}/social-links`);
//         setSocialLinks(res.data);
//       } catch (err) {
//         console.error("Error fetching social links:", err);
//         // fallback to default
//         setSocialLinks([
//           {
//             id: 1,
//             platform: "Facebook",
//             icon: "facebook",
//             url: "https://facebook.com",
//           },
//           {
//             id: 2,
//             platform: "Instagram",
//             icon: "instagram",
//             url: "https://www.instagram.com/feedthehunger.india?igsh=MWs1MmhjMjd3Y3phcQ%3D%3D",
//           },
//         ]);
//       }
//     };
//     fetchSocialLinks();
//   }, []);

//   // ✅ Map icon names to components
//   const getIcon = (iconName) => {
//     switch (iconName?.toLowerCase()) {
//       case "facebook":
//         return <FaFacebook />;
//       case "instagram":
//         return <FaInstagram />;
//       default:
//         return <FaLink />;
//     }
//   };

//   // ✅ Fetch publications, press releases, and programmes (unchanged)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [pubRes, pressRes, progRes] = await Promise.all([
//           axios.get(`${config.API_URL}/publications`),
//           axios.get(`${config.API_URL}/press-releases`),
//           axios.get(`${config.API_URL}/programmes`),
//         ]);
//         setPublications(pubRes.data || []);
//         setPressReleases(pressRes.data || []);
//         setProgrammes(progRes.data || []);
//       } catch (err) {
//         console.error("Error fetching footer data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Save edited link
//   const handleSave = async (index) => {
//     const link = socialLinks[index];
//     try {
//       await axios.put(`${config.API_URL}/social-links/${link.id}`, {
//         platform: link.platform,
//         url: link.url,
//         icon: link.platform.toLowerCase(),
//       });
//       alert(`${link.platform} link saved successfully!`);
//     } catch (err) {
//       console.error("Error saving link:", err);
//       alert("Failed to save changes.");
//     }
//   };

//   // ✅ Delete link
//   const handleDelete = async (index) => {
//     const link = socialLinks[index];
//     if (!window.confirm(`Delete ${link.platform}?`)) return;

//     try {
//       await axios.delete(`${config.API_URL}/social-links/${link.id}`);
//       setSocialLinks((prev) => prev.filter((_, i) => i !== index));
//     } catch (err) {
//       console.error("Error deleting link:", err);
//       alert("Failed to delete link.");
//     }
//   };

//   // ✅ Add new social profile
//   const handleAdd = async () => {
//     if (!newLink.platform || !newLink.url) {
//       alert("Please fill in both Platform and URL");
//       return;
//     }
//     try {
//       const res = await axios.post(`${config.API_URL}/social-links`, {
//         platform: newLink.platform,
//         url: newLink.url,
//         icon: newLink.platform.toLowerCase(),
//       });
//       setSocialLinks([...socialLinks, res.data]); // ✅ Append with backend ID
//       setNewLink({ platform: "", url: "" });
//       alert("New social profile added!");
//     } catch (err) {
//       console.error("Error adding social link:", err);
//       alert("Failed to add new link.");
//     }
//   };

//   const openContactModal = (e) => {
//     e.preventDefault();
//     document.dispatchEvent(new Event("openContact"));
//   };

//   const openPrivacyModal = (e) => {
//     e.preventDefault();
//     document.dispatchEvent(new Event("openPrivacy"));
//   };

//   const showComingSoonPopup = (section) => {
//     setPopupMessage({
//       title: `Exciting ${section} Coming Soon!`,
//       message: `We’re working on bringing you engaging new ${section.toLowerCase()}. Please check back later for updates.`,
//     });
//   };

//   const handleNavigation = (sectionId, sectionName, list) => async (e) => {
//     e.preventDefault();
//     if (!list || list.length === 0) {
//       showComingSoonPopup(sectionName);
//       return;
//     }
//     if (location.pathname !== "/") {
//       navigate("/", { state: { scrollTo: sectionId } });
//       return;
//     }
//     const target = document.getElementById(sectionId);
//     if (target) target.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <footer className="bg-heroBG text-text py-8 px-6 relative">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Logo + About */}
//         <div>
//           <h1 className="text-2xl font-bold text-button">Feed The Hunger</h1>
//           <p className="mt-3 text-text text-sm">
//             Join our mission to ensure no one in our community goes hungry.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4 text-button">Quick Links</h2>
//           <ul className="space-y-2">
//             <li>
//               <a href="#home" onClick={() => navigate("/")} className="hover:text-text/20">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#publications"
//                 onClick={handleNavigation("publications", "Publications", publications)}
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                 Publications
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#press"
//                 onClick={handleNavigation("press", "Press Releases", pressReleases)}
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                 Press Releases
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#programmes"
//                 onClick={handleNavigation("programmes", "Programmes", programmes)}
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                 Programmes
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#contact"
//                 onClick={openContactModal}
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                 Contact
//               </a>
//             </li>
//                    <li>
//               <a
//                 href="/privacy-policy"
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/refund-policy"
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                Refund Policy
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/terms-and-conditions"
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                Terms And Conditions
//               </a>
//             </li><li>
//               <a
//                 href="/contact-us"
//                 className="hover:text-text/20 cursor-pointer"
//               >
//                 ContactUs
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media (Admin Editable) */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4 text-button">Follow Us</h2>

//           {/* Normal Users */}
//           {!isAdmin ? (
//             <div className="flex space-x-4 text-2xl">
//               {socialLinks.map((link) => (
//                 <a
//                   key={link.id}
//                   href={link.url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="hover:text-text/20"
//                 >
//                   {getIcon(link.icon)}
//                 </a>
//               ))}
//             </div>
//           ) : (
//             <div>
//               {socialLinks.map((link, index) => (
//                 <div key={link.id} className="flex items-center space-x-2 mb-2">
//                   <input
//                     type="text"
//                     value={link.platform}
//                     disabled
//                     className="border rounded px-2 py-1 text-sm w-28 bg-gray-100"
//                   />
//                   <input
//                     type="text"
//                     value={link.url}
//                     onChange={(e) =>
//                       setSocialLinks((prev) =>
//                         prev.map((l, i) => (i === index ? { ...l, url: e.target.value } : l))
//                       )
//                     }
//                     className="border rounded px-2 py-1 text-sm flex-1"
//                   />
//                   <button
//                     onClick={() => handleSave(index)}
//                     className="bg-green-600 text-white px-2 py-1 rounded text-xs"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => handleDelete(index)}
//                     className="bg-red-600 text-white px-2 py-1 rounded text-xs"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}

//               {/* Add new social profile */}
//               <div className="flex items-center space-x-2 mt-3">
//                 <input
//                   type="text"
//                   placeholder="Platform"
//                   value={newLink.platform}
//                   onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
//                   className="border rounded px-2 py-1 text-sm w-28"
//                 />
//                 <input
//                   type="text"
//                   placeholder="URL"
//                   value={newLink.url}
//                   onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
//                   className="border rounded px-2 py-1 text-sm flex-1"
//                 />
//                 <button
//                   onClick={handleAdd}
//                   className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="text-center text-text text-sm mt-8 border-t border-gray-600 pt-4">
//         © {new Date().getFullYear()} Feed The Hunger. All rights reserved.
//       </div>

//       {/* Popup Modal */}
//       {popupMessage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center animate-fadeIn">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               {popupMessage.title}
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">{popupMessage.message}</p>
//             <button
//               onClick={() => setPopupMessage(null)}
//               className="bg-button text-white px-4 py-2 rounded hover:bg-button/80"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </footer>
//   );
// };

// export default Footer;


import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config";

const Footer = ({ isAdmin = false }) => {
  const [publications, setPublications] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Social Media State
  const [socialLinks, setSocialLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: "", url: "" });

  // Load social links
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await axios.get(`${config.API_URL}/social-links`);
        setSocialLinks(res.data);
      } catch (err) {
        console.error("Error fetching social links:", err);
        setSocialLinks([
          { id: 1, platform: "Facebook", icon: "facebook", url: "https://facebook.com" },
          {
            id: 2,
            platform: "Instagram",
            icon: "instagram",
            url: "https://www.instagram.com/feedthehunger.india?igsh=MWs1MmhjMjd3Y3phcQ%3D%3D",
          },
        ]);
      }
    };
    fetchSocialLinks();
  }, []);

  // Map icon names to components
  const getIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case "facebook":
        return <FaFacebook />;
      case "instagram":
        return <FaInstagram />;
      default:
        return <FaLink />;
    }
  };

  // Fetch publications, press releases, programmes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pubRes, pressRes, progRes] = await Promise.all([
          axios.get(`${config.API_URL}/publications`),
          axios.get(`${config.API_URL}/press-releases`),
          axios.get(`${config.API_URL}/programmes`),
        ]);
        setPublications(pubRes.data || []);
        setPressReleases(pressRes.data || []);
        setProgrammes(progRes.data || []);
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (index) => {
    const link = socialLinks[index];
    try {
      await axios.put(`${config.API_URL}/social-links/${link.id}`, {
        platform: link.platform,
        url: link.url,
        icon: link.platform.toLowerCase(),
      });
      alert(`${link.platform} link saved successfully!`);
    } catch (err) {
      console.error("Error saving link:", err);
      alert("Failed to save changes.");
    }
  };

  const handleDelete = async (index) => {
    const link = socialLinks[index];
    if (!window.confirm(`Delete ${link.platform}?`)) return;

    try {
      await axios.delete(`${config.API_URL}/social-links/${link.id}`);
      setSocialLinks((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting link:", err);
      alert("Failed to delete link.");
    }
  };

  const handleAdd = async () => {
    if (!newLink.platform || !newLink.url) {
      alert("Please fill in both Platform and URL");
      return;
    }
    try {
      const res = await axios.post(`${config.API_URL}/social-links`, {
        platform: newLink.platform,
        url: newLink.url,
        icon: newLink.platform.toLowerCase(),
      });
      setSocialLinks([...socialLinks, res.data]);
      setNewLink({ platform: "", url: "" });
      alert("New social profile added!");
    } catch (err) {
      console.error("Error adding social link:", err);
      alert("Failed to add new link.");
    }
  };

  const openContactModal = (e) => {
    e.preventDefault();
    document.dispatchEvent(new Event("openContact"));
  };

  const showComingSoonPopup = (section) => {
    setPopupMessage({
      title: `Exciting ${section} Coming Soon!`,
      message: `We’re working on bringing you engaging new ${section.toLowerCase()}. Please check back later for updates.`,
    });
  };

  // 🔥 IMPROVED SCROLLING (ONLY CHANGE YOU REQUESTED)
  const handleNavigation = (sectionId, sectionName, list) => async (e) => {
    e.preventDefault();

    // If empty list → show popup
    if (!list || list.length === 0) {
      showComingSoonPopup(sectionName);
      return;
    }

    // If not on homepage → navigate then scroll
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    // Smooth scroll with navbar offset
    const target = document.getElementById(sectionId);
    if (target) {
      const navbar = document.querySelector("header");
      const navHeight = navbar?.offsetHeight || 80;

      const topOffset = target.offsetTop - navHeight;

      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-heroBG text-text py-8 px-6 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold text-button">Feed The Hunger</h1>
          <p className="mt-3 text-text text-sm">
            Join our mission to ensure no one in our community goes hungry.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-button">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#home" onClick={() => navigate("/")} className="hover:text-text/20">
                Home
              </a>
            </li>
            <li>
              <a
                href="#publications"
                onClick={handleNavigation("publications", "Publications", publications)}
                className="hover:text-text/20 cursor-pointer"
              >
                Publications
              </a>
            </li>
            <li>
              <a
                href="#press"
                onClick={handleNavigation("press", "Press Releases", pressReleases)}
                className="hover:text-text/20 cursor-pointer"
              >
                Press Releases
              </a>
            </li>
            <li>
              <a
                href="#programmes"
                onClick={handleNavigation("programmes", "Programmes", programmes)}
                className="hover:text-text/20 cursor-pointer"
              >
                Programmes
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={openContactModal}
                className="hover:text-text/20 cursor-pointer"
              >
                Contact
              </a>
            </li>

            <li>
              <a href="/privacy-policy" className="hover:text-text/20 cursor-pointer">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/refund-policy" className="hover:text-text/20 cursor-pointer">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="hover:text-text/20 cursor-pointer">
                Terms And Conditions
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-text/20 cursor-pointer">
                ContactUs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-button">Follow Us</h2>

          {!isAdmin ? (
            <div className="flex space-x-4 text-2xl">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-text/20"
                >
                  {getIcon(link.icon)}
                </a>
              ))}
            </div>
          ) : (
            <div>
              {socialLinks.map((link, index) => (
                <div key={link.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={link.platform}
                    disabled
                    className="border rounded px-2 py-1 text-sm w-28 bg-gray-100"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      setSocialLinks((prev) =>
                        prev.map((l, i) => (i === index ? { ...l, url: e.target.value } : l))
                      )
                    }
                    className="border rounded px-2 py-1 text-sm flex-1"
                  />
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))}

              {/* Add new social profile */}
              <div className="flex items-center space-x-2 mt-3">
                <input
                  type="text"
                  placeholder="Platform"
                  value={newLink.platform}
                  onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                  className="border rounded px-2 py-1 text-sm w-28"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="border rounded px-2 py-1 text-sm flex-1"
                />
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-text text-sm mt-8 border-t border-gray-600 pt-4">
        © {new Date().getFullYear()} Feed The Hunger. All rights reserved.
      </div>

      {/* Popup */}
      {popupMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {popupMessage.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{popupMessage.message}</p>
            <button
              onClick={() => setPopupMessage(null)}
              className="bg-button text-white px-4 py-2 rounded hover:bg-button/80"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
