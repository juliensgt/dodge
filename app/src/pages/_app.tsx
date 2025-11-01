import type { AppProps } from "next/app";
import Head from "next/head";
import "@/pages/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { CollectionProvider } from "@/contexts/CollectionContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/utils/toast/ToastContainer";
import { AuthLevel } from "@/types/auth/auth";
import { StatusBarComponent } from "@/components/utils/StatusBarComponent";
config.autoAddCss = true;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <AuthProvider requiredLevel={AuthLevel.PUBLIC}>
        <CollectionProvider>
          <StatusBarComponent />
          <ToastProvider>
            <Head>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
          </ToastProvider>
        </CollectionProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
