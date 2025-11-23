import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroMessage from "./HeroMessage";
import config from "../config";

const Hero = ({ isAdmin = false }) => {
  const [hero, setHero] = useState(null);
  const [editingHero, setEditingHero] = useState(null);
  const [showText, setShowText] = useState(false);

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

  const linesFromState = [
    { text: editingHero.mealText },
    { text: editingHero.smileText },
    { text: editingHero.handsText },
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
      className="relative w-full flex flex-col items-center justify-center 
      py-20 sm:py-32 md:py-40 px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${hero.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

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

      <div
        className={`relative w-full flex flex-col md:flex-row items-center justify-between 
        gap-6 sm:gap-8 md:gap-12 mt-8 md:mt-16 transition-all duration-700 ease-out ${
          showText ? "opacity-100" : "opacity-0"
        }`}
        style={{ color: (isAdmin ? editingHero.textColor : hero.textColor) || "#fff" }}
      >
        {/* LEFT SIDE */}
        <div className="flex-1 text-left w-full max-w-xl md:ml-5 -mt-5">
          {isAdmin ? (
            <>
              <textarea
                value={editingHero.subtitle || ""}
                onChange={(e) =>
                  setEditingHero({ ...editingHero, subtitle: e.target.value })
                }
                className="px-3 py-2 rounded text-black mb-4 w-full text-sm sm:text-base"
                placeholder="Hero Subtitle"
              />

              <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 
              p-3 sm:p-4 rounded shadow my-4 w-full">
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  Hero Image Upload Rules
                </h3>
                <ul className="text-xs sm:text-sm space-y-1">
                  <li>✔ Upload a <strong>horizontal / landscape</strong> banner image.</li>
                  <li>✔ Recommended size: <strong>1920 × 1080 px</strong>.</li>
                  <li>✔ Minimum width: <strong>1200 px</strong></li>
                  <li>✔ Keep important content <strong>in the center</strong>.</li>
                  <li>✔ Avoid vertical or square images.</li>
                </ul>
              </div>

              {/* RESPONSIVE FILE UPLOAD */}
              <div className="my-3 w-full">
                <label className="block text-white mb-2 text-sm sm:text-base font-medium">
                  Change Background Image:
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full sm:w-auto text-xs sm:text-sm 
                    file:px-3 file:py-1.5 file:rounded file:border file:bg-white 
                    file:text-black file:hover:bg-gray-100"
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm sm:text-lg md:text-2xl text-gray-100 leading-relaxed">
              {hero.subtitle}
            </p>
          )}

          {isAdmin && (
            <button
              onClick={handleSave}
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-center md:justify-end md:mr-5 w-full">
          <div className="p-3 sm:p-4 text-center max-w-full sm:max-w-sm w-full">
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



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import HeroMessage from "./HeroMessage";
// import config from "../config";

// const Hero = ({ isAdmin = false }) => {
//   const [hero, setHero] = useState(null);
//   const [editingHero, setEditingHero] = useState(null);
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`${config.API_URL}/hero`)
//       .then((res) => {
//         setHero(res.data);
//         setEditingHero(res.data);
//         setShowText(true);
//       })
//       .catch((err) => console.error("Error fetching hero:", err));
//   }, []);

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

//   const linesFromState = [
//     { text: editingHero.mealText },
//     { text: editingHero.smileText },
//     { text: editingHero.handsText },
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
//       className="relative w-full flex flex-col items-center justify-center 
//       py-20 sm:py-32 md:py-40 px-4 overflow-hidden"
//       style={{
//         backgroundImage: `url(${hero.backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/40"></div>

//       <div
//         className={`relative text-center transition-all duration-700 ease-out ${
//           showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//         }`}
//         style={{ color: (isAdmin ? editingHero.textColor : hero.textColor) || "#fff" }}
//       >
//         <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
//           {hero.title}
//         </h1>
//       </div>

//       <div
//         className={`relative w-full flex flex-col md:flex-row items-center justify-between 
//         gap-6 sm:gap-8 md:gap-12 mt-8 md:mt-16 transition-all duration-700 ease-out ${
//           showText ? "opacity-100" : "opacity-0"
//         }`}
//         style={{ color: (isAdmin ? editingHero.textColor : hero.textColor) || "#fff" }}
//       >
//         {/* LEFT SIDE */}
//         <div className="flex-1 text-left w-full max-w-xl md:ml-5">
//           {isAdmin ? (
//             <>
//               <textarea
//                 value={editingHero.subtitle || ""}
//                 onChange={(e) =>
//                   setEditingHero({ ...editingHero, subtitle: e.target.value })
//                 }
//                 className="px-3 py-2 rounded text-black mb-4 w-full text-sm sm:text-base"
//                 placeholder="Hero Subtitle"
//               />

//               <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 
//               p-3 sm:p-4 rounded shadow my-4 w-full">
//                 <h3 className="font-semibold text-base sm:text-lg mb-2">
//                   Hero Image Upload Rules
//                 </h3>
//                 <ul className="text-xs sm:text-sm space-y-1">
//                   <li>✔ Upload a <strong>horizontal / landscape</strong> banner image.</li>
//                   <li>✔ Recommended size: <strong>1920 × 1080 px</strong>.</li>
//                   <li>✔ Minimum width: <strong>1200 px</strong></li>
//                   <li>✔ Keep important content <strong>in the center</strong>.</li>
//                   <li>✔ Avoid vertical or square images.</li>
//                 </ul> 
//               </div>

//               {/* RESPONSIVE FILE UPLOAD */}
//               <div className="my-3 w-full">
//                 <label className="block text-white mb-2 text-sm sm:text-base font-medium">
//                   Change Background Image:
//                 </label>
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="block w-full sm:w-auto text-xs sm:text-sm 
//                     file:px-3 file:py-1.5 file:rounded file:border file:bg-white 
//                     file:text-black file:hover:bg-gray-100"
//                   />
//                 </div>
//               </div>
//             </>
//           ) : (
//             <p className="text-sm sm:text-lg md:text-2xl text-gray-100 leading-relaxed">
//               {hero.subtitle}
//             </p>
//           )}

//           {isAdmin && (
//             <button
//               onClick={handleSave}
//               className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg 
//               hover:bg-blue-700 transition text-sm sm:text-base"
//             >
//               Save Changes
//             </button>
//           )}
//         </div>

//         <div className="flex-1 flex justify-center md:justify-end md:mr-5 w-full">
//           <div className="p-3 sm:p-4 text-center max-w-full sm:max-w-sm w-full">
//             <HeroMessage
//               isAdmin={isAdmin}
//               lines={linesFromState}
//               onChange={applyLinesToState}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

