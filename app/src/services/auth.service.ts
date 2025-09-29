import { createClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

class AuthService {
  private currentUser: User | null = null;

  /**
   * Get the current user from Supabase
   */
  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) return this.currentUser;

    const {
      data: { user },
    } = await createClient().auth.getUser();
    this.currentUser = user;
    return user;
  }

  /**
   * Get the current user ID
   */
  async getUserId(): Promise<string | null> {
    const user = await this.getCurrentUser();
    return user?.id || null;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await createClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    this.currentUser = data.user;
    return data;
  }

  /**
   * Sign up with email and password
   */
  async signUpWithEmail(
    email: string,
    password: string,
    metadata?: { name?: string }
  ) {
    const { data, error } = await createClient().auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) throw error;

    this.currentUser = data.user;
    return data;
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    const { data, error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign in with Apple
   */
  async signInWithApple() {
    const { data, error } = await createClient().auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  }

  /**
   * Sign out
   */
  async signOut() {
    const { error } = await createClient().auth.signOut();
    if (error) throw error;

    this.currentUser = null;
  }

  /**
   * Get access token for API calls
   */
  async getAccessToken(): Promise<string | null> {
    const {
      data: { session },
    } = await createClient().auth.getSession();
    return session?.access_token || null;
  }

  /**
   * Initialize user session - now handled by Supabase
   */
  async initializeUserSession(): Promise<string> {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error("User not authenticated");
    }
    return userId;
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    return createClient().auth.onAuthStateChange((event, session) => {
      this.currentUser = session?.user || null;
      callback(this.currentUser);
    });
  }
}

export const authService = new AuthService();
export default authService;
