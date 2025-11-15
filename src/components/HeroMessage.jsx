
// import React from "react";
// import { motion, useReducedMotion } from "framer-motion";

// const HeroMessage = ({ isAdmin = false, lines = [], onChange }) => {
//   const shouldReduceMotion = useReducedMotion();
//   const safeLines =
//     lines?.length
//       ? lines
//       : [
//           { text: "Share a Meal" },
//           { text: "Share a Smile" },
//           { text: "Join Hands to End Hunger" },
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
//         relative  mx-auto rounded-2xl  
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
//             </div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// };

// export default HeroMessage;
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import config from "../config";

const MAX_LINES = 5;

const HeroMessage = ({ isAdmin = false }) => {
  const shouldReduceMotion = useReducedMotion();
  const [lines, setLines] = useState([]);

  // Load messages from backend
  useEffect(() => {
    fetch(`${config.API_URL}/messages`)
      .then((res) => res.json())
      .then((data) => {
        setLines(data.heroMessages || []);
      })
      .catch(() => {
        // fallback default if API fails
        setLines([
          { text: "Share a Meal" },
          { text: "Share a Smile" },
          { text: "Join Hands to End Hunger" },
        ]);
      });
  }, []);

  const handleChange = (idx, field, value) => {
    const updated = lines.map((l, i) =>
      i === idx ? { ...l, [field]: value } : l
    );
    setLines(updated);
  };

  const handleAdd = () => {
    if (lines.length >= MAX_LINES) return;
    setLines([...lines, { text: "" }]);
  };

  const handleDelete = (idx) => {
    const updated = lines.filter((_, i) => i !== idx);
    setLines(updated);
  };

  // Save to backend
  const handleSave = async () => {
    await fetch(`${config.API_URL}/messages`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroMessages: lines }),
    });

    alert("Messages saved!");
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4, duration: 0.5, ease: "easeOut" },
      };

  return (
    <motion.div
      {...motionProps}
      className="
        relative mx-auto rounded-2xl 
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
        {lines.map((line, idx) => {
          if (isAdmin) {
            return (
              <div key={idx} className="flex flex-col items-center gap-2.5">
                <div className="w-full flex items-center gap-2">
                  <input
                    value={line.text}
                    onChange={(e) =>
                      handleChange(idx, "text", e.target.value)
                    }
                    className="
                      w-full px-3 py-2 rounded-md
                      text-black text-sm sm:text-base
                      placeholder:text-gray-500 bg-white/95 focus:bg-white
                      outline-none ring-1 ring-inset ring-white/20 
                      focus:ring-2 focus:ring-yellow-300
                    "
                    placeholder="Message"
                  />

                  <button
                    onClick={() => handleDelete(idx)}
                    className="
                      px-3 py-2 text-sm bg-red-500 text-white rounded-md 
                      hover:bg-red-600 transition
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="
                flex items-center justify-center
                gap-2 text-white
                text-[clamp(0.85rem,1.4vw,1.125rem)]
                leading-snug px-2
              "
            >
              <p
                title={line.text}
                className="
                  whitespace-pre-wrap break-words hyphens-auto
                  text-center max-w-[60ch]
                "
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
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

      {isAdmin && (
        <>
          <button
            onClick={handleAdd}
            disabled={lines.length >= MAX_LINES}
            className={`
              mt-4 w-full py-2 rounded-md text-sm font-semibold 
              ${
                lines.length >= MAX_LINES
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }
              text-white transition
            `}
          >
            {lines.length >= MAX_LINES
              ? "Maximum 5 messages reached"
              : "Add Message"}
          </button>

          <button
            onClick={handleSave}
            className="
              mt-3 w-full py-2 rounded-md bg-blue-500 text-white 
              font-semibold hover:bg-blue-600 transition
            "
          >
            Save Messages
          </button>
        </>
      )}
    </motion.div>
  );
};

export default HeroMessage;

