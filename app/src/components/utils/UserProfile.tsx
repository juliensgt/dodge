import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";

const UserProfile: React.FC = () => {
  const { userDetails, updateUser, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skinCards: "",
    language: "",
  });

  React.useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name,
        email: userDetails.email || "",
        skinCards: userDetails.skinCards,
        language: userDetails.language,
      });
    }
  }, [userDetails]);

  const handleSave = async () => {
    await updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (userDetails) {
      setFormData({
        name: userDetails.name,
        email: userDetails.email || "",
        skinCards: userDetails.skinCards,
        language: userDetails.language,
      });
    }
    setIsEditing(false);
  };

  if (loading && !userDetails) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-white">
        <div className="animate-pulse">Loading user profile...</div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-white">
        <div>No user profile available</div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">User Profile</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-500 rounded text-sm hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/60"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Language</label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <span className="text-sm opacity-75">Name:</span>
            <div className="font-medium">{userDetails.name}</div>
          </div>
          {userDetails.email && (
            <div>
              <span className="text-sm opacity-75">Email:</span>
              <div className="font-medium">{userDetails.email}</div>
            </div>
          )}
          <div>
            <span className="text-sm opacity-75">Language:</span>
            <div className="font-medium">{userDetails.language}</div>
          </div>
          <div>
            <span className="text-sm opacity-75">User ID:</span>
            <div className="font-mono text-xs">{userDetails._id}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
