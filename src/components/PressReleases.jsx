import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

const PressReleases = ({
  isAdmin = false,
  limit,
  showAll = false,
  showBackButton = false,
}) => {
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
      console.error("Error deleting press release:", err);
      alert("Failed to delete!");
    }
  };

  const handleAdd = async () => {
    if (
      !newRelease.title ||
      !newRelease.excerpt ||
      !newRelease.summary ||
      !newRelease.content ||
      !newRelease.date
    ) {
      alert("All fields are required!");
      return;
    }

    try {
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
      console.error("Error adding press release:", err);
      alert("Failed to add press release!");
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading press releases...</div>;

  // ✅ If there are NO press releases
  if (!pressReleases.length) {
    // Admins → show Add form
    if (isAdmin) {
      return (
        <div id="press" className="relative px-4 text-center bg-heroBG sm:px-8 lg:px-16 py-8">
          <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-black inline-block">
            Related Press Releases
          </h2>
          <p className="text-gray-700 mb-4">No press releases yet. Add one below.</p>

          {/* Admin Add Form */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-[500px] mx-auto">
            <h3 className="text-lg font-bold mb-2">Add New Press Release</h3>
            <input
              type="text"
              placeholder="Title"
              value={newRelease.title}
              onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
              className="w-full mb-2 px-2 py-1 rounded border"
            />
            <textarea
              placeholder="Excerpt"
              value={newRelease.excerpt}
              onChange={(e) => setNewRelease({ ...newRelease, excerpt: e.target.value })}
              className="w-full mb-2 px-2 py-1 rounded border"
            />
            <textarea
              placeholder="Summary"
              value={newRelease.summary}
              onChange={(e) => setNewRelease({ ...newRelease, summary: e.target.value })}
              className="w-full mb-2 px-2 py-1 rounded border"
            />
            <textarea
              placeholder="Content"
              value={newRelease.content}
              onChange={(e) => setNewRelease({ ...newRelease, content: e.target.value })}
              className="w-full mb-2 px-2 py-1 rounded border"
            />
            <input
              type="date"
              value={newRelease.date}
              onChange={(e) => setNewRelease({ ...newRelease, date: e.target.value })}
              className="w-full mb-2 px-2 py-1 rounded border"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewRelease({ ...newRelease, image: e.target.files[0] })}
              className="mb-2"
            />
            <button onClick={handleAdd} className="px-4 py-2 bg-green-700 text-white rounded">
              Add Press Release
            </button>
          </div>
        </div>
      );
    }

    // Normal user → show "Coming Soon" only on /press-releases page
    const isPressReleasesPage = window.location.pathname === "/press-releases";

    if (isPressReleasesPage) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-heroBG text-center px-6">
          <h2 className="text-3xl font-bold text-coffee-brown mb-3">
            Exciting Press Releases Coming Soon!
          </h2>
          <p className="text-gray-600 max-w-md">
            Stay tuned for upcoming updates and announcements from our team.
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

    // Not on /press-releases page (like homepage) → show nothing
    return null;
  }

  // ✅ Normal flow when press releases exist
  const visibleReleases = isAdmin
    ? pressReleases
    : showAll
    ? pressReleases
    : pressReleases.slice(0, limit ?? 4);

  return (
    <div id="press" className="relative px-4 text-center bg-heroBG sm:px-8 lg:px-16 py-8">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-button text-white px-3 py-1 rounded hover:bg-button/80 transition"
        >
          ← Back
        </button>
      )}

      <h2 className="text-2xl md:text-3xl text-text font-bold mb-3 border-b-2 border-black inline-block">
        Related Press Releases
      </h2>

      {/* Grid */}
      <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {visibleReleases.map((release) => (
          <div
            key={release.id}
            className="flex flex-col bg-secondary shadow-md rounded-xl overflow-hidden scale-95 hover:scale-100 transition"
          >
            <div className="relative w-full h-48">
              <img
                src={release.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={release.title}
                className="w-full h-full object-cover"
              />
              {isAdmin && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, release)}
                  className="absolute bottom-2 left-2 text-xs"
                />
              )}
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
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
                    className="w-full px-2 py-1 rounded mb-2 border"
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
                    className="w-full px-2 py-1 rounded mb-2 border"
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
                    className="w-full px-2 py-1 rounded mb-2 border"
                    placeholder="Summary"
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
                    className="w-full px-2 py-1 rounded mb-2 border"
                    placeholder="Content"
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
                    className="w-full px-2 py-1 rounded mb-2 border"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(release)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRelease(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{release.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                    {release.excerpt}
                  </p>
                  <p className="text-sm md:text-base line-clamp-3">{release.summary}</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-3">{release.date}</p>

                  {isAdmin ? (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setEditingRelease(release.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(release.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/press-release/${release.id}`)}
                      className="px-3 py-1 bg-button text-text rounded mt-2"
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

      {/* Admin Add Form */}
      {isAdmin && (
        <div className="mt-10 bg-heroBG p-4 rounded-lg shadow-md max-w-[500px] mx-auto">
          <h3 className="text-lg font-bold mb-2">Add New Press Release</h3>
          <input
            type="text"
            placeholder="Title"
            value={newRelease.title}
            onChange={(e) => setNewRelease({ ...newRelease, title: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <textarea
            placeholder="Excerpt"
            value={newRelease.excerpt}
            onChange={(e) => setNewRelease({ ...newRelease, excerpt: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <textarea
            placeholder="Summary"
            value={newRelease.summary}
            onChange={(e) => setNewRelease({ ...newRelease, summary: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <textarea
            placeholder="Content"
            value={newRelease.content}
            onChange={(e) => setNewRelease({ ...newRelease, content: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <input
            type="date"
            value={newRelease.date}
            onChange={(e) => setNewRelease({ ...newRelease, date: e.target.value })}
            className="w-full mb-2 px-2 py-1 rounded border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewRelease({ ...newRelease, image: e.target.files[0] })}
            className="mb-2"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            Add Press Release
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

// const PressReleases = ({ isAdmin = false, limit, showAll = false, showBackButton = false }) => {
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
//     if (!newRelease.title || !newRelease.excerpt || !newRelease.summary || !newRelease.content || !newRelease.date) {
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
//       setNewRelease({ title: "", excerpt: "", summary: "", content: "", date: "", image: null });
//       alert("Press release added!");
//     } catch (err) {
//       console.error("Error adding press release:", err);
//       alert("Failed to add press release!");
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading press releases...</div>;
//   if (!pressReleases.length) return (
//     <section className="text-center py-12 bg-heroBG">
//       <h2 className="text-2xl text-text font-bold mb-3">Our Press Releases</h2>
//       <p className="text-text/70">Exciting Press Releases coming soon — stay tuned!</p>
//     </section>
//   );

//   const visibleReleases = showAll ? pressReleases : pressReleases.slice(0, limit ?? 4);

//   return (
//     <div id="press" className="relative px-4 text-center bg-heroBG sm:px-8 lg:px-16 py-8">
//       {/* ✅ Back Button (only visible when showBackButton=true) */}
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

//       <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
//         {visibleReleases.map((release) => (
//           <div
//             key={release.id}
//             className="flex flex-col bg-secondary shadow-md rounded-xl overflow-hidden scale-95 hover:scale-100 transition"
//           >
//             {/* Image */}
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

//             {/* Text */}
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
//                   <p className="text-gray-600 text-sm md:text-base line-clamp-3">{release.excerpt}</p>
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

//       {/* Admin: Add new press release */}
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
//           <button onClick={handleAdd} className="px-4 py-2 bg-green-700 text-white rounded">
//             Add Press Release
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PressReleases;
