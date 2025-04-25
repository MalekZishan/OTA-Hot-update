Hot Updater with Supabase: Detailed Setup Guide for React Native
This README is a beginner-friendly, step-by-step guide to integrating hot-updater with Supabase in a React Native project. Hot Updater is a self-hosted solution for delivering over-the-air (OTA) updates to your React Native app, similar to CodePush, but with Supabase as the backend for storage and database management. This guide assumes you’re new to coding or React Native and includes detailed explanations, code examples, and tips to avoid common mistakes.
By the end, you’ll have a React Native app that can receive seamless updates without needing to redeploy through app stores.
What You’ll Achieve

Set up a Supabase project to store and manage app updates.
Configure hot-updater to bundle and deliver updates to your React Native app.
Integrate the HotUpdater component to handle updates in your app.
Deploy updates using a simple command-line tool.

Prerequisites
Before diving in, ensure you have the following tools and accounts ready. If you’re missing any, follow the setup instructions below.

Docker or OrbStack:

Purpose: Runs Supabase’s local development stack (databases, storage, etc.).
Installation:
Docker: Download and install from https://www.docker.com/get-started/. Choose the version for your operating system (Windows, macOS, or Linux).
OrbStack: A lighter alternative to Docker for macOS/Linux. Install from https://orbstack.dev/.
Verify: Open a terminal and run:docker --version

ororb --version

If installed, you’ll see a version number. If not, reinstall and ensure the app is running.

Tip: Keep Docker/OrbStack running in the background during development.

Node.js (Version 20 or later):

Purpose: Runs JavaScript and React Native tools.
Installation: Download from https://nodejs.org/. Choose the “LTS” version for stability.
Verify: In a terminal, run:node --version
npm --version

Ensure the Node.js version is 20.x or higher and npm is installed.
Tip: If you have an older version, uninstall it first or use a version manager like nvm.

Supabase CLI:

Purpose: Manages Supabase projects locally and interacts with Supabase services.
Installation: Install globally via npm:npm install -g @supabase/supabase

Alternatively, use it without installing:npx supabase

Verify: Run:supabase --version

You should see a version number (e.g., 1.x.x).
Tip: If the command fails, ensure Node.js and npm are correctly installed.

Supabase Account:

Purpose: Hosts your Supabase project in the cloud.
Setup:
Visit https://app.supabase.com/ and sign up with GitHub, Google, or email.
Verify your email to access the dashboard.

Tip: Keep your browser open to the Supabase dashboard for easy access later.

React Native Project:

Purpose: The app you’ll add OTA updates to.
Setup:
If you don’t have a project, create one:npx react-native init MyHotUpdaterApp

This creates a new React Native project named MyHotUpdaterApp.
Verify: Navigate to the project folder and run:cd MyHotUpdaterApp
npx react-native run-android

ornpx react-native run-ios

Ensure the app launches in an emulator or on a physical device.

Requirements:
A working React Native environment (including Xcode for iOS or Android Studio for Android). Follow the React Native CLI setup guide if needed.

Tip: Test your app before proceeding to ensure there are no setup issues.

Text Editor:

Use a code editor like Visual Studio Code (recommended for beginners), Sublime Text, or any editor you’re comfortable with.
Tip: Install extensions like “Prettier” and “ESLint” in VS Code for better JavaScript/TypeScript formatting.

Step-by-Step Setup
Step 1: Create a Supabase Project
Supabase will store your app’s update bundles and metadata. Let’s set up a new project in the Supabase dashboard.

Log In to Supabase:

Open https://app.supabase.com/ in your browser.
Sign in with your account credentials.
You’ll land on the Supabase dashboard, which lists your projects.

Create a New Project:

Click the New Project button (usually a green button in the top-right corner).
Fill in the details:
Name: Choose a name, e.g., hot-updater-demo.
Database Password: Enter a strong password (save it securely, as you’ll need it for advanced configurations).
Region: Select a region close to you for faster access (e.g., “East US” or “Europe”).
Pricing Plan: Choose the free tier (sufficient for this setup).

Click Create or Submit.
Wait 1–2 minutes for Supabase to set up the project. You’ll see a “Project Created” message.

Retrieve API Credentials:

In the Supabase dashboard, navigate to Settings > API (find “Settings” in the left sidebar).
You’ll see two important values:
Project URL: Looks like https://your-project-id.supabase.co.
Anon Key: A long string of characters (e.g., eyJhb...).

Action:
Copy both the Project URL and Anon Key to a secure place (e.g., a text file or password manager).
Warning: The Anon Key is sensitive but safe for client-side use. Never share the Service Key publicly.

Tip: Label them clearly (e.g., Supabase URL and Supabase Anon Key) to avoid confusion later.

Step 2: Install Hot Updater Dependencies
Now, let’s add the hot-updater libraries to your React Native project.

Navigate to Your Project:

Open a terminal and go to your React Native project folder:cd path/to/MyHotUpdaterApp

Tip: Ensure you’re in the correct folder by running ls (or dir on Windows) and checking for files like package.json.

Install Dependencies:

Run the following command to install the required packages:npm install hot-updater @hot-updater/metro @hot-updater/supabase dotenv

What Each Package Does:
hot-updater: Core library for managing OTA updates.
@hot-updater/metro: Integrates with React Native’s Metro bundler to create update bundles.
@hot-updater/supabase: Connects to Supabase for storing bundles and update metadata.
dotenv: Loads environment variables (like your Supabase credentials) from a .env file.

Verify:
Open package.json in your project folder.
Check the dependencies section to ensure the packages are listed, e.g.:"dependencies": {
"hot-updater": "^x.x.x",
"@hot-updater/metro": "^x.x.x",
"@hot-updater/supabase": "^x.x.x",
"dotenv": "^x.x.x",
...
}

Troubleshooting:
If the command fails, ensure your internet connection is stable and Node.js is installed.
Run npm install again to fix any missing dependencies.

Optional: Install TypeScript (if not already in your project):

If your project uses TypeScript (recommended for better code safety), ensure it’s set up:npm install --save-dev typescript @types/react @types/react-native

Rename your app file (e.g., App.js to App.tsx) if switching to TypeScript.
Tip: If you’re new to TypeScript, you can stick with JavaScript for now; hot-updater supports both.

Step 3: Initialize Hot Updater
The hot-updater CLI provides an interactive wizard to configure your project. Let’s run it.

Run the Initialization Script:

In your project folder, run:npx hot-updater init

This starts an interactive setup process in your terminal.

Answer the Prompts:

The wizard asks several questions. Here’s what to expect and how to respond:
Select a Build Plugin:
Choose Metro (use arrow keys and press Enter).
Why: Metro is the default bundler for React Native, and hot-updater uses it to create update bundles.

Select a Provider:
Choose Supabase.
Why: We’re using Supabase to store update bundles and metadata.

Create or Select a Supabase Organization:
If you have one organization in Supabase, it’s selected automatically.
If you have multiple, choose the one tied to your project (or create a new one).
Tip: Check your Supabase dashboard to confirm your organization name.

Enter Supabase Credentials:
Supabase Project URL: Paste the URL from Step 1 (e.g., https://your-project-id.supabase.co).
Supabase Anon Key: Paste the Anon Key from Step 1.
Bucket Name: Enter a name for the storage bucket, e.g., updates or app-updates.
Note: This bucket will store your update bundles. Use a simple, lowercase name without spaces.

Tip: If you make a mistake, you can rerun npx hot-updater init to overwrite the configuration.

Check Generated Files:

The script creates two files:
.env:
Contains your Supabase credentials:HOT_UPDATER_SUPABASE_URL=https://your-project-id.supabase.co
HOT_UPDATER_SUPABASE_ANON_KEY=your-anon-key
HOT_UPDATER_SUPABASE_BUCKET_NAME=updates

Warning: Never commit .env to Git. Add it to .gitignore (see Step 4).

hot-updater.config.ts:
Configures hot-updater with Metro and Supabase. It looks like:import { metro } from "@hot-updater/metro";
import { supabaseDatabase, supabaseStorage } from "@hot-updater/supabase";
import { defineConfig } from "hot-updater";
import "dotenv/config";

export default defineConfig({
build: metro({ enableHermes: true }),
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

What It Does:
build: Uses Metro to bundle your app for updates.
storage: Configures Supabase to store update bundles.
database: Configures Supabase to store update metadata (e.g., version info).

Troubleshooting:
If the .env file is missing, rerun npx hot-updater init.
If you get a “command not found” error, ensure hot-updater is installed (npm install hot-updater).

Step 4: Secure and Verify Configuration
Let’s ensure your configuration is secure and correct.

Protect the .env File:

The .env file contains sensitive Supabase credentials.
Action:
Open or create a .gitignore file in your project root.
Add the following line:.env

Verify: Run git status to ensure .env is not tracked.

Why: Committing .env to GitHub could expose your Supabase keys, allowing others to access your project.
Extra Tip: If using react-native-dotenv, ensure environment variables are not bundled in your app. See the Hot Updater Security Guide.

Review hot-updater.config.ts:

Open hot-updater.config.ts in your editor.
Check that:
supabaseUrl and supabaseAnonKey use process.env variables.
bucketName matches the name you entered (e.g., updates).

Optional Customization:
If you use Hermes (React Native’s JavaScript engine), enableHermes: true is fine.
If you don’t use Hermes, change to enableHermes: false:build: metro({ enableHermes: false }),

Tip: If you’re unsure about Hermes, check your android/app/build.gradle or ios/Podfile for Hermes references.

Test the Configuration:

Run a simple hot-updater command to verify setup:npx hot-updater --version

If it outputs a version number, your setup is likely correct.

Step 5: Set Up a Supabase Edge Function
Supabase Edge Functions handle requests for updates. Let’s create one.

Navigate to Functions in Supabase:

In the Supabase dashboard, click Functions in the left sidebar.
Click New Function or Create Function.

Create the update-server Function:

Name: Enter update-server.
Template: Choose the default template or an empty function.
Code: If the template isn’t provided, use the default hot-updater Supabase function (check the Hot Updater Docs for the latest code).
Example (basic placeholder, replace with actual code from docs if needed):import { serve } from 'https://deno.land/std/http/server.ts';

serve((\_req) => {
return new Response('Hello from update-server!', { status: 200 });
});

Save: Click Save or Create to store the function.

Deploy the Function:

In the Functions editor, click Deploy.
Wait for deployment (takes a few seconds). You’ll see a confirmation message.
Note: Copy the function’s URL (e.g., https://your-project-id.functions.supabase.co/update-server) for debugging or advanced setups.
Tip: If deployment fails, ensure your Supabase project is active and retry.

Test the Function (Optional):

Use a tool like Postman or curl to test the function:curl https://your-project-id.functions.supabase.co/update-server

You should see a response (e.g., “Hello from update-server!”).

Step 6: Integrate Hot Updater in Your App
Now, let’s add the HotUpdater component to your app to enable OTA updates.

Locate Your Main App File:

Find your main app file, typically App.js, App.tsx, or index.js in the project root or src/ folder.
Tip: If you used npx react-native init, it’s likely App.tsx.

Wrap Your App with HotUpdater:

Open the main app file and modify it to include the HotUpdater component.
Example:// App.tsx or App.js
import React from 'react';
import { HotUpdater } from 'hot-updater/react-native';
import { View, Text } from 'react-native';

// Your main app component
const App = () => {
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Text>Welcome to My Hot Updater App!</Text>
</View>
);
};

// Wrap App with HotUpdater
export default function Main() {
return (
<HotUpdater>
<App />
</HotUpdater>
);
}

What This Does:
HotUpdater checks for updates when the app starts and applies them if available.
It provides a fallback UI (e.g., a loading screen) during updates.

Tip: If your app uses a different structure (e.g., navigation), ensure HotUpdater wraps the root component.

Test the App: .CONTENT

System: ```bashnpx react-native run-android
or

```bash
npx react-native run-ios


Ensure the app launches without errors. You should see your app’s UI (e.g., “Welcome to My Hot Updater App!”).
Troubleshooting:
If you get a “module not found” error, ensure hot-updater is installed (npm install hot-updater).
If the app crashes, check the console for errors and verify your App.tsx syntax.



Step 7: Deploy Your First Update
Now, let’s create and deploy an update to test the OTA functionality.

Make a Visible Change:

Open your App.tsx and modify the text to test the update:<Text>Updated App: Version 2!</Text>


Save the file.


Build and Deploy the Update:

Run the deploy command:npx hot-updater deploy


What Happens:
The Metro bundler creates an update bundle (JavaScript and assets).
The bundle is uploaded to the Supabase storage bucket (e.g., updates).
Metadata (e.g., version, timestamp) is saved to the Supabase database.


Output: You’ll see logs like:Building bundle...
Uploading to Supabase bucket 'updates'...
Update deployed successfully!


Troubleshooting:
If the command fails, check your .env file for correct credentials.
Ensure your Supabase project is active and the bucket exists (check the Supabase dashboard under Storage).




Verify the Update:

Restart your app (close and reopen it on your device/emulator).
The HotUpdater component should download the update and display the new text (“Updated App: Version 2!”).
Check Supabase:
In the Supabase dashboard, go to Storage > updates to see the uploaded bundle.
Go to Database > Tables (if configured) to view update metadata.


Tip: If the update doesn’t apply, ensure the Edge Function is deployed and your app is connected to the internet.



Advanced Tips for Beginners

Local Supabase Development:

To test Supabase locally, initialize and start the Supabase stack:supabase init
supabase start


Access Supabase Studio at http://localhost:54323 to manage your local database and storage.
Stop the stack when done:supabase stop


Why: Local development is faster and doesn’t require an internet connection.


Debugging Updates:

Enable React Native’s debug mode (shake the device or press Ctrl+M on Android, Cmd+D on iOS) to view logs.
Check the Supabase dashboard for storage and database activity.
Use hot-updater’s verbose mode for detailed logs:npx hot-updater deploy --verbose




Adding More Features:

Sentry Integration: Track crashes by uploading source maps to Sentry:npm install @hot-updater/sentry

Update hot-updater.config.ts with Sentry settings (see docs).
Custom Providers: Use AWS or Cloudflare instead of Supabase by installing @hot-updater/aws or @hot-updater/cloudflare.


Versioning Updates:

To manage multiple updates, add a version field in hot-updater.config.ts:export default defineConfig({
  version: '1.0.1',
  // ... other config
});


Increment the version (e.g., 1.0.2) for each deployment.



Common Pitfalls and Fixes

“Supabase CLI not found”:

Reinstall the CLI:npm install -g @supabase/supabase


Ensure Docker is running.


“Invalid Supabase credentials”:

Double-check your .env file for typos in HOT_UPDATER_SUPABASE_URL or HOT_UPDATER_SUPABASE_ANON_KEY.
Copy credentials directly from the Supabase dashboard.


“Bundle upload failed”:

Verify the bucket name in .env matches the one in Supabase.
Check your internet connection.


“App doesn’t update”:

Ensure the Edge Function is deployed and accessible.
Restart the app multiple times or clear the app cache (Settings > Apps > Clear Data on Android).


“Metro bundler errors”:

Run npm install to ensure all dependencies are installed.
Check hot-updater.config.ts for syntax errors.



Resources

Hot Updater Documentation: https://gronxb.github.io/hot-updater/
Supabase Documentation: https://supabase.com/docs/
React Native Documentation: https://reactnative.dev/docs/
GitHub Repository: https://github.com/gronxb/hot-updater
Supabase Dashboard: https://app.supabase.com/

Support
If you run into issues:

Check the Hot Updater GitHub Issues for similar problems.
Ask for help on the Supabase Discord or Supabase Community Forum.
Open a new issue on the hot-updater GitHub repository with details about your problem.

Next Steps

Experiment with multiple updates by changing your app’s UI and redeploying.
Explore the Hot Updater Advanced Guide for custom update strategies.
Share your app with testers to confirm updates work on different devices.



Note:
1-: This is only work on production mode not on development mode.
2-: Docker is required to run supabase.(Only Just install it and open it in local computer )




Congratulations! You’ve set up OTA updates for your React Native app using hot-updater and Supabase. Keep coding and have fun delivering seamless updates!
```
