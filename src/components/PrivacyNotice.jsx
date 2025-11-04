
import React, { useState, useEffect } from "react";
import config from "../config";

export default function PrivacyNotice({ isAdmin = false, onClose }) {
  const [visible, setVisible] = useState(isAdmin);
  const [showContent, setShowContent] = useState(isAdmin);
  const [policy, setPolicy] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editablePolicy, setEditablePolicy] = useState(null);
  const [loading, setLoading] = useState(false);

  const openPrivacy = () => {
    setVisible(true);
    setTimeout(() => setShowContent(true), 100);
  };

  const closePrivacy = () => {
    setShowContent(false);
    setTimeout(() => setVisible(false), 300);
  };

  useEffect(() => {
    fetch(`${config.API_URL}/privacy-policy`)
      .then((res) => res.json())
      .then((data) => {
        setPolicy(data);
        setEditablePolicy(JSON.parse(JSON.stringify(data)));
          console.log("✅ API URL from config:", config.API_URL);
      })
      .catch((err) => console.error("Error fetching policy:", err));

    if (!isAdmin) {
      const handleOpen = () => openPrivacy();
      document.addEventListener("openPrivacy", handleOpen);
      return () => document.removeEventListener("openPrivacy", handleOpen);
    }
  }, [isAdmin]);

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
      setPolicy(data);
      setEditMode(false);
      alert("Privacy Policy updated successfully!");
    } catch (err) {
      alert("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  const displayData = editMode ? editablePolicy : policy;

  const handleChange = (path, value) => {
    const updated = { ...editablePolicy };
    const keys = path.split(".");
    let obj = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setEditablePolicy(updated);
  };

  return (
    <div
      id="privacy"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      style={{ opacity: showContent ? 1 : 0 }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          {editMode ? (
            <input
              value={displayData?.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="text-2xl font-bold text-gray-800 border-b w-full focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">
              {displayData?.title || "Privacy Policy"}
            </h2>
          )}

          <button
            onClick={() => {
              if (isAdmin && onClose) onClose();
              else closePrivacy();
            }}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold transition"
            title="Close"
          >
            &times;
          </button>
        </div>

        {!policy ? (
          <p>Loading...</p>
        ) : (
          <div className="text-gray-700 text-sm space-y-4">
            {/* Effective Date */}
            <p>
              <strong>Effective Date:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  value={displayData?.effectiveDate || ""}
                  onChange={(e) =>
                    handleChange("effectiveDate", e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                />
              ) : (
                displayData?.effectiveDate
              )}
            </p>

            {/* Content Sections */}
            {displayData?.content?.map((section, idx) => (
              <div key={idx}>
                {editMode ? (
                  <input
                    type="text"
                    value={section.sectionTitle}
                    onChange={(e) =>
                      handleChange(`content.${idx}.sectionTitle`, e.target.value)
                    }
                    className="font-semibold border-b w-full mb-2"
                  />
                ) : (
                  <h3 className="font-semibold mt-4">{section.sectionTitle}</h3>
                )}

                <ul className="list-disc ml-6">
                  {section.body.map((line, i) => (
                    <li key={i}>
                      {editMode ? (
                        <input
                          type="text"
                          value={line}
                          onChange={(e) =>
                            handleChange(`content.${idx}.body.${i}`, e.target.value)
                          }
                          className="border-b w-full text-sm"
                        />
                      ) : (
                        line
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <h3 className="font-semibold mt-4">Contact Us</h3>
            <ul className="list-disc ml-6">
              <li>
                Email:{" "}
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.contact?.email || ""}
                    onChange={(e) =>
                      handleChange("contact.email", e.target.value)
                    }
                    className="border-b w-1/2 text-sm"
                  />
                ) : (
                  displayData?.contact?.email
                )}
              </li>
              <li>
                Phone:{" "}
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.contact?.phone || ""}
                    onChange={(e) =>
                      handleChange("contact.phone", e.target.value)
                    }
                    className="border-b w-1/2 text-sm"
                  />
                ) : (
                  displayData?.contact?.phone
                )}
              </li>
            </ul>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="mt-6 flex justify-end space-x-3">
                {editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(false)}
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
        )}
      </div>
    </div>
  );
}
