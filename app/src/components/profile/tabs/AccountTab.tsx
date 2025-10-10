import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useGradient } from "@/hooks/useGradient";
import {
  faUser,
  faEnvelope,
  faLock,
  faTrash,
  faSave,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@supabase/supabase-js";

export default function AccountTab() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { GradientType } = useGradient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          name: currentUser.user_metadata?.name || "",
          email: currentUser.email || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("Le nom est requis");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("L'email est requis");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("Format d'email invalide");
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = t(
        "Le mot de passe doit contenir au moins 6 caractères"
      );
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t("Les mots de passe ne correspondent pas");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setSuccessMessage("");

      // Update user metadata (name)
      if (formData.name !== user?.user_metadata?.name) {
        // Note: In a real app, you'd need to call your API to update user metadata
        console.log("Would update name to:", formData.name);
      }

      // Update email
      if (formData.email !== user?.email) {
        // Note: In a real app, you'd need to call your API to update email
        console.log("Would update email to:", formData.email);
      }

      // Update password
      if (formData.newPassword) {
        // Note: In a real app, you'd need to call your API to update password
        console.log("Would update password");
      }

      setSuccessMessage(t("Profil mis à jour avec succès"));
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ general: t("Erreur lors de la mise à jour du profil") });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        t(
          "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        )
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      // Note: In a real app, you'd need to call your API to delete the account
      console.log("Would delete account");
      await logout();
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrors({ general: t("Erreur lors de la suppression du compte") });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-white text-xl">{t("Chargement...")}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} />
            {t("Informations du profil")}
          </h2>
          {!editing ? (
            <ActionButton
              onClick={() => setEditing(true)}
              label={t("Modifier")}
              leftSection={<FontAwesomeIcon icon={faEdit} />}
              gradient={{ gradientType: GradientType.PRIMARY }}
            />
          ) : (
            <div className="flex gap-2">
              <ActionButton
                onClick={() => setEditing(false)}
                label={t("Annuler")}
                leftSection={<FontAwesomeIcon icon={faTimes} />}
                color={{ color: ColorType.TRANSPARENT }}
              />
              <ActionButton
                onClick={handleSave}
                label={t("Sauvegarder")}
                leftSection={<FontAwesomeIcon icon={faSave} />}
                gradient={{ gradientType: GradientType.PRIMARY }}
                disabled={loading}
              />
            </div>
          )}
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300">
            {errors.general}
          </div>
        )}

        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-white font-medium mb-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {t("Nom d'utilisateur")}
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("Votre nom d'utilisateur")}
              />
            ) : (
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                {formData.name || t("Non défini")}
              </div>
            )}
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-white font-medium mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              {t("Adresse email")}
            </label>
            {editing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("Votre adresse email")}
              />
            ) : (
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                {formData.email}
              </div>
            )}
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Fields (only when editing) */}
          {editing && (
            <>
              <div>
                <label className="block text-white font-medium mb-2">
                  <FontAwesomeIcon icon={faLock} className="mr-2" />
                  {t("Nouveau mot de passe")}
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("Laissez vide pour ne pas changer")}
                />
                {errors.newPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {formData.newPassword && (
                <div>
                  <label className="block text-white font-medium mb-2">
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    {t("Confirmer le mot de passe")}
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("Confirmez votre nouveau mot de passe")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Account Creation Date */}
          <div>
            <label className="block text-white font-medium mb-2">
              {t("Membre depuis")}
            </label>
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : t("Non disponible")}
            </div>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <h3 className="text-xl font-bold text-red-400 mb-4">
            {t("Zone de danger")}
          </h3>
          <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-6">
            <p className="text-red-300 mb-4">
              {t(
                "La suppression de votre compte est irréversible. Toutes vos données seront définitivement supprimées."
              )}
            </p>
            <ActionButton
              onClick={handleDeleteAccount}
              label={t("Supprimer mon compte")}
              leftSection={<FontAwesomeIcon icon={faTrash} />}
              color={{ color: ColorType.TRANSPARENT }}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
