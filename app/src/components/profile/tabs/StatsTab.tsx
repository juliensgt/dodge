import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType, GradientType } from "@/enums/themes/list/PurpleTheme";
import {
  faChartBar,
  faTrophy,
  faGamepad,
  faClock,
  faUsers,
  faCoins,
  faCalendarAlt,
  faCrown,
  faMedal,
  faFire,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@supabase/supabase-js";

interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  totalPlayTime: number;
  currentStreak: number;
  bestStreak: number;
  rank: string;
  level: number;
  experience: number;
  coins: number;
  friends: number;
  achievements: number;
}

export default function StatsTab() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    gamesWon: 0,
    winRate: 0,
    totalPlayTime: 0,
    currentStreak: 0,
    bestStreak: 0,
    rank: "Débutant",
    level: 1,
    experience: 0,
    coins: 0,
    friends: 0,
    achievements: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccountData();
  }, []);

  const loadAccountData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        // In a real app, you would fetch these stats from your API
        setStats({
          gamesPlayed: 127,
          gamesWon: 89,
          winRate: 70.1,
          totalPlayTime: 2840, // minutes
          currentStreak: 5,
          bestStreak: 12,
          rank: "Expert",
          level: 15,
          experience: 2340,
          coins: 1250,
          friends: 23,
          achievements: 8,
        });
      }
    } catch (error) {
      console.error("Error loading account data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPlayTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Débutant":
        return "text-gray-400";
      case "Intermédiaire":
        return "text-green-400";
      case "Avancé":
        return "text-blue-400";
      case "Expert":
        return "text-purple-400";
      case "Maître":
        return "text-yellow-400";
      case "Légende":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case "Débutant":
        return faGamepad;
      case "Intermédiaire":
        return faMedal;
      case "Avancé":
        return faTrophy;
      case "Expert":
        return faCrown;
      case "Maître":
        return faFire;
      case "Légende":
        return faCrown;
      default:
        return faGamepad;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-white text-xl">{t("Chargement...")}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Account Overview */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                {user?.user_metadata?.name || user?.email || t("Utilisateur")}
              </h2>
              <p className="text-white/70 text-lg">
                {t("Niveau")} {stats.level} • {stats.rank}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <FontAwesomeIcon
              icon={getRankIcon(stats.rank)}
              className={`text-2xl ${getRankColor(stats.rank)}`}
            />
            <span className={`text-2xl font-bold ${getRankColor(stats.rank)}`}>
              {stats.rank}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">
              {t("Progression vers le niveau suivant")}
            </span>
            <span className="text-white/70">{stats.experience}/2500 XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(stats.experience / 2500) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Games Played */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <FontAwesomeIcon
              icon={faGamepad}
              className="text-2xl text-blue-400"
            />
            <span className="text-3xl font-bold text-white">
              {stats.gamesPlayed}
            </span>
          </div>
          <h3 className="text-white font-medium">{t("Parties jouées")}</h3>
        </div>

        {/* Win Rate */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-2xl text-yellow-400"
            />
            <span className="text-3xl font-bold text-white">
              {stats.winRate}%
            </span>
          </div>
          <h3 className="text-white font-medium">{t("Taux de victoire")}</h3>
        </div>

        {/* Play Time */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <FontAwesomeIcon
              icon={faClock}
              className="text-2xl text-green-400"
            />
            <span className="text-3xl font-bold text-white">
              {formatPlayTime(stats.totalPlayTime)}
            </span>
          </div>
          <h3 className="text-white font-medium">{t("Temps de jeu")}</h3>
        </div>

        {/* Current Streak */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <FontAwesomeIcon icon={faFire} className="text-2xl text-red-400" />
            <span className="text-3xl font-bold text-white">
              {stats.currentStreak}
            </span>
          </div>
          <h3 className="text-white font-medium">{t("Série actuelle")}</h3>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Game Statistics */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FontAwesomeIcon icon={faChartBar} />
            {t("Statistiques de jeu")}
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">{t("Parties gagnées")}</span>
              <span className="text-white font-bold">{stats.gamesWon}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">{t("Meilleure série")}</span>
              <span className="text-white font-bold">{stats.bestStreak}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">{t("Niveau actuel")}</span>
              <span className="text-white font-bold">{stats.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">{t("Expérience")}</span>
              <span className="text-white font-bold">
                {stats.experience} XP
              </span>
            </div>
          </div>
        </div>

        {/* Social & Economy */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FontAwesomeIcon icon={faUsers} />
            {t("Social & Économie")}
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80 flex items-center gap-2">
                <FontAwesomeIcon icon={faCoins} className="text-yellow-400" />
                {t("Coins")}
              </span>
              <span className="text-white font-bold">{stats.coins}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} className="text-blue-400" />
                {t("Amis")}
              </span>
              <span className="text-white font-bold">{stats.friends}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 flex items-center gap-2">
                <FontAwesomeIcon icon={faTrophy} className="text-purple-400" />
                {t("Succès")}
              </span>
              <span className="text-white font-bold">{stats.achievements}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-green-400"
                />
                {t("Membre depuis")}
              </span>
              <span className="text-white font-bold">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("fr-FR", {
                      month: "short",
                      year: "numeric",
                    })
                  : t("N/A")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6">
          {t("Gestion des données")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {t("Exporter mes données")}
            </h4>
            <p className="text-white/70 text-sm">
              {t(
                "Téléchargez une copie de toutes vos données de jeu et de profil."
              )}
            </p>
            <ActionButton
              onClick={() => console.log("Export data")}
              label={t("Exporter")}
              leftSection={<FontAwesomeIcon icon={faDownload} />}
              gradient={{ gradientType: GradientType.PRIMARY }}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {t("Importer des données")}
            </h4>
            <p className="text-white/70 text-sm">
              {t(
                "Importez des données de sauvegarde depuis un autre appareil."
              )}
            </p>
            <ActionButton
              onClick={() => console.log("Import data")}
              label={t("Importer")}
              leftSection={<FontAwesomeIcon icon={faUpload} />}
              color={{ color: ColorType.TRANSPARENT }}
            />
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="flex justify-center">
        <ActionButton
          onClick={logout}
          label={t("Se déconnecter")}
          leftSection={<FontAwesomeIcon icon={faDownload} />}
          color={{ color: ColorType.TRANSPARENT }}
        />
      </div>
    </div>
  );
}
