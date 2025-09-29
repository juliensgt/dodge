import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthLevel } from "@/types/auth/auth";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        // User is authenticated, redirect to dashboard
        router.push("/dashboard");
      } else {
        // User is not authenticated, redirect to welcome page
        router.push("/welcome");
      }
    }
  }, [isAuthenticated, loading, router]);

  // Show loading while checking authentication
  return (
    <AuthGuard level={AuthLevel.PUBLIC}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Chargement...</div>
      </div>
    </AuthGuard>
  );
}
