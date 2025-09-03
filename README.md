# Starter pack

A full-stack application with Next.js frontend, NestJS backend, and Capacitor mobile support. Features internationalization with support for 6 languages and a modern, responsive design.

## 🏗️ Project Structure

```
starterpack/
├── app/                 # Next.js frontend application
├── api/                 # NestJS backend API
├── mobile/              # Capacitor mobile apps (iOS & Android)
├── capacitor.config.ts  # Capacitor configuration
└── package.json         # Root workspace configuration
```

## 🚀 Tech Stack

### Frontend (app/)

- **Next.js 15.5.2** - React framework
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **next-intl** - Internationalization

### Backend (api/)

- **NestJS 11.0.1** - Node.js framework
- **TypeScript** - Type safety
- **Jest** - Testing framework

### Mobile

- **Capacitor 7.4.3** - Cross-platform mobile development
- **iOS & Android** support

## 🌍 Internationalization

The app supports 6 languages:

- English (en) - Default
- French (fr)
- German (de)
- Spanish (es)
- Italian (it)
- Portuguese (pt)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd starterpack
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

## 🛠️ Development

### Start Development Servers

Run both frontend and backend concurrently:

```bash
yarn dev
```

Or run them separately:

```bash
# Frontend only
yarn dev:app

# Backend only
yarn dev:api
```

### Available Scripts

| Command            | Description                                         |
| ------------------ | --------------------------------------------------- |
| `yarn dev`         | Start both frontend and backend in development mode |
| `yarn dev:app`     | Start Next.js frontend development server           |
| `yarn dev:api`     | Start NestJS backend development server             |
| `yarn build`       | Build the frontend application                      |
| `yarn install:all` | Install all dependencies                            |

## 📱 Mobile Development

### Prerequisites

- Node.js and npm/yarn
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Setup Mobile Platforms

1. **Add iOS platform**

   ```bash
   npx cap add ios
   ```

2. **Add Android platform**

   ```bash
   npx cap add android
   ```

3. **Sync web assets to mobile**
   ```bash
   npx cap sync
   ```

### Running on Mobile

**iOS:**

```bash
npx cap open ios
```

**Android:**

```bash
npx cap open android
```

## 🏗️ Building for Production

1. **Build the frontend**

   ```bash
   yarn build
   ```

2. **Sync to mobile platforms**

   ```bash
   npx cap sync
   ```

3. **Build mobile apps**
   - iOS: Use Xcode to build and deploy
   - Android: Use Android Studio to build and deploy

## 📁 Project Details

### Frontend (app/)

- **Port**: 3000 (development)
- **Build output**: `app/out/` (static export)
- **Styling**: Tailwind CSS with PostCSS
- **Internationalization**: next-intl with locale files in `public/locales/`

### Backend (api/)

- **Port**: 3001 (default NestJS port)
- **Build output**: `api/dist/`
- **Testing**: Jest with coverage reports

### Mobile Configuration

- **App ID**: `com.starter.pack`
- **App Name**: `StarterPack`
- **Web Directory**: `app/out/`
- **iOS Path**: `mobile/ios/`
- **Android Path**: `mobile/android/`

## 🔧 Configuration

### Capacitor Configuration

The mobile app configuration is defined in `capacitor.config.ts`:

- App ID and name
- Web directory path
- Platform-specific paths

### Internationalization

- Locale configuration in `app/src/i18n/config.ts`
- Translation files in `public/locales/[locale]/common.json`
- Language selector component available

## 📝 Development Notes

- The project uses Yarn workspaces for monorepo management
- Frontend and backend can be developed independently
- Mobile apps are automatically synced with web assets
- All platforms share the same internationalization setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on all platforms (web, iOS, Android)
5. Submit a pull request

## 📄 License

This project is private and unlicensed.
