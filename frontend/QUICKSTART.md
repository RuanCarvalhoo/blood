# Quick Start Guide - Blood Donation App

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo Go** app on your phone (for testing)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/MarceloDChagas/blood.git
cd blood
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> Note: We use `--legacy-peer-deps` due to React 19 compatibility

### 3. Start the Development Server

```bash
npm start
```

This will:
- Start the Expo development server
- Open the Expo DevTools in your browser
- Display a QR code in the terminal

### 4. Run on Your Device

#### Option A: Physical Device (Recommended for testing)

1. Install **Expo Go** app on your phone
2. Scan the QR code from the terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app
3. The app will load on your device

#### Option B: Simulator/Emulator

**Android:**
```bash
npm run android
```
*Requires Android Studio and Android SDK*

**iOS (macOS only):**
```bash
npm run ios
```
*Requires Xcode*

**Web:**
```bash
npm run web
```
*Opens in your default browser*

## Project Structure

```
blood/
├── App.tsx                 # Main app entry point
├── src/
│   ├── components/         # Reusable UI components
│   ├── constants/          # App constants (colors, levels)
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # App screens
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
├── assets/                 # Images and icons
└── app.json               # Expo configuration
```

## Understanding the App

### Key Concepts

1. **Gamification System**
   - Users earn 100 points per donation
   - 5 progressive levels with benefits
   - Badges for achievements

2. **Navigation**
   - 4 main tabs: Home, Donations, Rewards, Profile
   - Tab navigation at the bottom

3. **Data Flow** (Currently Mock Data)
   - User data is hardcoded for demonstration
   - Ready for backend integration

### Mock User Data

The app currently uses mock data:
- Name: João Silva
- Blood Type: O+
- Points: 250 (Level 2)
- Donations: 2

## Development Tips

### Making Changes

1. **Edit any file** in the `src/` directory
2. **Save the file** (Ctrl/Cmd + S)
3. **See changes instantly** on your device (Fast Refresh)

### Common Tasks

#### Add a New Screen

1. Create file in `src/screens/NewScreen.tsx`
2. Add to navigation in `src/navigation/AppNavigator.tsx`
3. Add route type in `src/types/index.ts`

#### Add New Styled Component

1. Add to `src/components/StyledComponents.ts`
2. Import where needed

#### Modify Colors/Constants

1. Edit `src/constants/index.ts`
2. Changes apply app-wide

### TypeScript

This project uses **strict TypeScript**:
- All types are defined in `src/types/index.ts`
- Utility functions are typed
- No `any` types allowed

To check types:
```bash
npx tsc --noEmit
```

## Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache and restart
npx expo start -c
```

### Dependency Issues

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit
```

### Port Already in Use

```bash
# Kill process on port 8081
npx kill-port 8081
# Or start on different port
npx expo start --port 8082
```

## Testing Features

### Test Gamification

The mock user has 250 points (Level 2). To see different levels:

1. Edit `src/screens/HomeScreen.tsx`
2. Change `points: 250` to:
   - `0-100`: Level 1 (Iniciante)
   - `101-300`: Level 2 (Doador Regular)
   - `301-600`: Level 3 (Herói do Sangue)
   - `601-1000`: Level 4 (Lenda Viva)
   - `1001+`: Level 5 (Salvador de Vidas)

### Test Donations

1. Check `src/screens/DonationsScreen.tsx`
2. Add more mock donations to the array
3. See them appear in the list

### Test Badges

1. Edit `src/screens/RewardsScreen.tsx`
2. Add more badges to `earnedBadges` array
3. View in Rewards screen

## Building for Production

### Create Production Build

```bash
# For Android (APK)
eas build --platform android

# For iOS (IPA)
eas build --platform ios

# For both
eas build --platform all
```

*Requires Expo Application Services (EAS) account*

## Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Styled Components](https://styled-components.com/docs/basics)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Support

For issues or questions:
1. Check the [README.md](README.md)
2. Review [IMPLEMENTATION.md](IMPLEMENTATION.md)
3. Open an issue on GitHub

---

Happy Coding! 🩸💻
