# 🚀 Hot Updater with Supabase for React Native OTA Updates

This guide explains how to set up `hot-updater` with Supabase to add **over-the-air (OTA) updates** to a React Native app. Follow these steps to configure and deploy updates. Based on the [Hot Updater Quick Start Video](https://www.youtube.com/watch?v=jJouZCEkXyA).

## 🛠️ Requirements

- **Docker**: Runs Supabase locally.
  - Install: [Docker](https://www.docker.com/get-started/)
  - Command: Check installation
    ```bash
    docker --version
    ```
- **Node.js (v20+)**: For React Native and tools.
  - Install: [Node.js LTS](https://nodejs.org/en/download/)
  - Command: Verify
    ```bash
    node --version
    npm --version
    ```
- **Supabase CLI**: Manages Supabase projects.
  - Install:
    ```bash
    npm install -g @supabase/supabase
    ```
  - Command: Check
    ```bash
    supabase --version
    ```
- **Supabase Account**: For cloud project.
  - Sign up: [Supabase](https://app.supabase.com/)
- **React Native Project**: Your app.
  - Create:
    ```bash
    npx react-native init MyHotUpdaterApp
    ```
  - Command: Test
    ```bash
    cd MyHotUpdaterApp
    npx react-native run-android
    ```
    or
    ```bash
    npx react-native run-ios
    ```
  - Needs: React Native CLI, [Xcode](https://developer.apple.com/xcode/) (iOS), or [Android Studio](https://developer.android.com/studio) (Android).
- **Text Editor**: Like [VS Code](https://code.visualstudio.com/).

## 📋 Setup Steps

### Step 1: Create Supabase Project

1. Log in to [Supabase Dashboard](https://app.supabase.com/).
2. Click **New Project**.
3. Set:
   - Name: e.g., `hot-updater-app`
   - Password: Strong password
   - Region: Nearest location
4. Click **Create** (wait 1–2 minutes).
5. Go to **Settings > API** and copy:
   - **Project URL**: e.g., `https://your-project-id.supabase.co`
   - **Anon Key**: Long string

### Step 2: Install Hot Updater

1. Go to project folder:
   ```bash
   cd path/to/MyHotUpdaterApp
   ```
2. Install dependencies:
   ```bash
   npm install hot-updater @hot-updater/metro @hot-updater/supabase dotenv
   ```

### Step 3: Configure Hot Updater

1. Run setup command:
   ```bash
   npx hot-updater init
   ```
2. Answer prompts:
   - Build Plugin: Choose `Metro`
   - Provider: Choose `Supabase`
   - Supabase URL: Paste from Step 1
   - Anon Key: Paste from Step 1
   - Bucket Name: e.g., `updates`
3. Files created:

   - `.env`:
     ```plaintext
     HOT_UPDATER_SUPABASE_URL=https://your-project-id.supabase.co
     HOT_UPDATER_SUPABASE_ANON_KEY=your-anon-key
     HOT_UPDATER_SUPABASE_BUCKET_NAME=updates
     ```
   - `hot-updater.config.ts`:

     ```typescript
     import {metro} from '@hot-updater/metro';
     import {supabaseDatabase, supabaseStorage} from '@hot-updater/supabase';
     import {defineConfig} from 'hot-updater';
     import 'dotenv/config';

     export default defineConfig({
       build: metro({enableHermes: true}),
       storage: supabaseStorage({
         supabaseUrl: process.env.HOT_UPDATER_SUPABASE_URL!,
         supabaseAnonKey: process.env.HOT_UPDATER_SUPABASE_ANON_KEY!,
         bucketName: process.env.HOT_UPDATER_SUPABASE_BUCKET_NAME!,
       }),
       database: supabaseDatabase({
         supabaseUrl: process.env.HOT_UPDATER_SUPABASE_URL!,
         supabaseAnonKey: process.env.HOT_UPDATER_SUPABASE_ANON_KEY!,
       }),
     });
     ```

### Step 4: Secure Files

1. Add `.env` to `.gitignore`:
   ```plaintext
   .env
   ```
2. Check `hot-updater.config.ts` for correct settings.
3. Test setup:
   ```bash
   npx hot-updater --version
   ```

### Step 5: Set Up Edge Function

1. In Supabase dashboard, go to **Functions**.
2. Click **New Function**.
3. Set:
   - Name: `update-server`
   - Use default template or code from [Hot Updater Docs](https://gronxb.github.io/hot-updater/)
4. Click **Save** and **Deploy**.

### Step 6: Add Hot Updater to App

1. Open `App.tsx` or `App.js`.
2. Update code:

   ```typescript
   import React from 'react';
   import {HotUpdater} from 'hot-updater/react-native';
   import {View, Text} from 'react-native';

   const App = () => {
     return (
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <Text>Hot Updater App</Text>
       </View>
     );
   };

   export default function Main() {
     return (
       <HotUpdater>
         <App />
       </HotUpdater>
     );
   }
   ```

3. Run app:
   ```bash
   npx react-native run-android
   ```
   or
   ```bash
   npx react-native run-ios
   ```

### Step 7: Deploy Update

1. Change `App.tsx`:
   ```typescript
   <Text>Updated App V2</Text>
   ```
2. Deploy update:
   ```bash
   npx hot-updater deploy
   ```
3. Restart app to see new text.
4. Check Supabase:
   - **Storage > updates**: See bundle
   - **Database**: View metadata

## 🛠️ Troubleshooting

- **Supabase CLI error**:
  - Reinstall:
    ```bash
    npm install -g @supabase/supabase
    ```
- **Wrong credentials**:
  - Check `.env` file for correct URL and Anon Key.
- **Deploy fails**:
  - Verify bucket exists in Supabase Storage.
- **No update**:
  - Redeploy Edge Function or check internet.

## 📚 Resources

- [Hot Updater Video](https://www.youtube.com/watch?v=jJouZCEkXyA)
- [Hot Updater Docs](https://gronxb.github.io/hot-updater/)
- [Supabase Docs](https://supabase.com/docs/)
- [React Native Docs](https://reactnative.dev/docs/)
- [Hot Updater GitHub](https://github.com/gronxb/hot-updater)
- [Watch the video to see how to implement everything from start to finish.](https://www.youtube.com/watch?app=desktop&v=jJouZCEkXyA)
