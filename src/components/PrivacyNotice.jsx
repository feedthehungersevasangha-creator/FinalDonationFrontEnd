import { useState, useEffect } from "react";
import config from "../config";

export default function PrivacyNotice({ isAdmin = false, onClose,showAsPage = false }) {
  // const [visible, setVisible] = useState(isAdmin);
  // const [showContent, setShowContent] = useState(isAdmin);
  const [visible, setVisible] = useState(showAsPage || isAdmin);
const [showContent, setShowContent] = useState(showAsPage || isAdmin);
  const [policy, setPolicy] = useState(null);
  const [editablePolicy, setEditablePolicy] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------- Modal handlers ----------
  const openPrivacy = () => {
    setVisible(true);
    setTimeout(() => setShowContent(true), 100);
  };
  const closePrivacy = () => {
    setShowContent(false);
    setTimeout(() => setVisible(false), 300);
  };

  // ---------- Fetch policy ----------
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await fetch(`${config.API_URL}/privacy-policy`);
        const data = await res.json();

        const safeData = {
          title: data?.title || "",
          subHeadingTitle: data?.subHeadingTitle || "",
          effectiveDate: data?.effectiveDate || "",
          content:
            data?.content?.map((section) => ({
              sectionTitle: section.sectionTitle || "",
              body: section.body || [""],
            })) || [],
          contact: data?.contact || { email: "", phone: "" },
        };

        setPolicy(safeData);
        setEditablePolicy(JSON.parse(JSON.stringify(safeData)));
      } catch (err) {
        console.error("Error fetching policy:", err);
      }
    };

    fetchPolicy();

    if (!isAdmin) {
      const handleOpen = () => openPrivacy();
      document.addEventListener("openPrivacy", handleOpen);
      return () => document.removeEventListener("openPrivacy", handleOpen);
    }
  }, [isAdmin]);

  // ---------- Handle field changes ----------
  const handleChange = (path, value) => {
    setEditablePolicy((prev) => {
      const updated = structuredClone(prev);
      const keys = path.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // ---------- Save changes ----------
  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${config.API_URL}/privacy-policy`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editablePolicy),
      });
      if (!res.ok) throw new Error("Failed to update policy");
      const data = await res.json();

      const safeData = {
        title: data?.title || "",
        subHeadingTitle: data?.subHeadingTitle || "",
        effectiveDate: data?.effectiveDate || "",
        content:
          data?.content?.map((section) => ({
            sectionTitle: section.sectionTitle || "",
            body: section.body || [""],
          })) || [],
        contact: data?.contact || { email: "", phone: "" },
      };

      // 🔥 Fix: update both policy and editablePolicy instantly
      setPolicy(safeData);
      setEditablePolicy(JSON.parse(JSON.stringify(safeData)));
      setEditMode(false);
      alert("Privacy Policy updated successfully!");
    } catch (err) {
      alert("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Section / line actions ----------
  const addSection = () => {
    setEditablePolicy((prev) => ({
      ...prev,
      content: [...(prev.content || []), { sectionTitle: "", body: [""] }],
    }));
  };

  const deleteSection = (sIdx) => {
    setEditablePolicy((prev) => {
      const updated = structuredClone(prev);
      updated.content.splice(sIdx, 1);
      return updated;
    });
  };

  const addLine = (sIdx) => {
    setEditablePolicy((prev) => {
      const updated = structuredClone(prev);
      updated.content[sIdx].body.push("");
      return updated;
    });
  };

  const deleteLine = (sIdx, lIdx) => {
    setEditablePolicy((prev) => {
      const updated = structuredClone(prev);
      updated.content[sIdx].body.splice(lIdx, 1);
      return updated;
    });
  };

  if (!visible) return null;

  const displayData = editMode ? editablePolicy : policy;
  const safeData = displayData || {
    title: "",
    subHeadingTitle: "",
    effectiveDate: "",
    content: [],
    contact: { email: "", phone: "" },
  };

  // ---------- Render ----------
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity"
      style={{ opacity: showContent ? 1 : 0 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          {editMode ? (
            <input
              value={safeData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="text-2xl font-bold border-b w-full"
            />
          ) : (
            <h2 className="text-2xl font-bold">{safeData.title}</h2>
          )}
          {!showAsPage && (
  <button
    onClick={() => (isAdmin && onClose ? onClose() : closePrivacy())}
    className="text-gray-500 hover:text-gray-800 text-xl font-bold"
  >
    &times;
  </button>
)}
        </div>

        {/* Subheading */}
        {editMode ? (
          <input
            value={safeData.subHeadingTitle}
            onChange={(e) =>
              handleChange("subHeadingTitle", e.target.value)
            }
            className="text-lg font-medium border-b w-full mb-4"
            placeholder="Subheading"
          />
        ) : (
          safeData.subHeadingTitle && (
            <h3 className="text-lg font-medium mb-4">
              {safeData.subHeadingTitle}
            </h3>
          )
        )}

        {/* Effective Date */}
        <p className="mb-3">
          <strong>Effective Date: </strong>
          {editMode ? (
            <input
              type="date"
              value={safeData.effectiveDate}
              onChange={(e) =>
                handleChange("effectiveDate", e.target.value)
              }
              className="border rounded px-2 py-1 text-sm"
            />
          ) : (
            safeData.effectiveDate || "Not specified"
          )}
        </p>

        {/* Sections */}
        {(safeData.content || []).map((section, sIdx) => (
          <div
            key={sIdx}
            className="border p-3 rounded bg-gray-50 mb-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              {editMode ? (
                <input
                  value={section.sectionTitle}
                  onChange={(e) =>
                    handleChange(`content.${sIdx}.sectionTitle`, e.target.value)
                  }
                  className="font-semibold border-b w-full"
                  placeholder="Section Title"
                />
              ) : (
                <h4 className="font-semibold">{section.sectionTitle}</h4>
              )}
              {editMode && (
                <button
                  onClick={() => deleteSection(sIdx)}
                  className="text-red-600 font-bold ml-2"
                >
                  Delete
                </button>
              )}
            </div>

            <ul className="list-disc ml-6">
              {(section.body || []).map((line, lIdx) => (
                <li key={lIdx} className="flex items-center mb-1">
                  {editMode ? (
                    <>
                      <input
                        value={line}
                        onChange={(e) =>
                          handleChange(`content.${sIdx}.body.${lIdx}`, e.target.value)
                        }
                        className="border-b w-full text-sm"
                      />
                      <button
                        onClick={() => deleteLine(sIdx, lIdx)}
                        className="text-red-600 font-bold ml-2"
                      >
                        &times;
                      </button>
                    </>
                  ) : (
                    line
                  )}
                </li>
              ))}
            </ul>

            {editMode && (
              <button
                onClick={() => addLine(sIdx)}
                className="mt-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Add Line
              </button>
            )}
          </div>
        ))}

        {editMode && (
          <button
            onClick={addSection}
            className="mt-4 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Section
          </button>
        )}

        {/* Contact */}
        <h3 className="font-semibold mt-4">Contact Us</h3>
        <ul className="list-disc ml-6">
          <li>
            Email:{" "}
            {editMode ? (
              <input
                value={safeData.contact.email}
                onChange={(e) => handleChange("contact.email", e.target.value)}
                className="border-b w-1/2 text-sm"
              />
            ) : (
              safeData.contact.email
            )}
          </li>
          <li>
            Phone:{" "}
            {editMode ? (
              <input
                value={safeData.contact.phone}
                onChange={(e) => handleChange("contact.phone", e.target.value)}
                className="border-b w-1/2 text-sm"
              />
            ) : (
              safeData.contact.phone
            )}
          </li>
        </ul>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mt-6 flex justify-end space-x-3">
            {editMode ? (
              <>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setEditablePolicy(JSON.parse(JSON.stringify(policy)));
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Edit Policy
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
