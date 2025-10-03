import type { AppProps } from "next/app";
import Head from "next/head";
import "@/pages/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/utils/toast/ToastContainer";
import { AuthLevel } from "@/types/auth/auth";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider requiredLevel={AuthLevel.PUBLIC}>
          <ToastProvider>
            <Head>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
