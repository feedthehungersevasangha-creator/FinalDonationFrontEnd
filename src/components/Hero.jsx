

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import HeroMessage from "./HeroMessage";
// import config from "../config";
// import { FaUtensils, FaSmile, FaHandsHelping } from "react-icons/fa";

// const Hero = ({ isAdmin = false }) => {
//   const [hero, setHero] = useState(null);
//   const [editingHero, setEditingHero] = useState(null);
//   const [showText, setShowText] = useState(false);

//   // Fetch hero data
//   useEffect(() => {
//     axios
//       .get(`${config.API_URL}/hero`)
//       .then((res) => {
//         setHero(res.data);
//         setEditingHero(res.data);
//         setShowText(true); // show text immediately since background image is CSS
//       })
//       .catch((err) => console.error("Error fetching hero:", err));
//   }, []);

//   // Save text/icons/background updates
//   const handleSave = async () => {
//     try {
//       const res = await axios.put(`${config.API_URL}/hero`, editingHero);
//       setHero(res.data);
//       setEditingHero(res.data);
//       alert("Hero updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update hero!");
//     }
//   };

//   // Upload new background image
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post(`${config.API_URL}/hero/upload-image`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setEditingHero((prev) => ({ ...prev, backgroundImage: res.data.backgroundImage }));
//       setHero((prev) => ({ ...prev, backgroundImage: res.data.backgroundImage }));
//     } catch (err) {
//       console.error(err);
//       alert("Image upload failed!");
//     }
//   };

//   if (!hero || !editingHero) return <div>Loading...</div>;

//   // HeroMessage lines with real icon components
//   const linesFromState = [
//     { text: editingHero.mealText || "Share a Meal", icon: FaUtensils },
//     { text: editingHero.smileText || "Share a Smile", icon: FaSmile },
//     { text: editingHero.handsText || "Join Hands to End Hunger", icon: FaHandsHelping },
//   ];

//   const applyLinesToState = (updatedLines) => {
//     setEditingHero((prev) => ({
//       ...prev,
//       mealText: updatedLines[0]?.text ?? prev.mealText,
//       mealIcon: updatedLines[0]?.icon ?? prev.mealIcon,
//       smileText: updatedLines[1]?.text ?? prev.smileText,
//       smileIcon: updatedLines[1]?.icon ?? prev.smileIcon,
//       handsText: updatedLines[2]?.text ?? prev.handsText,
//       handsIcon: updatedLines[2]?.icon ?? prev.handsIcon,
//     }));
//   };

//   return (
//     <section
//       id="home"
//       className="relative w-full flex items-center justify-center py-20 sm:py-32 md:py-40 px-4 overflow-hidden"
//       style={{
//         backgroundImage: `url(${hero.backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Content */}
//       <div
//         className={`relative  w-full max-w-4xl text-center transition-all duration-700 ease-out ${
//           showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//         }`}
//         style={{ color: (isAdmin ? editingHero.textColor : hero.textColor) || "#fff" }}
//       >
//         {isAdmin ? (
//           <>
//             <input
//               type="text"
//               value={editingHero.title || ""}
//               onChange={(e) => setEditingHero({ ...editingHero, title: e.target.value })}
//               className="px-3 py-2 rounded text-black mb-2 w-full"
//               placeholder="Hero Title"
//             />
//             <textarea
//               value={editingHero.subtitle || ""}
//               onChange={(e) => setEditingHero({ ...editingHero, subtitle: e.target.value })}
//               className="px-3 py-2 rounded text-black mb-4 w-full"
//               placeholder="Hero Subtitle"
//             />
//             <div className="my-2">
//               <label className="block text-white mb-1">Change Background Image:</label>
//               <input type="file" accept="image/*" onChange={handleImageUpload} />
//             </div>
//           </>
//         ) : (
//           <>
//             <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
//               {hero.title}
//             </h1>
//             <p className="mt-4 text-base sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
//               {hero.subtitle}
//             </p>
//           </>
//         )}

//         <div
//           className={`mt-6 sm:mt-10 transition-opacity duration-700 ${
//             showText ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <HeroMessage isAdmin={isAdmin} lines={linesFromState} onChange={applyLinesToState} />
//         </div>

//         {isAdmin && (
//           <button
//             onClick={handleSave}
//             className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Save Changes
//           </button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Hero;
import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroMessage from "./HeroMessage";
import config from "../config";
import { FaUtensils, FaSmile, FaHandsHelping } from "react-icons/fa";

const Hero = ({ isAdmin = false }) => {
  const [hero, setHero] = useState(null);
  const [editingHero, setEditingHero] = useState(null);
  const [showText, setShowText] = useState(false);

  // Fetch hero data
  useEffect(() => {
    axios
      .get(`${config.API_URL}/hero`)
      .then((res) => {
        setHero(res.data);
        setEditingHero(res.data);
        setShowText(true);
      })
      .catch((err) => console.error("Error fetching hero:", err));
  }, []);

  // Save updates
  const handleSave = async () => {
    try {
      const res = await axios.put(`${config.API_URL}/hero`, editingHero);
      setHero(res.data);
      setEditingHero(res.data);
      alert("Hero updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update hero!");
    }
  };

  // Upload new background image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${config.API_URL}/hero/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditingHero((prev) => ({ ...prev, backgroundImage: res.data.backgroundImage }));
      setHero((prev) => ({ ...prev, backgroundImage: res.data.backgroundImage }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed!");
    }
  };

  if (!hero || !editingHero) return <div>Loading...</div>;

  // HeroMessage lines with icons
  const linesFromState = [
    { text: editingHero.mealText || "Share a Meal", icon: FaUtensils },
    { text: editingHero.smileText || "Share a Smile", icon: FaSmile },
    { text: editingHero.handsText || "Join Hands to End Hunger", icon: FaHandsHelping },
  ];

  const applyLinesToState = (updatedLines) => {
    setEditingHero((prev) => ({
      ...prev,
      mealText: updatedLines[0]?.text ?? prev.mealText,
      mealIcon: updatedLines[0]?.icon ?? prev.mealIcon,
      smileText: updatedLines[1]?.text ?? prev.smileText,
      smileIcon: updatedLines[1]?.icon ?? prev.smileIcon,
      handsText: updatedLines[2]?.text ?? prev.handsText,
      handsIcon: updatedLines[2]?.icon ?? prev.handsIcon,
    }));
  };

  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center justify-center py-20 sm:py-32 md:py-40 px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${hero.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CENTER HEADING */}
      <div
        className={`relative text-center transition-all duration-700 ease-out ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ color: (isAdmin ? editingHero.textColor : hero.textColor) || "#fff" }}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          {hero.title}
        </h1>
      </div>

      {/* FLEX SECTION FOR LEFT + RIGHT CONTENT */}
      <div
        className={`relative w-full flex flex-col md:flex-row items-center justify-between gap-10 mt-8 md:mt-16 transition-all duration-700 ease-out ${
          showText ? "opacity-100" : "opacity-0"
        }`}
        style={{ color: (isAdmin ? editingHero.textColor : hero.textColor) || "#fff" }}
      >
        {/* LEFT SIDE: Subtitle */}
        <div className="flex-1 text-left max-w-xl md:ml-5">
          {isAdmin ? (
            <>
              <textarea
                value={editingHero.subtitle || ""}
                onChange={(e) =>
                  setEditingHero({ ...editingHero, subtitle: e.target.value })
                }
                className="px-3 py-2 rounded text-black mb-4 w-full"
                placeholder="Hero Subtitle"
              />
              <div className="my-2">
                <label className="block text-white mb-1">Change Background Image:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </>
          ) : (
            <p className="text-base sm:text-xl md:text-2xl text-gray-100 leading-relaxed">
              {hero.subtitle}
            </p>
          )}

          {isAdmin && (
            <button
              onClick={handleSave}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          )}
        </div>

        {/* RIGHT SIDE: HeroMessage Box (no background color) */}
        <div className="flex-1 flex justify-center md:justify-end md:mr-5">
          <div className="p-4 text-center max-w-sm w-full">
            <HeroMessage
              isAdmin={isAdmin}
              lines={linesFromState}
              onChange={applyLinesToState}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
