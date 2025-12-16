# Deployment Instructions

Your app is built and ready to deploy!

Because deployment requires logging into a hosting account (like Surge or Firebase) with your personal email and password, you must run the final command in your terminal.

## Option 1: Surge.sh (Simplest)
1. Run this command in your terminal:
   ```powershell
   npx surge ./dist
   ```
2. Type your email and create a password when prompted.
3. It will give you a link (e.g., `sable-sofa.surge.sh`). That is your live website!

## Option 2: Firebase Hosting (Recommended)
Since you are using Firebase for the database, this is the best option.
1. Run:
   ```powershell
   firebase login
   ```
   (Follow the login steps in the browser)
2. Run:
   ```powershell
   firebase init hosting
   ```
   - Choose: **Use an existing project** -> `corizo-edutech`
   - Public directory: `dist`
   - Rewrite all urls to index.html: **Yes**
   - Overwrite index.html: **No**
3. Run:
   ```powershell
   firebase deploy
   ```
