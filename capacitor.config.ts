import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dodge.app",
  appName: "DodgeApp",
  webDir: "app/out",
  ios: {
    path: "mobile/ios",
  },
  android: {
    path: "mobile/android",
  },
};

export default config;
