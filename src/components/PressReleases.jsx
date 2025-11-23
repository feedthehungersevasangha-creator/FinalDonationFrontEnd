
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

const PressReleases = ({ isAdmin = false, limit, showAll = false, showBackButton = false }) => {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRelease, setEditingRelease] = useState(null);

  const [newRelease, setNewRelease] = useState({
    title: "",
    excerpt: "",
    summary: "",
    content: "",
    date: "",
    image: null,
  });

  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  const fetchPressReleases = () => {
    axios
      .get(`${config.API_URL}/press-releases`)
      .then((res) => {
        setPressReleases(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching press releases:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPressReleases();
  }, []);

  const handleSave = async (release) => {
    try {
      await axios.put(`${config.API_URL}/press-releases/${release.id}`, {
        title: release.title,
        excerpt: release.excerpt,
        summary: release.summary,
        content: release.content,
        date: release.date,
      });
      fetchPressReleases();
      setEditingRelease(null);
      alert("Press release updated!");
    } catch (err) {
      console.error("Error updating press release:", err);
      alert("Failed to update!");
    }
  };

  const handleImageUpload = async (e, release) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${config.API_URL}/press-releases/${release.id}/upload-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fetchPressReleases();
      alert("Image uploaded!");
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this press release?")) return;

    try {
      await axios.delete(`${config.API_URL}/press-releases/${id}`);
      fetchPressReleases();
      alert("Press release deleted!");
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete!");
    }
  };

  const handleAdd = async () => {
    if (!newRelease.title || !newRelease.excerpt || !newRelease.summary || !newRelease.content || !newRelease.date) {
      alert("All fields are required!");
      return;
    }

    try {
      setAdding(true);

      const res = await axios.post(`${config.API_URL}/press-releases`, {
        title: newRelease.title,
        excerpt: newRelease.excerpt,
        summary: newRelease.summary,
        content: newRelease.content,
        date: newRelease.date,
      });

      const created = res.data;

      if (newRelease.image) {
        const formData = new FormData();
        formData.append("file", newRelease.image);

        await axios.post(
          `${config.API_URL}/press-releases/${created.id}/upload-image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      fetchPressReleases();

      setNewRelease({
        title: "",
        excerpt: "",
        summary: "",
        content: "",
        date: "",
        image: null,
      });

      alert("Press release added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add press release!");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-text">Loading press releases...</div>;
  if (!pressReleases.length && !isAdmin) return null;

  const visibleReleases = isAdmin
    ? pressReleases
    : showAll
    ? pressReleases
    : pressReleases.slice(0, limit ?? 2);

  return (
    <div id="press" className="relative bg-heroBG py-6 px-4 sm:px-6 md:px-10">

      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-button text-white px-3 py-1 rounded hover:bg-button/80 transition"
        >
          ← Back
        </button>
      )}

      {(isAdmin || pressReleases.length > 0) && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-text inline-block">
            Related Press Releases
          </h2>
        </div>
      )}

      {/* GRID LAYOUT (Option A: 1/2/3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {visibleReleases.map((release) => (
          <div
            key={release.id}
            className="bg-secondary rounded-xl shadow-md overflow-hidden max-w-[500px] w-full transition"
          >
            {/* IMAGE — clean crop */}
            <div className="w-full">
              <img
                src={release.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={release.title}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* IMAGE UPLOAD (Option 2) */}
            {isAdmin && (
              <div className="w-full bg-black/10 p-2 text-center">
                <label className="bg-black/70 text-white text-xs px-3 py-1 rounded cursor-pointer hover:bg-black transition">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, release)}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* CONTENT */}
            <div className="p-4">
              {editingRelease === release.id ? (
                <>
                  <input
                    type="text"
                    value={release.title}
                    onChange={(e) =>
                      setPressReleases((prev) =>
                        prev.map((r) =>
                          r.id === release.id ? { ...r, title: e.target.value } : r
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-2 text-black border"
                  />

                  <textarea
                    value={release.excerpt}
                    onChange={(e) =>
                      setPressReleases((prev) =>
                        prev.map((r) =>
                          r.id === release.id ? { ...r, excerpt: e.target.value } : r
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-2 text-black border"
                  />

                  <textarea
                    value={release.summary}
                    onChange={(e) =>
                      setPressReleases((prev) =>
                        prev.map((r) =>
                          r.id === release.id ? { ...r, summary: e.target.value } : r
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-2 text-black border"
                  />

                  <textarea
                    value={release.content}
                    onChange={(e) =>
                      setPressReleases((prev) =>
                        prev.map((r) =>
                          r.id === release.id ? { ...r, content: e.target.value } : r
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-3 text-black border"
                  />

                  <input
                    type="date"
                    value={release.date}
                    onChange={(e) =>
                      setPressReleases((prev) =>
                        prev.map((r) =>
                          r.id === release.id ? { ...r, date: e.target.value } : r
                        )
                      )
                    }
                    className="w-full px-3 py-2 rounded mb-3 border text-black"
                  />

                  <div className="flex gap-2">
                    <button onClick={() => handleSave(release)} className="px-3 py-1 bg-text text-white rounded">
                      Save
                    </button>

                    <button onClick={() => setEditingRelease(null)} className="px-3 py-1 bg-gray-500 text-white rounded">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl text-text font-bold mb-2">{release.title}</h3>

                  <p className="text-sm text-text mb-1 whitespace-normal break-words">
                    {release.excerpt}
                  </p>

                  <p className="text-sm text-text mb-1 line-clamp-3">
                    {release.summary}
                  </p>

                  <p className="text-xs text-text/70 mt-2">{release.date}</p>

                  {isAdmin ? (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setEditingRelease(release.id)} className="px-3 py-1 bg-blue-600 text-white rounded">
                        Edit
                      </button>

                      <button onClick={() => handleDelete(release.id)} className="px-3 py-1 bg-red-600 text-white rounded">
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/press-release/${release.id}`)}
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
          <h3 className="text-lg font-bold mb-2">Add New Press Release</h3>

          <input
            type="text"
            placeholder="Title"
            value={newRelease.title}
            onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <textarea
            placeholder="Excerpt"
            value={newRelease.excerpt}
            onChange={(e) => setNewRelease({ ...newRelease, excerpt: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <textarea
            placeholder="Summary"
            value={newRelease.summary}
            onChange={(e) => setNewRelease({ ...newRelease, summary: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <textarea
            placeholder="Content"
            value={newRelease.content}
            onChange={(e) => setNewRelease({ ...newRelease, content: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <input
            type="date"
            value={newRelease.date}
            onChange={(e) => setNewRelease({ ...newRelease, date: e.target.value })}
            className="w-full mb-2 px-3 py-2 rounded border text-black"
          />

          <label className="block text-sm font-medium mt-3 mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewRelease({ ...newRelease, image: e.target.files[0] })}
            className="w-full text-sm"
          />

          <button
            onClick={handleAdd}
            disabled={adding}
            className={`mt-4 px-4 py-2 w-full rounded text-white bg-green-700 hover:bg-green-800 active:scale-95 transition-all duration-200 ${
              adding ? "opacity-60 cursor-not-allowed bg-green-900" : ""
            }`}
          >
            {adding ? "Adding…" : "Add Press Release"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PressReleases;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import config from "../config";

// const PressReleases = ({
//   isAdmin = false,
//   limit,
//   showAll = false,
//   showBackButton = false,
// }) => {
//   const [pressReleases, setPressReleases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingRelease, setEditingRelease] = useState(null);
//   const [newRelease, setNewRelease] = useState({
//     title: "",
//     excerpt: "",
//     summary: "",
//     content: "",
//     date: "",
//     image: null,
//   });

//   const navigate = useNavigate();

//   const fetchPressReleases = () => {
//     axios
//       .get(`${config.API_URL}/press-releases`)
//       .then((res) => {
//         setPressReleases(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching press releases:", err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchPressReleases();
//   }, []);

//   const handleSave = async (release) => {
//     try {
//       await axios.put(`${config.API_URL}/press-releases/${release.id}`, {
//         title: release.title,
//         excerpt: release.excerpt,
//         summary: release.summary,
//         content: release.content,
//         date: release.date,
//       });
//       fetchPressReleases();
//       setEditingRelease(null);
//       alert("Press release updated!");
//     } catch (err) {
//       console.error("Error updating press release:", err);
//       alert("Failed to update!");
//     }
//   };

//   const handleImageUpload = async (e, release) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post(
//         `${config.API_URL}/press-releases/${release.id}/upload-image`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       fetchPressReleases();
//       alert("Image uploaded!");
//     } catch (err) {
//       console.error("Error uploading image:", err);
//       alert("Failed to upload image!");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this press release?")) return;
//     try {
//       await axios.delete(`${config.API_URL}/press-releases/${id}`);
//       fetchPressReleases();
//       alert("Press release deleted!");
//     } catch (err) {
//       console.error("Error deleting press release:", err);
//       alert("Failed to delete!");
//     }
//   };

//   const handleAdd = async () => {
//     if (
//       !newRelease.title ||
//       !newRelease.excerpt ||
//       !newRelease.summary ||
//       !newRelease.content ||
//       !newRelease.date
//     ) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const res = await axios.post(`${config.API_URL}/press-releases`, {
//         title: newRelease.title,
//         excerpt: newRelease.excerpt,
//         summary: newRelease.summary,
//         content: newRelease.content,
//         date: newRelease.date,
//       });

//       const created = res.data;

//       if (newRelease.image) {
//         const formData = new FormData();
//         formData.append("file", newRelease.image);
//         await axios.post(
//           `${config.API_URL}/press-releases/${created.id}/upload-image`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//       }

//       fetchPressReleases();
//       setNewRelease({
//         title: "",
//         excerpt: "",
//         summary: "",
//         content: "",
//         date: "",
//         image: null,
//       });
//       alert("Press release added!");
//     } catch (err) {
//       console.error("Error adding press release:", err);
//       alert("Failed to add press release!");
//     }
//   };

//   if (loading)
//     return <div className="text-center py-10">Loading press releases...</div>;

//   // ✅ If there are NO press releases
//   if (!pressReleases.length) {
//     // Admins → show Add form
//     if (isAdmin) {
//       return (
//         <div id="press" className="relative px-4 text-center bg-heroBG sm:px-8 lg:px-16 py-8">
//           <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-black inline-block">
//             Related Press Releases
//           </h2>
//           <p className="text-gray-700 mb-4">No press releases yet. Add one below.</p>

//           {/* Admin Add Form */}
//           <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-[500px] mx-auto">
//             <h3 className="text-lg font-bold mb-2">Add New Press Release</h3>
//             <input
//               type="text"
//               placeholder="Title"
//               value={newRelease.title}
//               onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <textarea
//               placeholder="Excerpt"
//               value={newRelease.excerpt}
//               onChange={(e) => setNewRelease({ ...newRelease, excerpt: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <textarea
//               placeholder="Summary"
//               value={newRelease.summary}
//               onChange={(e) => setNewRelease({ ...newRelease, summary: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <textarea
//               placeholder="Content"
//               value={newRelease.content}
//               onChange={(e) => setNewRelease({ ...newRelease, content: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <input
//               type="date"
//               value={newRelease.date}
//               onChange={(e) => setNewRelease({ ...newRelease, date: e.target.value })}
//               className="w-full mb-2 px-2 py-1 rounded border"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewRelease({ ...newRelease, image: e.target.files[0] })}
//               className="mb-2"
//             />
//             <button onClick={handleAdd} className="px-4 py-2 bg-green-700 text-white rounded">
//               Add Press Release
//             </button>
//           </div>
//         </div>
//       );
//     }

//     // Normal user → show "Coming Soon" only on /press-releases page
//     const isPressReleasesPage = window.location.pathname === "/press-releases";

//     if (isPressReleasesPage) {
//       return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-heroBG text-center px-6">
//           <h2 className="text-3xl font-bold text-coffee-brown mb-3">
//             Exciting Press Releases Coming Soon!
//           </h2>
//           <p className="text-gray-600 max-w-md">
//             Stay tuned for upcoming updates and announcements from our team.
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

//     // Not on /press-releases page (like homepage) → show nothing
//     return null;
//   }

//   // ✅ Normal flow when press releases exist
//   const visibleReleases = isAdmin
//     ? pressReleases
//     : showAll
//     ? pressReleases
//     : pressReleases.slice(0, limit ?? 4);

//   return (
//     <div id="press" className="relative px-4 text-center bg-heroBG sm:px-8 lg:px-16 py-8">
//       {/* Back Button */}
//       {showBackButton && (
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 bg-button text-white px-3 py-1 rounded hover:bg-button/80 transition"
//         >
//           ← Back
//         </button>
//       )}

//       <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-black inline-block">
//         Related Press Releases
//       </h2>

//       {/* Grid */}
//       <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
//         {visibleReleases.map((release) => (
//           <div
//             key={release.id}
//             className="flex flex-col bg-secondary shadow-md rounded-xl overflow-hidden scale-95 hover:scale-100 transition"
//           >
//             <div className="relative w-full h-48">
//               <img
//                 src={release.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
//                 alt={release.title}
//                 className="w-full h-full object-cover"
//               />
//               {isAdmin && (
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageUpload(e, release)}
//                   className="absolute bottom-2 left-2 text-xs"
//                 />
//               )}
//             </div>

//             <div className="p-4 flex flex-col justify-between flex-1">
//               {editingRelease === release.id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={release.title}
//                     onChange={(e) =>
//                       setPressReleases((prev) =>
//                         prev.map((r) =>
//                           r.id === release.id ? { ...r, title: e.target.value } : r
//                         )
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 border"
//                   />
//                   <textarea
//                     value={release.excerpt}
//                     onChange={(e) =>
//                       setPressReleases((prev) =>
//                         prev.map((r) =>
//                           r.id === release.id ? { ...r, excerpt: e.target.value } : r
//                         )
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 border"
//                   />
//                   <textarea
//                     value={release.summary}
//                     onChange={(e) =>
//                       setPressReleases((prev) =>
//                         prev.map((r) =>
//                           r.id === release.id ? { ...r, summary: e.target.value } : r
//                         )
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 border"
//                     placeholder="Summary"
//                   />
//                   <textarea
//                     value={release.content}
//                     onChange={(e) =>
//                       setPressReleases((prev) =>
//                         prev.map((r) =>
//                           r.id === release.id ? { ...r, content: e.target.value } : r
//                         )
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 border"
//                     placeholder="Content"
//                   />
//                   <input
//                     type="date"
//                     value={release.date}
//                     onChange={(e) =>
//                       setPressReleases((prev) =>
//                         prev.map((r) =>
//                           r.id === release.id ? { ...r, date: e.target.value } : r
//                         )
//                       )
//                     }
//                     className="w-full px-2 py-1 rounded mb-2 border"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleSave(release)}
//                       className="px-3 py-1 bg-green-600 text-white rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingRelease(null)}
//                       className="px-3 py-1 bg-gray-500 text-white rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h3 className="text-lg md:text-xl font-bold mb-2">{release.title}</h3>
//                   <p className="text-gray-600 text-sm md:text-base line-clamp-3">
//                     {release.excerpt}
//                   </p>
//                   <p className="text-sm md:text-base line-clamp-3">{release.summary}</p>
//                   <p className="text-xs md:text-sm text-gray-500 mt-3">{release.date}</p>

//                   {isAdmin ? (
//                     <div className="flex gap-2 mt-3">
//                       <button
//                         onClick={() => setEditingRelease(release.id)}
//                         className="px-3 py-1 bg-blue-600 text-white rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(release.id)}
//                         className="px-3 py-1 bg-red-600 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => navigate(`/press-release/${release.id}`)}
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

//       {/* Admin Add Form */}
//       {isAdmin && (
//         <div className="mt-10 bg-heroBG p-4 rounded-lg shadow-md max-w-[500px] mx-auto">
//           <h3 className="text-lg font-bold mb-2">Add New Press Release</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={newRelease.title}
//             onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <textarea
//             placeholder="Excerpt"
//             value={newRelease.excerpt}
//             onChange={(e) => setNewRelease({ ...newRelease, excerpt: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <textarea
//             placeholder="Summary"
//             value={newRelease.summary}
//             onChange={(e) => setNewRelease({ ...newRelease, summary: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <textarea
//             placeholder="Content"
//             value={newRelease.content}
//             onChange={(e) => setNewRelease({ ...newRelease, content: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <input
//             type="date"
//             value={newRelease.date}
//             onChange={(e) => setNewRelease({ ...newRelease, date: e.target.value })}
//             className="w-full mb-2 px-2 py-1 rounded border"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setNewRelease({ ...newRelease, image: e.target.files[0] })}
//             className="mb-2"
//           />
//           <button
//             onClick={handleAdd}
//             className="px-4 py-2 bg-green-700 text-white rounded"
//           >
//             Add Press Release
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PressReleases;


