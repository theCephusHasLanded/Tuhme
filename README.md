# TUHME: At-Home Fitting Room Service

TUHME is a bespoke personal shopping service that brings a curated selection of clothing items directly to clients' homes in Manhattan, allowing them to try before they buy.

## Project Overview

This project implements a minimum viable product (MVP) for the TUHME service, including:

1. Client-facing landing page with service information
2. WhatsApp AI Assistant integration concept
3. Stylist dashboard prototype
4. Firebase backend architecture

## System Architecture

The TUHME service operates with the following components:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Client         │     │  AI Assistant   │     │  Stylist        │
│  WhatsApp       │◄────┤  Coordinator    │────►│  Dashboard      │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Firebase Backend                           │
└─────────────────────────────────────────────────────────────────┘
```

## User Flow

1. **Client Request**: Client messages TUHME via WhatsApp with styling needs
2. **AI Processing**: AI assistant processes request and creates an order
3. **Stylist Sourcing**: Stylist sources items from stores based on client preferences
4. **Appointment Scheduling**: Home fitting appointment is scheduled
5. **Home Delivery**: Stylist brings items to client's home
6. **Selection & Payment**: Client selects items to keep and pays via Square
7. **Return Processing**: Unwanted items are returned to stores

## Getting Started

### Prerequisites

- Node.js and npm
- Firebase account
- WhatsApp Business API access (for production)
- Square payment processing account (for production)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/tuhme.git
   cd tuhme
   ```

2. Install dependencies (for the full application)
   ```
   npm install
   ```

3. Configure Firebase
   - Update the Firebase configuration in `firebase.js` with your own credentials
   - Set up Firestore collections for clients, orders, and stylists

4. Run the development server
   ```
   npm run dev
   ```

## Project Structure

- `index.html` - Landing page for clients
- `styles.css` - Styles for the landing page
- `script.js` - Client-side functionality
- `firebase.js` - Firebase integration for client sign-ups
- `test.html` - Documentation and code samples for the entire system

## Data Models

### Client
```javascript
{
  id: "client_123",
  name: "Jane Doe",
  phone: "+1234567890",
  email: "jane@example.com",
  address: {
    street: "123 Main St",
    unit: "4B",
    city: "New York",
    state: "NY",
    zip: "10001"
  },
  stylePreferences: {
    sizes: {
      top: "M",
      bottom: "8",
      dress: "M",
      shoes: "8"
    },
    colors: ["black", "navy", "white"],
    styles: ["minimal", "classic"],
    avoidStyles: ["boho", "preppy"],
    priceRange: "$$-$$$"
  },
  previousOrders: ["order_456", "order_789"],
  createdAt: "2025-04-01T12:00:00Z"
}
```

### Order
```javascript
{
  id: "order_456",
  clientId: "client_123",
  stylistId: "stylist_789",
  status: "scheduled", // requested, sourcing, scheduled, completed, cancelled
  requestDetails: {
    originalMessage: "Looking for outfits for a business casual workplace",
    additionalNotes: "Prefer pants over skirts, no heels",
    occasion: "work",
    budget: "moderate",
    requestedItems: ["blazer", "pants", "blouses"],
    imageAttachments: ["url_to_image1", "url_to_image2"]
  },
  appointmentDetails: {
    date: "2025-04-15T17:00:00Z",
    duration: 30, // minutes
    location: "client_address", // uses client's address
    confirmed: true
  },
  itemCollection: [
    {
      id: "item_001",
      name: "Black Tailored Blazer",
      brand: "Theory",
      size: "M",
      price: 425.00,
      location: "Bloomingdale's SoHo",
      imageUrl: "url_to_image",
      status: "selected", // sourced, selected, tried, purchased, returned
      stylistNotes: "Perfect staple piece, versatile for many outfits"
    },
    // More items...
  ],
  paymentDetails: {
    subtotal: 0, // Calculated only after client selects items
    serviceFee: 150.00,
    tax: 0, // Calculated only after client selects items
    total: 150.00, // Initially just service fee
    paymentMethod: "square_reader",
    paymentStatus: "pending"
  },
  timeline: [
    {
      status: "requested",
      timestamp: "2025-04-10T14:30:00Z",
      notes: "Initial request received via WhatsApp"
    },
    // More status updates...
  ],
  createdAt: "2025-04-10T14:30:00Z",
  updatedAt: "2025-04-13T16:45:00Z"
}
```

## Future Enhancements

- Create React.js based stylist dashboard
- Implement fully functional WhatsApp Business API integration
- Develop proper AI natural language processing capabilities
- Build inventory management system for sourced items
- Implement Square payment processing integration
- Add client portal for viewing past orders and requesting new appointments

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Your Name - your.email@example.com