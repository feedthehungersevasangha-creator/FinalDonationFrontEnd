import React, { useEffect, useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pressTimer, setPressTimer] = useState(null); // for long press

  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleCloseMenu = () => setIsOpen(false);

  // hide navbar on admin dashboard
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { id: "home", label: "Home", type: "scroll" },
    { id: "publications", label: "Publications", type: "route", path: "/publications" },
    { id: "press", label: "Press Releases", type: "route", path: "/press-releases" },
    { id: "programs", label: "Programs", type: "route", path: "/programs" },
    { id: "contact", label: "Contact Us", type: "modal" },
  ];

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;

      const scrollPosition = window.scrollY + 100;
      navItems.forEach((item) => {
        if (item.type === "scroll") {
          const element = document.getElementById(item.id);
          if (element) {
            const offsetTop = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
              setActiveSection(item.id);
            }
          }
        }
      });
    };

    requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleClick = (item, e) => {
    e.preventDefault();
    handleCloseMenu();

    if (item.type === "scroll") {
      const targetElement = document.getElementById(item.id);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
      }
    } else if (item.type === "route") {
      navigate(item.path);
    } else if (item.type === "modal") {
      if (item.id === "contact") {
        document.dispatchEvent(new Event("openContact"));
      }
    }
  };

  const renderLinks = () => (
    <ul className="font-medium flex flex-col md:flex-row lg:space-x-8 sm:space-x-4 space-y-2 md:space-y-0 p-4 md:p-0">
      {navItems.map((item) => (
        <li key={item.id}>
          <motion.a
            href={item.type === "scroll" ? `#${item.id}` : "#"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => handleClick(item, e)}
            className={`text-text hover:text-black transition-colors duration-300 ${
              activeSection === item.id ? "font-bold text-black" : ""
            }`}
          >
            {item.label}
          </motion.a>
        </li>
      ))}
    </ul>
  );

  // 🔹 Long press logic for Donate button
  const handlePressStart = () => {
    const timer = setTimeout(() => {
      navigate("/admin"); // go to admin login if pressed long
    }, 2000); // 2 seconds hold time
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const handleClickDonate = () => {
    navigate("/donate"); // short click → go to donate page
  };

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-heroBG/90 backdrop-blur-md text-white py-3 px-4 fixed top-0 left-0 right-0 z-10 shadow-md"
      >
        <div className="container mx-auto flex justify-between items-center h-full">
          {/* logo */}
          
          <div className="flex items-center">
  <a href="/">
    <img
      src="MainLogo.png"
      alt="logo"
      className="bg-transparent h-12 w-12 rounded-full object-cover "
    />
  </a>
</div>

          {/* desktop nav */}
          <div className="hidden md:flex flex-grow justify-center">
            <nav>{renderLinks()}</nav>
          </div>

          {/* donate button with long press */}
          <button
            className="text-text bg-button hover:bg-button/60 px-4 py-2 rounded-lg shadow select-none"
            onClick={handleClickDonate}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
          >
            Donate
          </button>

          {/* mobile menu button */}
          <div className="block md:hidden">
            <button
              onClick={handleToggle}
              className={`text-text focus:outline-none rounded-lg p-2 ${
                isOpen ? "bg-white/20" : "bg-transparent"
              }`}
            >
              <TfiMenuAlt className="size-6" />
            </button>
          </div>
        </div>

        {/* mobile nav */}
        {isOpen && (
          <nav className="absolute top-full left-0 w-full bg-heroBG/95 backdrop-blur-lg shadow-lg z-20 md:hidden">
            <ul className="flex flex-col p-4 space-y-3">
              {renderLinks().props.children}
            </ul>
          </nav>
        )}
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { TfiMenuAlt } from "react-icons/tfi";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");
//   const [pressTimer, setPressTimer] = useState(null); // for long press

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleToggle = () => setIsOpen(!isOpen);
//   const handleCloseMenu = () => setIsOpen(false);

//   // hide navbar on admin dashboard
//   if (location.pathname.startsWith("/admin")) {
//     return null;
//   }

//   const navItems = [
//     { id: "home", label: "Home", type: "scroll" },
//     { id: "publications", label: "Publications", type: "route", path: "/publications" },
//     { id: "press", label: "Press Releases", type: "route", path: "/press-releases" },
//     { id: "programs", label: "Programs", type: "route", path: "/programs" },
//     { id: "contact", label: "Contact Us", type: "modal" },
//   ];

//   useEffect(() => {
//     if (location.pathname !== "/") return;

//     const handleScroll = () => {
//       const hero = document.getElementById("home");
//       if (!hero) return;

//       const scrollPosition = window.scrollY + 100;
//       navItems.forEach((item) => {
//         if (item.type === "scroll") {
//           const element = document.getElementById(item.id);
//           if (element) {
//             const offsetTop = element.offsetTop;
//             const height = element.offsetHeight;
//             if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
//               setActiveSection(item.id);
//             }
//           }
//         }
//       });
//     };

//     requestAnimationFrame(handleScroll);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [location.pathname]);

//   const handleClick = (item, e) => {
//     e.preventDefault();
//     handleCloseMenu();

//     if (item.type === "scroll") {
//       const targetElement = document.getElementById(item.id);
//       if (targetElement) {
//         window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
//       }
//     } else if (item.type === "route") {
//       navigate(item.path);
//     } else if (item.type === "modal") {
//       if (item.id === "contact") {
//         document.dispatchEvent(new Event("openContact"));
//       }
//     }
//   };

//   const renderLinks = () => (
//     <ul className="font-medium flex flex-col md:flex-row lg:space-x-8 sm:space-x-4 space-y-2 md:space-y-0 p-4 md:p-0">
//       {navItems.map((item) => (
//         <li key={item.id}>
//           <motion.a
//             href={item.type === "scroll" ? `#${item.id}` : "#"}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             onClick={(e) => handleClick(item, e)}
//             className={`text-text hover:text-black transition-colors duration-300 ${
//               activeSection === item.id ? "font-bold text-black" : ""
//             }`}
//           >
//             {item.label}
//           </motion.a>
//         </li>
//       ))}
//     </ul>
//   );

//   // 🔹 Long press logic for Donate button
//   const handlePressStart = () => {
//     const timer = setTimeout(() => {
//       navigate("/admin"); // go to admin login if pressed long
//     }, 2000); // 2 seconds hold time
//     setPressTimer(timer);
//   };

//   const handlePressEnd = () => {
//     if (pressTimer) {
//       clearTimeout(pressTimer);
//       setPressTimer(null);
//     }
//   };

//   const handleClickDonate = () => {
//     navigate("/donate"); // short click → go to donate page
//   };

//   return (
//     <AnimatePresence>
//       <motion.header
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: -100, opacity: 0 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         className="bg-heroBG/90 backdrop-blur-md text-white py-3 px-4 fixed top-0 left-0 right-0 z-10 shadow-md"
//       >
//         <div className="container mx-auto flex justify-between items-center h-full">
//           {/* logo */}
          
//           <div className="flex items-center">
//   <a href="/">
//     <img
//       src="Mainlogo.png"
//       alt="logo"
//       className="bg-transparent h-12 w-12 rounded-full object-cover "
//     />
//   </a>
// </div>

//           {/* desktop nav */}
//           <div className="hidden md:flex flex-grow justify-center">
//             <nav>{renderLinks()}</nav>
//           </div>

//           {/* donate button with long press */}
//           <button
//             className="text-text bg-button hover:bg-button/60 px-4 py-2 rounded-lg shadow select-none"
//             onClick={handleClickDonate}
//             onMouseDown={handlePressStart}
//             onMouseUp={handlePressEnd}
//             onMouseLeave={handlePressEnd}
//             onTouchStart={handlePressStart}
//             onTouchEnd={handlePressEnd}
//           >
//             Donate
//           </button>

//           {/* mobile menu button */}
//           <div className="block md:hidden">
//             <button
//               onClick={handleToggle}
//               className={`text-text focus:outline-none rounded-lg p-2 ${
//                 isOpen ? "bg-white/20" : "bg-transparent"
//               }`}
//             >
//               <TfiMenuAlt className="size-6" />
//             </button>
//           </div>
//         </div>

//         {/* mobile nav */}
//         {isOpen && (
//           <nav className="absolute top-full left-0 w-full bg-heroBG/95 backdrop-blur-lg shadow-lg z-20 md:hidden">
//             <ul className="flex flex-col p-4 space-y-3">
//               {renderLinks().props.children}
//               <li className="py-2">
//                 <Link
//                   to="/donate"
//                   className="text-text bg-button hover:bg-button/60 px-3 py-2 rounded-lg shadow"
//                   onClick={handleCloseMenu}
//                 >
//                   Donate
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         )}
//       </motion.header>
//     </AnimatePresence>
//   );
// };

// export default Navbar;
