import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize, KeyboardStyle } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "com.dodge.app",
  appName: "Dodge",
  webDir: "app/out",
  server: {
    url: "http://192.168.1.8:3000",
    cleartext: true,
    allowNavigation: ["192.168.1.8", "localhost"],
  },
  ios: {
    path: "mobile/ios",
  },
  android: {
    path: "mobile/android",
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Native,
      style: KeyboardStyle.Light,
      resizeOnFullScreen: true,
    },
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#1e1b4b",
    },
  },
};

export default config;
