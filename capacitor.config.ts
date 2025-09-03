import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.starter.pack",
  appName: "StarterPack",
  webDir: "app/out",
  ios: {
    path: "mobile/ios",
  },
  android: {
    path: "mobile/android",
  },
};

export default config;
