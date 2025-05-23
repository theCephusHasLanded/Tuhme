# TUHME - The Home Try-On Experience

TUHME is a luxury try-on service that delivers designer garments to your door. You can try before you buy, keeping only what you love and returning the rest.

## Development

This project is built with:
- React + Vite
- Firebase (Authentication, Firestore, Hosting)
- Material UI

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Firebase Setup

The project is already configured with Firebase. The configuration is in `src/firebase/config.js`.

#### First-time Firebase Setup

Before deploying for the first time, you need to enable Firebase services:

1. Run the setup guide:
   ```
   npm run firebase:setup
   ```

2. Follow the instructions to enable each Firebase service (Hosting, Authentication, Firestore, etc.)

3. Wait 5-10 minutes for services to be fully enabled

#### Deploying to Firebase

1. Make sure you have Firebase CLI installed:
   ```
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```
   npm run firebase:login
   ```

3. Deploy to Firebase:
   - For hosting only (fastest option):
     ```
     npm run deploy
     ```
   - For all services (after they're enabled):
     ```
     npm run deploy:all
     ```

This will build the project and deploy it to Firebase Hosting.

## Project Structure

- `src/components/`: React components
- `src/contexts/`: Context providers (Auth, etc.)
- `src/firebase/`: Firebase configuration
- `src/pages/`: Page components
- `src/styles/`: CSS and theme files
- `src/utils/`: Utility functions

## Authentication

The application uses Firebase Authentication. Users can sign in with:
- Email/Password
- Google

## Database

The application uses Firestore for storing data:
- Users
- Orders
- Products

<!-- Storage section removed as it's not being used yet -->
<!-- Will add back when Firebase Storage is integrated -->