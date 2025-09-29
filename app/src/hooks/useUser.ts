import { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/api.service";
import { useSocket } from "@/contexts/SocketProvider";

interface UserDetails {
  _id: string;
  name: string;
  email?: string;
  skinCards: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export const useUser = () => {
  const { socketId } = useSocket();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (targetUserId: string) => {
    if (!targetUserId) return;

    setLoading(true);
    setError(null);

    try {
      const details = await apiService.getUserDetails(targetUserId);
      setUserDetails(details);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch user details"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(
    async (userData: {
      name?: string;
      email?: string;
      skinCards?: string;
      language?: string;
    }) => {
      if (!socketId) return;

      setLoading(true);
      setError(null);

      try {
        const updatedDetails = await apiService.updateUser(socketId, userData);
        setUserDetails(updatedDetails);
      } catch (err) {
        console.error("Failed to update user:", err);
        setError(err instanceof Error ? err.message : "Failed to update user");
      } finally {
        setLoading(false);
      }
    },
    [socketId]
  );

  const createUser = useCallback(
    async (userData: {
      name: string;
      email?: string;
      language?: string;
      skinCards?: string;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const newUser = await apiService.createUser(userData);
        setUserDetails(newUser);
        return newUser;
      } catch (err) {
        console.error("Failed to create user:", err);
        setError(err instanceof Error ? err.message : "Failed to create user");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Auto-fetch user details when userId changes
  useEffect(() => {
    if (socketId) {
      fetchUser(socketId);
    } else {
      setUserDetails(null);
    }
  }, [socketId, fetchUser]);

  return {
    userDetails,
    loading,
    error,
    fetchUserDetails: fetchUser,
    updateUser,
    createUser,
  };
};
