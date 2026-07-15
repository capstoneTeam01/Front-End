# FixBee Frontend

The FixBee frontend is an Expo SDK 54 and React Native mobile application for iOS and Android.

## Requirements

Install:

- Node.js `20.19.x` or newer compatible Node 20 release
- npm, included with Node.js
- Expo Go on a physical phone, or native simulator/emulator tools
- A configured and running FixBee backend

Optional native development tools:

- Xcode 16.1 or newer on macOS for iOS builds
- Android Studio and Android SDK for Android builds

Confirm Node.js and npm:

```bash
node --version
npm --version
```

## Install Packages

From this `Front-End` directory:

```bash
npm install
```

## Environment Configuration

Create `.env` in this directory. Never commit it.

```dotenv
EXPO_PUBLIC_FIXBEE_API_URL=http://localhost:5000

EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
GOOGLE_CLIENT_ID=

EXPO_PUBLIC_PREFERRED_QUOTE_MAIL_CLIENT=gmail
EXPO_PUBLIC_FIXBEE_QUOTE_CC_EMAIL=fixbee.official@gmail.com
EXPO_PUBLIC_FIXBEE_REQUESTER_NAME=FixBee User
```

Choose the API URL for the runtime:

| Runtime | API URL |
| --- | --- |
| iOS Simulator | `http://127.0.0.1:5000` |
| Android Emulator | `http://10.0.2.2:5000` |
| Physical phone | `http://YOUR_COMPUTER_LAN_IP:5000` |

For a physical phone:

- Connect the phone and computer to the same Wi-Fi network.
- Replace `YOUR_COMPUTER_LAN_IP` with an address such as `192.168.1.25`.
- Do not use `localhost`, because it refers to the phone itself.
- Allow incoming Node.js connections through the computer firewall.
- Open `http://YOUR_COMPUTER_LAN_IP:5000/health` in the phone browser to test connectivity.
- Restart Expo after changing `.env`.

Variables beginning with `EXPO_PUBLIC_` are bundled into the client. Never store private keys or passwords in them.

## Run with Expo Go

Start the backend first, then run:

```bash
npm start
```

Then:

- Scan the QR code with Expo Go on Android.
- Scan it with the Camera app on iOS and open the Expo link.
- Press `i` for an available iOS Simulator.
- Press `a` for an available Android Emulator.

Clear the Expo cache after environment or bundler changes:

```bash
npx expo start --clear
```

## Run Native Development Builds

iOS on macOS with Xcode:

```bash
npm run ios
```

Android with Android Studio and an emulator or connected device:

```bash
npm run android
```

Web preview:

```bash
npm run web
```

The mobile app is the primary target. Verify camera, location, secure storage, OAuth, animated SVG WebViews, and native navigation on iOS or Android rather than relying only on web preview.

## Backend Dependencies

The separate backend repository must be configured with:

- MongoDB
- Redis
- Python 3
- Ultralytics YOLO
- OpenCV and NumPy
- OpenAI, Groq, or local Ollama
- Ollama text and vision models when Local AI or fallback is enabled

See `../Backend/README.md` when both repositories are checked out inside the `Capestone` folder.

## Common Problems

### The phone cannot reach the backend

- Use the computer's LAN IP instead of `localhost`.
- Confirm both devices use the same network.
- Confirm the backend `/health` endpoint opens from the phone browser.
- Check the firewall and port `5000`.
- Restart Expo after updating `.env`.

### Expo shows stale code or variables

```bash
npx expo start --clear
```

### Login or logout fails

- Confirm the backend health response shows both MongoDB and Redis connected.
- Clear the stored app login and sign in again after backend JWT-secret changes.

### Photo upload or analysis fails

- Confirm camera or photo-library permission is granted.
- Confirm the backend is running and reachable.
- Confirm backend blob storage and AI providers are configured.
- Confirm Python and YOLO setup passes the backend verification command.

### Animated onboarding bees do not appear

- Run `npm install` to install `react-native-webview`.
- Restart with `npx expo start --clear`.
- Rebuild a custom native development build after native dependency changes.

## Security

- Never commit `.env`.
- Never place private secrets in `EXPO_PUBLIC_` variables.
- Use separate development and production OAuth credentials.
- Rotate any credential exposed in screenshots, logs, messages, or version control.
