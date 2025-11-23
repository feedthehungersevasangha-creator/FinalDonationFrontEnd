import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Programmes = ({ isAdmin = false, limit, showAll = false, showBackButton = false }) => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProg, setEditingProg] = useState(null);
  const [newProg, setNewProg] = useState({
    title: "",
    description: "",
    color: "#000000",
    icon: null,
  });

  const navigate = useNavigate();

  const fetchProgrammes = () => {
    axios
      .get(`${config.API_URL}/programmes`)
      .then((res) => {
        setProgrammes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching programmes:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const handleSave = async (prog) => {
    try {
      await axios.put(`${config.API_URL}/programmes/${prog._id}`, {
        title: prog.title,
        description: prog.description,
        color: prog.color,
      });
      fetchProgrammes();
      setEditingProg(null);
      alert("Programme updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update programme!");
    }
  };

  const handleIconUpload = async (e, prog) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${config.API_URL}/programmes/${prog._id}/upload-icon`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProgrammes();
      alert("Icon uploaded!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload icon!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this programme?")) return;
    try {
      await axios.delete(`${config.API_URL}/programmes/${id}`);
      fetchProgrammes();
      alert("Programme deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete programme!");
    }
  };

  const handleAdd = async () => {
    if (!newProg.title || !newProg.description) {
      alert("Title and description are required!");
      return;
    }

    try {
      const res = await axios.post(`${config.API_URL}/programmes`, {
        title: newProg.title,
        description: newProg.description,
        color: newProg.color,
      });

      const createdProg = res.data;

      if (newProg.icon) {
        const formData = new FormData();
        formData.append("file", newProg.icon);
        await axios.post(`${config.API_URL}/programmes/${createdProg._id}/upload-icon`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProgrammes();
      setNewProg({ title: "", description: "", color: "#000000", icon: null });
      alert("Programme added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add programme!");
    }
  };

  // 🔄 Loading state
  if (loading)
    return <div className="text-center py-10 text-text">Loading programmes...</div>;

  // 🧩 Empty states
  if (programmes.length === 0) {
    // Admin → Show Add Form
    if (isAdmin) {
      return (
        <section id="programmes" className="min-h-screen bg-heroBG flex flex-col items-center justify-center px-6">
          <h2 className="text-3xl font-bold text-text mb-4">No Programmes Yet</h2>
          <p className="text-gray-700 mb-6">Add your first programme below.</p>

          {/* Admin Add Form */}
          <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full text-left">
            <h3 className="text-lg font-bold mb-2">Add New Programme</h3>
            <input
              type="text"
              placeholder="Title"
              value={newProg.title}
              onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
              className="w-full mb-2 px-2 py-1 rounded border"
            />
            <textarea
              placeholder="Description"
              value={newProg.description}
              onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
              className="w-full mb-2 px-2 py-1 rounded border"
            />
            <input
              type="color"
              value={newProg.color}
              onChange={(e) => setNewProg({ ...newProg, color: e.target.value })}
              className="w-full mb-2 h-10 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewProg({ ...newProg, icon: e.target.files[0] })}
              className="mb-2"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-700 text-white rounded"
            >
              Add Programme
            </button>
          </div>
        </section>
      );
    }

    // Normal user → check if we’re on `/programmes`
    const isProgrammesPage = window.location.pathname === "/programmes";

    if (isProgrammesPage) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-heroBG text-center px-6">
          <h2 className="text-3xl font-bold text-coffee-brown mb-3">
            Exciting Programmes Coming Soon!
          </h2>
          <p className="text-gray-600 max-w-md">
            We’re working on bringing you inspiring programmes. Check back soon!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 bg-button text-white rounded-lg hover:bg-button/80 transition"
          >
            ← Back to Home
          </button>
        </div>
      );
    }

    // Homepage or other pages → show nothing
    return null;
  }

  // 🟢 Normal state (programmes exist)
  const visibleProgrammes = isAdmin
    ? programmes
    : showAll
    ? programmes
    : programmes.slice(0, limit ?? 4);

  return (
    <section id="programmes" className="relative min-h-screen py-12 text-center px-6 bg-heroBG">
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-button text-white px-3 py-1 rounded hover:bg-button/80 transition"
        >
          ← Back
        </button>
      )}

      <h2 className="text-2xl md:text-3xl text-text font-bold mb-20 border-b-2 border-black inline-block">
        OUR PROGRAMMES
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {visibleProgrammes.map((prog) => (
          <div
            key={prog._id}
            className="relative flex flex-col items-center text-left bg-transparent rounded-lg p-4 border border-gray-700 hover:shadow-md transition-all"
          >
            {editingProg === prog._id ? (
              <>
                <input
                  type="text"
                  value={prog.title}
                  onChange={(e) =>
                    setProgrammes((prev) =>
                      prev.map((p) =>
                        p._id === prog._id ? { ...p, title: e.target.value } : p
                      )
                    )
                  }
                  className="w-full mb-2 px-2 py-1 rounded border text-black"
                />
                <textarea
                  value={prog.description}
                  onChange={(e) =>
                    setProgrammes((prev) =>
                      prev.map((p) =>
                        p._id === prog._id ? { ...p, description: e.target.value } : p
                      )
                    )
                  }
                  className="w-full mb-2 px-2 py-1 rounded border text-black"
                />
                <input
                  type="color"
                  value={prog.color}
                  onChange={(e) =>
                    setProgrammes((prev) =>
                      prev.map((p) =>
                        p._id === prog._id ? { ...p, color: e.target.value } : p
                      )
                    )
                  }
                  className="w-full mb-2 h-10 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleIconUpload(e, prog)}
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(prog)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProg(null)}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={prog.icon || "https://via.placeholder.com/56"}
                  alt={prog.title}
                  className="w-14 h-14 object-contain mx-auto mb-2"
                />
                <h3
                  className="text-xl font-extrabold mb-1"
                  style={{ color: prog.color }}
                >
                  {prog.title}
                </h3>
                <p className="text-text text-sm mb-2 break-words whitespace-normal line-clamp-3">
                  {prog.description}
                </p>

                {!isAdmin && (
                  <button
                    onClick={() => navigate(`/programmes/${prog._id}`)}
                    className="px-3 py-1 bg-button text-text rounded mt-2"
                  >
                    Read More
                  </button>
                )}

                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingProg(prog._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prog._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Admin Add Form (when items exist) */}
      {isAdmin && (
        <div className="mt-10 bg-heroBG p-4 rounded-lg shadow-md max-w-md mx-auto text-left">
          <h3 className="text-lg font-bold mb-2">Add New Programme</h3>
          <input
            type="text"
            placeholder="Title"
            value={newProg.title}
            onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <textarea
            placeholder="Description"
            value={newProg.description}
            onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <input
            type="color"
            value={newProg.color}
            onChange={(e) => setNewProg({ ...newProg, color: e.target.value })}
            className="w-full mb-2 h-10 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProg({ ...newProg, icon: e.target.files[0] })}
            className="mb-2"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            Add Programme
          </button>
        </div>
      )}
    </section>
  );
};

export default Programmes;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import config from "../config";

// const Programmes = ({ isAdmin = false, limit, showAll = false, showBackButton = false }) => {
//   const [programmes, setProgrammes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingProg, setEditingProg] = useState(null);
//   const [newProg, setNewProg] = useState({
//     title: "",
//     description: "",
//     color: "#000000",
//     icon: null,
//   });

//   const navigate = useNavigate();

//   const fetchProgrammes = () => {
//     axios
//       .get(`${config.API_URL}/programmes`)
//       .then((res) => {
//         setProgrammes(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching programmes:", err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchProgrammes();
//   }, []);

//   const handleSave = async (prog) => {
//     try {
//       await axios.put(`${config.API_URL}/programmes/${prog._id}`, {
//         title: prog.title,
//         description: prog.description,
//         color: prog.color,
//       });
//       fetchProgrammes();
//       setEditingProg(null);
//       alert("Programme updated!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update programme!");
//     }
//   };

//   const handleIconUpload = async (e, prog) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post(`${config.API_URL}/programmes/${prog._id}/upload-icon`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       fetchProgrammes();
//       alert("Icon uploaded!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to upload icon!");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this programme?")) return;
//     try {
//       await axios.delete(`${config.API_URL}/programmes/${id}`);
//       fetchProgrammes();
//       alert("Programme deleted!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete programme!");
//     }
//   };

//   const handleAdd = async () => {
//     if (!newProg.title || !newProg.description) {
//       alert("Title and description are required!");
//       return;
//     }

//     try {
//       const res = await axios.post(`${config.API_URL}/programmes`, {
//         title: newProg.title,
//         description: newProg.description,
//         color: newProg.color,
//       });

//       const createdProg = res.data;

//       if (newProg.icon) {
//         const formData = new FormData();
//         formData.append("file", newProg.icon);
//         await axios.post(`${config.API_URL}/programmes/${createdProg._id}/upload-icon`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       fetchProgrammes();
//       setNewProg({ title: "", description: "", color: "#000000", icon: null });
//       alert("Programme added!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add programme!");
//     }
//   };

//   // 🔄 Loading state
//   if (loading)
//     return <div className="text-center py-10 text-text">Loading programmes...</div>;

//   // 🧩 Empty states
//   if (programmes.length === 0) {
//     // Admin → Show Add Form
//     if (isAdmin) {
//       return (
//         <section id="programmes" className="min-h-screen bg-heroBG flex flex-col items-center justify-center px-6">
//           <h2 className="text-3xl font-bold text-text mb-4">No Programmes Yet</h2>
//           <p className="text-gray-700 mb-6">Add your first programme below.</p>

//           {/* Admin Add Form */}
//           <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full text-left">
//             <h3 className="text-lg font-bold mb-2">Add New Programme</h3>
//             <input
//               type="text"
//               placeholder="Title"
//               value={newProg.title}
//               onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <textarea
//               placeholder="Description"
//               value={newProg.description}
//               onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <input
//               type="color"
//               value={newProg.color}
//               onChange={(e) => setNewProg({ ...newProg, color: e.target.value })}
//               className="w-full mb-2 h-10 rounded"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewProg({ ...newProg, icon: e.target.files[0] })}
//               className="mb-2"
//             />
//             <button
//               onClick={handleAdd}
//               className="px-4 py-2 bg-green-700 text-white rounded"
//             >
//               Add Programme
//             </button>
//           </div>
//         </section>
//       );
//     }

//     // Normal user → check if we’re on `/programmes`
//     const isProgrammesPage = window.location.pathname === "/programmes";

//     if (isProgrammesPage) {
//       return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-heroBG text-center px-6">
//           <h2 className="text-3xl font-bold text-coffee-brown mb-3">
//             Exciting Programmes Coming Soon!
//           </h2>
//           <p className="text-gray-600 max-w-md">
//             We’re working on bringing you inspiring programmes. Check back soon!
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-6 px-4 py-2 bg-button text-white rounded-lg hover:bg-button/80 transition"
//           >
//             ← Back to Home
//           </button>
//         </div>
//       );
//     }

//     // Homepage or other pages → show nothing
//     return null;
//   }

//   // 🟢 Normal state (programmes exist)
//   const visibleProgrammes = isAdmin
//     ? programmes
//     : showAll
//     ? programmes
//     : programmes.slice(0, limit ?? 4);

//   return (
//     <section className="relative min-h-screen py-12 text-center px-6 bg-heroBG">
//       {showBackButton && (
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 bg-button text-white px-3 py-1 rounded hover:bg-button/80 transition"
//         >
//           ← Back
//         </button>
//       )}

//       <h2 className="text-2xl md:text-3xl text-text font-bold mb-20 border-b-2 border-black inline-block">
//         OUR PROGRAMMES
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
//         {visibleProgrammes.map((prog) => (
//           <div
//             key={prog._id}
//             className="relative flex flex-col items-center text-left bg-transparent rounded-lg p-4 border border-gray-700 hover:shadow-md transition-all"
//           >
//             {editingProg === prog._id ? (
//               <>
//                 <input
//                   type="text"
//                   value={prog.title}
//                   onChange={(e) =>
//                     setProgrammes((prev) =>
//                       prev.map((p) =>
//                         p._id === prog._id ? { ...p, title: e.target.value } : p
//                       )
//                     )
//                   }
//                   className="w-full mb-2 px-2 py-1 rounded border text-black"
//                 />
//                 <textarea
//                   value={prog.description}
//                   onChange={(e) =>
//                     setProgrammes((prev) =>
//                       prev.map((p) =>
//                         p._id === prog._id ? { ...p, description: e.target.value } : p
//                       )
//                     )
//                   }
//                   className="w-full mb-2 px-2 py-1 rounded border text-black"
//                 />
//                 <input
//                   type="color"
//                   value={prog.color}
//                   onChange={(e) =>
//                     setProgrammes((prev) =>
//                       prev.map((p) =>
//                         p._id === prog._id ? { ...p, color: e.target.value } : p
//                       )
//                     )
//                   }
//                   className="w-full mb-2 h-10 rounded"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleIconUpload(e, prog)}
//                   className="mb-2"
//                 />
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleSave(prog)}
//                     className="px-3 py-1 bg-green-600 text-white rounded"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingProg(null)}
//                     className="px-3 py-1 bg-gray-500 text-white rounded"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <img
//                   src={prog.icon || "https://via.placeholder.com/56"}
//                   alt={prog.title}
//                   className="w-14 h-14 object-contain mx-auto mb-2"
//                 />
//                 <h3
//                   className="text-xl font-extrabold mb-1"
//                   style={{ color: prog.color }}
//                 >
//                   {prog.title}
//                 </h3>
//                 <p className="text-text text-sm mb-2 break-words whitespace-normal line-clamp-3">
//                   {prog.description}
//                 </p>

//                 {!isAdmin && (
//                   <button
//                     onClick={() => navigate(`/programmes/${prog._id}`)}
//                     className="px-3 py-1 bg-button text-text rounded mt-2"
//                   >
//                     Read More
//                   </button>
//                 )}

//                 {isAdmin && (
//                   <div className="flex gap-2 mt-2">
//                     <button
//                       onClick={() => setEditingProg(prog._id)}
//                       className="px-3 py-1 bg-blue-600 text-white rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(prog._id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Admin Add Form (when items exist) */}
//       {isAdmin && (
//         <div className="mt-10 bg-heroBG p-4 rounded-lg shadow-md max-w-md mx-auto text-left">
//           <h3 className="text-lg font-bold mb-2">Add New Programme</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={newProg.title}
//             onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <textarea
//             placeholder="Description"
//             value={newProg.description}
//             onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <input
//             type="color"
//             value={newProg.color}
//             onChange={(e) => setNewProg({ ...newProg, color: e.target.value })}
//             className="w-full mb-2 h-10 rounded"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setNewProg({ ...newProg, icon: e.target.files[0] })}
//             className="mb-2"
//           />
//           <button
//             onClick={handleAdd}
//             className="px-4 py-2 bg-green-700 text-white rounded"
//           >
//             Add Programme
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Programmes;


