import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Publications = ({ isAdmin = false, limit, showAll = false, showBackButton = false }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPub, setEditingPub] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newPub, setNewPub] = useState({
    title: "",
    description: "",
    summary: "",
    content: "",
    image: null,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fetchPublications = () => {
    axios
      .get(`${config.API_URL}/publications`)
      .then((res) => {
        setPublications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching publications:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleSave = async (pub) => {
    try {
      await axios.put(`${config.API_URL}/publications/${pub.id}`, {
        title: pub.title,
        description: pub.description,
        summary: pub.summary,
        content: pub.content,
      });
      fetchPublications();
      setEditingPub(null);
      alert("Publication updated!");
    } catch (err) {
      console.error("Error updating publication:", err);
      alert("Failed to update publication!");
    }
  };

  const handleImageUpload = async (e, pub) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${config.API_URL}/publications/${pub.id}/upload-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fetchPublications();
      alert("Image uploaded!");
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this publication?")) return;

    try {
      await axios.delete(`${config.API_URL}/publications/${id}`);
      fetchPublications();
      alert("Publication deleted!");
    } catch (err) {
      console.error("Error deleting publication:", err);
      alert("Failed to delete!");
    }
  };

  const handleAdd = async () => {
    if (!newPub.title || !newPub.description || !newPub.summary || !newPub.content) {
      alert("All fields are required!");
      return;
    }

    setIsAdding(true);

    try {
      const res = await axios.post(`${config.API_URL}/publications`, {
        title: newPub.title,
        description: newPub.description,
        summary: newPub.summary,
        content: newPub.content,
      });

      const createdPub = res.data;

      if (newPub.image) {
        const formData = new FormData();
        formData.append("file", newPub.image);

        await axios.post(
          `${config.API_URL}/publications/${createdPub.id}/upload-image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      fetchPublications();
      setNewPub({ title: "", description: "", summary: "", content: "", image: null });
      alert("Publication added successfully!");
    } catch (err) {
      console.error("Error adding publication:", err);
      alert("Failed to add publication!");
    }

    setIsAdding(false);
  };

  if (loading)
    return <div className="text-center py-10 text-text">Loading publications...</div>;

  // ⭐ FIX: Detect publications page correctly
  const isPublicationsPage = pathname.toLowerCase().includes("publication");

  const visiblePublications =
    isAdmin || isPublicationsPage || showAll
      ? publications
      : publications.slice(0, limit ?? 4);

  // ⭐ NEW: Beautiful empty-state UI (like original)
  if (!loading && publications.length === 0 && isPublicationsPage) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
          Exciting Publications Coming Soon!
        </h2>

        <p className="text-text text-base md:text-lg max-w-xl mb-6">
          We’re working on bringing you engaging new publications. 
          Please check back later for updates.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          OK
        </button>
      </div>
    );
  }

  // ⭐ Hide section on home if empty
  if (!loading && publications.length === 0 && !isPublicationsPage && !isAdmin) {
    return null;
  }

  return (
    <div id="publications" className="relative bg-heroBG py-6 px-4 sm:px-6 md:px-10">

      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-button text-white px-3 py-1 rounded hover:bg-button/80 transition"
        >
          ← Back
        </button>
      )}

      {/* HEADER */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-text inline-block">
          Our Publications
        </h2>
        <p className="text-text mt-2 text-sm sm:text-base">
          Explore our latest research, insights, and reports.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {visiblePublications.map((pub) => (
          <div
            key={pub.id}
            className="bg-secondary rounded-xl shadow-md overflow-hidden max-w-[500px] w-full transition flex flex-col"
          >
            {/* IMAGE */}
            <div className="w-full h-56 bg-black flex items-center justify-center">
              <img
                src={pub.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={pub.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {isAdmin && (
              <div className="w-full bg-black/10 p-2 text-center">
                <label className="bg-black/70 text-white text-xs px-3 py-1 rounded cursor-pointer hover:bg-black transition">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, pub)}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1">
              {editingPub === pub.id ? (
                <>
                  <input
                    type="text"
                    value={pub.title}
                    onChange={(e) =>
                      setPublications((prev) =>
                        prev.map((p) =>
                          p.id === pub.id ? { ...p, title: e.target.value } : p
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-2 text-black border"
                  />

                  <textarea
                    value={pub.description}
                    onChange={(e) =>
                      setPublications((prev) =>
                        prev.map((p) =>
                          p.id === pub.id ? { ...p, description: e.target.value } : p
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-2 text-black border"
                  />

                  <textarea
                    value={pub.summary}
                    onChange={(e) =>
                      setPublications((prev) =>
                        prev.map((p) =>
                          p.id === pub.id ? { ...p, summary: e.target.value } : p
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-2 text-black border"
                  />

                  <textarea
                    value={pub.content}
                    onChange={(e) =>
                      setPublications((prev) =>
                        prev.map((p) =>
                          p.id === pub.id ? { ...p, content: e.target.value } : p
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-2 text-black border"
                  />

                  <div className="mt-2 flex gap-2">
                    <button onClick={() => handleSave(pub)} className="px-3 py-1 bg-text text-white rounded">
                      Save
                    </button>

                    <button onClick={() => setEditingPub(null)} className="px-3 py-1 bg-gray-500 text-white rounded">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl text-text font-bold mb-2">{pub.title}</h3>
                  <p className="text-sm text-text mb-1 whitespace-normal break-words">
                    {pub.description}
                  </p>
                  <p className="text-sm text-text mb-1 line-clamp-3">{pub.summary}</p>

                  {isAdmin ? (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setEditingPub(pub.id)} className="px-3 py-1 bg-blue-600 text-white rounded">
                        Edit
                      </button>

                      <button onClick={() => handleDelete(pub.id)} className="px-3 py-1 bg-red-600 text-white rounded">
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/publications/${pub.id}`)}
                      className="px-3 py-1 bg-button text-white rounded mt-2"
                    >
                      Read More
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADMIN ADD FORM */}
      {isAdmin && (
        <div className="mt-10 bg-white p-4 rounded-lg shadow-md max-w-[500px] mx-auto w-full">
          <h3 className="text-lg font-bold mb-2">Add New Publication</h3>

          <input
            type="text"
            placeholder="Title"
            value={newPub.title}
            onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <textarea
            placeholder="Description"
            value={newPub.description}
            onChange={(e) => setNewPub({ ...newPub, description: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <textarea
            placeholder="Summary"
            value={newPub.summary}
            onChange={(e) => setNewPub({ ...newPub, summary: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <textarea
            placeholder="Content"
            value={newPub.content}
            onChange={(e) => setNewPub({ ...newPub, content: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <label className="block text-sm font-medium mt-3 mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewPub({ ...newPub, image: e.target.files[0] })}
            className="w-full text-sm"
          />

          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`mt-4 px-4 py-2 w-full rounded text-white bg-green-700 hover:bg-green-800 active:scale-95 transition-all duration-200 ${
              isAdding ? "opacity-60 cursor-not-allowed bg-green-900" : ""
            }`}
          >
            {isAdding ? "Adding..." : "Add Publication"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Publications;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import config from "../config";

// const Publications = ({ isAdmin = false, limit, showAll = false, showBackButton = false }) => {
//   const [publications, setPublications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingPub, setEditingPub] = useState(null);
//   const [newPub, setNewPub] = useState({
//     title: "",
//     description: "",
//     summary: "",
//     content: "",
//     image: null,
//   });

//   const navigate = useNavigate();

//   const fetchPublications = () => {
//     axios
//       .get(`${config.API_URL}/publications`)
//       .then((res) => {
//         setPublications(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching publications:", err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchPublications();
//   }, []);

//   const handleSave = async (pub) => {
//     try {
//       await axios.put(`${config.API_URL}/publications/${pub.id}`, {
//         title: pub.title,
//         description: pub.description,
//         summary: pub.summary,
//         content: pub.content,
//       });
//       fetchPublications();
//       setEditingPub(null);
//       alert("Publication updated!");
//     } catch (err) {
//       console.error("Error updating publication:", err);
//       alert("Failed to update publication!");
//     }
//   };

//   const handleImageUpload = async (e, pub) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post(
//         `${config.API_URL}/publications/${pub.id}/upload-image`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       fetchPublications();
//       alert("Image uploaded!");
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       alert("Failed to upload image!");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this publication?")) return;

//     try {
//       await axios.delete(`${config.API_URL}/publications/${id}`);
//       fetchPublications();
//       alert("Publication deleted!");
//     } catch (err) {
//       console.error("Error deleting publication:", err);
//       alert("Failed to delete!");
//     }
//   };

//   const handleAdd = async () => {
//     if (!newPub.title || !newPub.description || !newPub.summary || !newPub.content) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const res = await axios.post(`${config.API_URL}/publications`, {
//         title: newPub.title,
//         description: newPub.description,
//         summary: newPub.summary,
//         content: newPub.content,
//       });

//       const createdPub = res.data;

//       if (newPub.image) {
//         const formData = new FormData();
//         formData.append("file", newPub.image);

//         await axios.post(
//           `${config.API_URL}/publications/${createdPub.id}/upload-image`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//       }

//       fetchPublications();
//       setNewPub({ title: "", description: "", summary: "", content: "", image: null });
//       alert("Publication added successfully!");
//     } catch (err) {
//       console.error("Error adding publication:", err);
//       alert("Failed to add publication!");
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading publications...</div>;

//   // ✅ If no publications exist
//   if (!publications.length) {
//     // Show Add form only for admin
//     if (isAdmin) {
//       return (
//         <div id="publications" className="relative bg-heroBG py-6 px-4 sm:px-6 md:px-10">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-text inline-block">
//               Our Publications
//             </h2>
//             <p className="text-text mt-2 text-sm sm:text-base">
//               No publications yet — add the first one below.
//             </p>
//           </div>

//           {/* Admin Add Publication Form */}
//           <div className="mt-10 bg-white p-4 rounded-lg shadow-md max-w-[500px] mx-auto">
//             <h3 className="text-lg font-bold mb-2">Add New Publication</h3>
//             <input
//               type="text"
//               placeholder="Title"
//               value={newPub.title}
//               onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <textarea
//               placeholder="Description"
//               value={newPub.description}
//               onChange={(e) => setNewPub({ ...newPub, description: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <textarea
//               placeholder="Summary"
//               value={newPub.summary}
//               onChange={(e) => setNewPub({ ...newPub, summary: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <textarea
//               placeholder="Content"
//               value={newPub.content}
//               onChange={(e) => setNewPub({ ...newPub, content: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewPub({ ...newPub, image: e.target.files[0] })}
//               className="mb-2"
//             />
//             <button onClick={handleAdd} className="px-4 py-2 bg-green-700 text-white rounded">
//               Add Publication
//             </button>
//           </div>
//         </div>
//       );
//     }

//     // ✅ Normal users see "Coming Soon" message only when on /publications page
//     const isPublicationsPage = window.location.pathname === "/publications";

//     if (isPublicationsPage) {
//       return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-heroBG text-center px-6">
//           <h2 className="text-3xl font-bold text-coffee-brown mb-3">
//             Exciting Publications Coming Soon!
//           </h2>
//           <p className="text-gray-600 max-w-md">
//             We’re working on bringing you engaging new publications. Please check back later for updates.
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

//     // If not on /publications page (like homepage), show nothing
//     return null;
//   }

//   // ✅ Admin sees all, users see limited
//   const visiblePublications = isAdmin
//     ? publications
//     : showAll
//     ? publications
//     : publications.slice(0, limit ?? 4);

//   return (
//     <div id="publications" className="relative bg-heroBG py-6 px-4 sm:px-6 md:px-10">
//       {/* ✅ Back Button */}
//       {showBackButton && (
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 bg-button text-white px-3 py-1 rounded hover:bg-button/80 transition"
//         >
//           ← Back
//         </button>
//       )}

//       <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-text inline-block">
//           Our Publications
//         </h2>
//         <p className="text-text mt-2 text-sm sm:text-base">
//           Explore our latest research, insights, and reports.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
//         {visiblePublications.map((pub) => (
//           <div
//             key={pub.id}
//             className="bg-secondary rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row max-w-[500px] w-full scale-95 hover:scale-100 transition"
//           >
//             <div className="relative w-full md:w-1/2">
//               <img
//                 src={pub.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
//                 alt={pub.title}
//                 className="w-full h-40 md:h-full object-cover"
//               />
//               {isAdmin && (
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e, pub)}
//                   className="absolute bottom-2 left-2 text-xs text-text"
//                 />
//               )}
//             </div>

//             <div className="p-4 flex flex-col justify-center md:w-1/2">
//               {editingPub === pub.id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={pub.title}
//                     onChange={(e) =>
//                       setPublications((prev) =>
//                         prev.map((p) => (p.id === pub.id ? { ...p, title: e.target.value } : p))
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 text-text"
//                   />
//                   <textarea
//                     value={pub.description}
//                     onChange={(e) =>
//                       setPublications((prev) =>
//                         prev.map((p) => (p.id === pub.id ? { ...p, description: e.target.value } : p))
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 text-text"
//                   />
//                   <textarea
//                     value={pub.summary}
//                     onChange={(e) =>
//                       setPublications((prev) =>
//                         prev.map((p) => (p.id === pub.id ? { ...p, summary: e.target.value } : p))
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 text-text"
//                     placeholder="Summary"
//                   />
//                   <textarea
//                     value={pub.content}
//                     onChange={(e) =>
//                       setPublications((prev) =>
//                         prev.map((p) => (p.id === pub.id ? { ...p, content: e.target.value } : p))
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 text-text"
//                     placeholder="Content"
//                   />
//                   <div className="mt-2 flex gap-2">
//                     <button
//                       onClick={() => handleSave(pub)}
//                       className="px-3 py-1 bg-text text-text rounded"
//                     >
//                       Save
//                     </button>
//                     <button onClick={() => setEditingPub(null)} className="px-3 py-1 bg-gray-500 text-text rounded">
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h3 className="text-xl text-text font-bold mb-2">{pub.title}</h3>
//                   <p className="text-sm text-text mb-1 break-words whitespace-normal">{pub.description}</p>
//                   <p className="text-sm text-text mb-1 line-clamp-3">{pub.summary}</p>
//                   {isAdmin ? (
//                     <div className="flex gap-2 mt-2">
//                       <button
//                         onClick={() => setEditingPub(pub.id)}
//                         className="px-3 py-1 bg-blue-600 text-text rounded"
//                       >
//                         Edit
//                       </button>
//                       <button onClick={() => handleDelete(pub.id)} className="px-3 py-1 bg-red-600 text-text rounded">
//                         Delete
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => navigate(`/publications/${pub.id}`)}
//                       className="px-3 py-1 bg-button text-text rounded mt-2"
//                     >
//                       Read More
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Admin Add Publication Form always visible */}
//       {isAdmin && (
//         <div className="mt-10 bg-white p-4 rounded-lg shadow-md max-w-[500px] mx-auto">
//           <h3 className="text-lg font-bold mb-2">Add New Publication</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={newPub.title}
//             onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <textarea
//             placeholder="Description"
//             value={newPub.description}
//             onChange={(e) => setNewPub({ ...newPub, description: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <textarea
//             placeholder="Summary"
//             value={newPub.summary}
//             onChange={(e) => setNewPub({ ...newPub, summary: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <textarea
//             placeholder="Content"
//             value={newPub.content}
//             onChange={(e) => setNewPub({ ...newPub, content: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setNewPub({ ...newPub, image: e.target.files[0] })}
//             className="mb-2"
//           />
//           <button onClick={handleAdd} className="px-4 py-2 bg-green-700 text-white rounded">
//             Add Publication
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Publications;

