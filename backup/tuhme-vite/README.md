# TUHME - At-Home Fitting Room Service

TUHME is an at-home fitting room service that connects clients with personal stylists via WhatsApp. This application serves as the dashboard for stylists to manage client requests, orders, and appointments.

## Application Features

- **Authentication System**: Secure login for stylists
- **Dashboard Overview**: At-a-glance metrics showing pending requests, active orders, and upcoming appointments
- **Order Management**: View and manage client orders through their lifecycle
- **Client Management**: Track client preferences, order history, and contact information
- **WhatsApp Integration**: Communicate with clients directly through the platform
- **Responsive Design**: Works on both desktop and mobile devices

## Technology Stack

- **Frontend**: React with Vite
- **UI Library**: Material UI
- **Routing**: React Router
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **API Integration**: WhatsApp Business API

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open your browser to the local development URL (usually `http://localhost:5173`)

## Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── firebase/         # Firebase configuration and services
├── pages/            # Main application pages
│   ├── LandingPage.jsx         # Public landing page
│   ├── LoginPage.jsx           # Authentication page
│   ├── DashboardPage.jsx       # Main dashboard overview
│   ├── OrdersPage.jsx          # Orders management
│   ├── OrderDetailsPage.jsx    # Individual order details
│   ├── ClientsPage.jsx         # Client management
│   ├── ClientDetailsPage.jsx   # Individual client details
│   └── NotFoundPage.jsx        # 404 error page
└── App.jsx           # Main application component with routing
```

## Authentication

The application uses Firebase Authentication for secure stylist access. To login:

1. Navigate to the `/login` route
2. Enter your stylist credentials
3. Upon successful authentication, you'll be redirected to the dashboard

## Development Workflow

1. Start the development server: `npm run dev`
2. Make changes to the codebase
3. See the changes instantly with hot module replacement

## Deployment

The application can be built for production using:

```
npm run build
```

This will create optimized production files in the `dist` directory, which can be deployed to any static site hosting service.

## License

This project is proprietary and confidential.