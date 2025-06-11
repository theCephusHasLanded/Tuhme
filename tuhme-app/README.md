# TUHME - Premium Clothing Delivery & Tailoring

A minimalist, single-page web application for Tuhme, a premium clothing delivery and tailoring service operating in Manhattan and Brooklyn.

## Features

### User Experience
- **Image Upload**: Users can upload images or provide links to desired clothing items
- **Tailoring Specifications**: Complete measurements and alteration requirements form
- **Delivery Management**: Address validation for Manhattan/Brooklyn with preferred time slots
- **WhatsApp Integration**: Real-time communication through WhatsApp for order updates
- **Payment Processing**: In-person payments via Square card reader upon delivery

### Design
- **Minimalist Design**: Fusion of "old money" elegance and futuristic minimalism
- **Responsive Layout**: Mobile-first design optimized for on-the-go users
- **Dark Theme**: Professional dark color scheme with subtle gradients
- **Clean Typography**: Inter font family with proper spacing and hierarchy

### Technical Features
- **React + Vite**: Modern frontend development with fast build times
- **Firebase Integration**: Backend services for order management and database
- **Order Tracking**: Complete order lifecycle from submission to delivery
- **Admin Dashboard**: Order management system for the service provider

## Quick Start

1. **Install Dependencies**
   ```bash
   cd tuhme-app
   npm install
   ```

2. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - Copy your Firebase config to `src/firebase/config.js`

3. **Update WhatsApp Number**
   - In `src/components/OrderSummary.jsx`, replace `1234567890` with your WhatsApp business number

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Firestore Database
3. Update `src/firebase/config.js` with your Firebase configuration

### WhatsApp Integration
Update the phone number in `src/components/OrderSummary.jsx`:
```javascript
const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${whatsappMessage}`;
```

## Usage

### Customer Flow
1. **Upload Item**: Upload image or provide link to desired clothing item
2. **Specify Tailoring**: Enter measurements and select required alterations
3. **Delivery Details**: Provide address (Manhattan/Brooklyn only) and preferred time
4. **Submit Order**: Review and submit order via WhatsApp

### Admin Management
- Access the admin dashboard to view and manage all orders
- Update order status through the lifecycle
- View detailed order information including images and specifications

## Order Status Workflow
- `pending` - Order submitted, awaiting confirmation
- `confirmed` - Order confirmed by admin
- `in_progress` - Tailoring/sourcing in progress
- `ready_for_delivery` - Ready for delivery
- `delivered` - Successfully delivered
- `cancelled` - Order cancelled

## License

Private and confidential. All rights reserved.