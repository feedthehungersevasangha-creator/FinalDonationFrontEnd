// import React from "react";
// import { motion, useReducedMotion } from "framer-motion";
// import * as FaIcons from "react-icons/fa";

// const HeroMessage = ({ isAdmin = false, lines = [], onChange }) => {
//   const shouldReduceMotion = useReducedMotion();

//   const iconOptions = [
//     { name: "Utensils", value: "FaUtensils" },
//     { name: "Smile", value: "FaSmile" },
//     { name: "Handshake", value: "FaHandsHelping" },
//     { name: "Heart", value: "FaHeart" },
//     { name: "Apple", value: "FaAppleAlt" },
//     { name: "Leaf", value: "FaLeaf" },
//     { name: "Gift", value: "FaGift" },
//     { name: "Star", value: "FaStar" },
//   ];

//   const renderIcon = (iconName, size = 18, color = "text-yellow-200") => {
//     const IconComponent = FaIcons[iconName];
//     return IconComponent ? <IconComponent className={color} size={size} /> : null;
//   };

//   const safeLines =
//     lines?.length
//       ? lines
//       : [
//           { text: "Share a Meal", icon: "FaUtensils" },
//           { text: "Share a Smile", icon: "FaSmile" },
//           { text: "Join Hands to End Hunger", icon: "FaHandsHelping" },
//         ];

//   const handleChange = (idx, field, value) => {
//     if (!onChange) return;
//     const updated = safeLines.map((l, i) => (i === idx ? { ...l, [field]: value } : l));
//     onChange(updated);
//   };

//   const motionProps = shouldReduceMotion
//     ? {}
//     : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } };

//   return (
//     <motion.div
//       {...motionProps}
//       className="
//         relative z-30 mx-auto rounded-2xl bg-black/50 backdrop-blur-sm
//         shadow-[0_8px_30px_rgba(0,0,0,0.25)]
//         p-3 sm:p-4 md:p-5
//         w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
//         max-h-[42svh] sm:max-h-[45svh] md:max-h-[48svh]
//         overflow-y-auto
//         scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/30
//         text-center
//       "
//       role="region"
//       aria-label="Key messages"
//     >
//       <h3 className="font-bold text-white drop-shadow-lg tracking-wide text-[clamp(0.95rem,1.6vw,1.25rem)]">
//         FEED THE HUNGER
//       </h3>

//       <div className="mt-3 sm:mt-4 space-y-2.5">
//         {safeLines.map((line, idx) => {
//           if (isAdmin) {
//             return (
//               <div key={idx} className="flex flex-col items-center gap-2.5">
//                 <input
//                   value={line.text}
//                   onChange={(e) => handleChange(idx, "text", e.target.value)}
//                   className="
//                     w-full px-3 py-2 rounded-md
//                     text-black text-sm sm:text-base
//                     placeholder:text-gray-500 bg-white/95 focus:bg-white
//                     outline-none ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-yellow-300
//                   "
//                   placeholder="Message"
//                 />
//                 <div className="flex items-center gap-2">
//                   <label htmlFor={`icon-${idx}`} className="text-white/80 text-xs sm:text-sm">
//                     Icon
//                   </label>
//                   <select
//                     id={`icon-${idx}`}
//                     value={line.icon}
//                     onChange={(e) => handleChange(idx, "icon", e.target.value)}
//                     className="
//                       px-3 py-2 rounded-md
//                       text-black text-sm sm:text-base
//                       bg-white/95 focus:bg-white
//                       outline-none ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-yellow-300
//                     "
//                   >
//                     {iconOptions.map((icon) => (
//                       <option key={icon.value} value={icon.value}>
//                         {icon.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             );
//           }

//           // Viewer mode: CENTERED text, icon AFTER the text
//           return (
//             <div
//               key={idx}
//               className="
//                 flex items-center justify-center
//                 gap-2
//                 text-white
//                 text-[clamp(0.85rem,1.4vw,1.125rem)]
//                 leading-snug
//                 px-2
//               "
//             >
//               <p
//                 title={line.text}
//                 className="
//                   whitespace-pre-wrap break-words hyphens-auto
//                   text-center
//                   max-w-[60ch]
//                 "
//                 style={{
//                   display: "-webkit-box",
//                   WebkitLineClamp: 4,      // adjust if you want more/less lines visible
//                   WebkitBoxOrient: "vertical",
//                   overflow: "hidden",
//                 }}
//               >
//                 {line.text}
//               </p>

//               {/* Icon AFTER text */}
//               <span className="inline-flex items-center shrink-0">
//                 {renderIcon(line.icon, 18)}
//                 <span className="sr-only">icon</span>
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// };

// export default HeroMessage;
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroMessage = ({ isAdmin = false, lines = [], onChange }) => {
  const shouldReduceMotion = useReducedMotion();
  const safeLines =
    lines?.length
      ? lines
      : [
          { text: "Share a Meal" },
          { text: "Share a Smile" },
          { text: "Join Hands to End Hunger" },
        ];

  const handleChange = (idx, field, value) => {
    if (!onChange) return;
    const updated = safeLines.map((l, i) => (i === idx ? { ...l, [field]: value } : l));
    onChange(updated);
  };

  const motionProps = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } };

  return (
    <motion.div
      {...motionProps}
      className="
        relative  mx-auto rounded-2xl  
        p-3 sm:p-4 md:p-5
        w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
        max-h-[42svh] sm:max-h-[45svh] md:max-h-[48svh]
        overflow-y-auto
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/30
        text-center
      "
      role="region"
      aria-label="Key messages"
    >
      <h3 className="font-bold text-white drop-shadow-lg tracking-wide text-[clamp(0.95rem,1.6vw,1.25rem)]">
        FEED THE HUNGER
      </h3>

      <div className="mt-3 sm:mt-4 space-y-2.5">
        {safeLines.map((line, idx) => {
          if (isAdmin) {
            return (
              <div key={idx} className="flex flex-col items-center gap-2.5">
                <input
                  value={line.text}
                  onChange={(e) => handleChange(idx, "text", e.target.value)}
                  className="
                    w-full px-3 py-2 rounded-md
                    text-black text-sm sm:text-base
                    placeholder:text-gray-500 bg-white/95 focus:bg-white
                    outline-none ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-yellow-300
                  "
                  placeholder="Message"
                />
              </div>
            );
          }

          // Viewer mode: CENTERED text, icon AFTER the text
          return (
            <div
              key={idx}
              className="
                flex items-center justify-center
                gap-2
                text-white
                text-[clamp(0.85rem,1.4vw,1.125rem)]
                leading-snug
                px-2
              "
            >
              <p
                title={line.text}
                className="
                  whitespace-pre-wrap break-words hyphens-auto
                  text-center
                  max-w-[60ch]
                "
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,      // adjust if you want more/less lines visible
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {line.text}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HeroMessage;
