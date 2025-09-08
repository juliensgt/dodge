import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize, KeyboardStyle } from "@capacitor/keyboard";

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
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Native,
      style: KeyboardStyle.Light,
      resizeOnFullScreen: true,
    },
    StatusBar: {
      overlaysWebView: false,
      style: "LIGHT",
      backgroundColor: "#ffffffff",
    },
  },
};

export default config;
