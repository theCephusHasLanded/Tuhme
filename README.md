# Tuhme - Luxury Shopping Assistant Platform

A modern React-based luxury shopping platform that connects customers with premium retailers through an intuitive interface and seamless WhatsApp integration.

## 🌟 Features

- **Horizontal Store Carousel**: Space-efficient display of 53+ partner stores
- **AI Shopping Assistant (SAVI)**: Intelligent shopping recommendations
- **WhatsApp Integration**: Direct communication with stores for personalized shopping
- **Store Search**: Find any store worldwide with Google integration
- **Membership System**: Premium features with Stripe payment integration
- **Express Ordering**: Quick order placement with image upload
- **Responsive Design**: Mobile-first approach with luxury aesthetics

## 🏗️ Project Structure

```
TUHME/
├── README.md
├── install_deps.sh                 # Quick setup script
├── test_start.sh                   # Development startup script
├── tuhme-app/                      # Main application directory
│   ├── .env                        # Environment variables
│   ├── .env.example               # Environment template
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js                   # Express.js backend server
│   ├── vite.config.js
│   │
│   ├── public/                     # Static assets
│   │   ├── favicon.png
│   │   ├── favicon.svg
│   │   ├── tuhme-logo.svg
│   │   └── vite.svg
│   │
│   └── src/                        # Source code
│       ├── App.css                 # Main application styles (8,828 lines)
│       ├── App.jsx                 # Root application component
│       ├── enhanced-upload.css     # File upload styling
│       ├── index.css
│       ├── luxury-components.css   # Luxury UI components
│       ├── main.jsx               # Application entry point
│       │
│       ├── assets/                 # Media assets
│       │   ├── react.svg
│       │   └── tuhme.png
│       │
│       ├── components/             # React components
│       │   ├── AdminDashboard.jsx          # Admin panel
│       │   ├── BenefitsWidget.jsx          # Service benefits display
│       │   ├── BrandSVGs.jsx              # Store logo components
│       │   ├── CallToActionWidget.jsx      # CTA sections
│       │   ├── CompactStoreSearch.jsx      # Store search interface
│       │   ├── ContactForm.jsx             # Contact functionality
│       │   ├── ContactWidget.jsx           # Contact information
│       │   ├── CustomerTestimonials.jsx    # Customer reviews
│       │   ├── DeliveryForm.jsx            # Delivery information form
│       │   ├── DeliveryInfo.jsx            # Delivery details
│       │   ├── DeliveryWidget.jsx          # Delivery options
│       │   ├── ExpressOrderFlow.jsx        # Quick ordering system
│       │   ├── ExpressOrderFlowEnhanced.jsx # Advanced ordering
│       │   ├── FAQWidget.jsx               # Frequently asked questions
│       │   ├── FashionGallery.jsx          # Product gallery
│       │   ├── FeedbackModal.jsx           # User feedback system
│       │   ├── FloatingSaviBot.jsx         # AI assistant trigger
│       │   ├── Footer.jsx                  # Page footer
│       │   ├── GetInTouchModal.jsx         # Contact modal
│       │   ├── Hero.jsx                    # Landing page hero
│       │   ├── HorizontalStoreCarousel.jsx # ⭐ Main store display
│       │   ├── HowItWorks.jsx              # Process explanation
│       │   ├── ImageUpload.jsx             # File upload component
│       │   ├── LoadingScreen.jsx           # Loading states
│       │   ├── Matrix3DInterface.jsx       # 3D visual effects
│       │   ├── MembershipModal.jsx         # Membership signup
│       │   ├── ModalsSystem.jsx            # Modal management
│       │   ├── Navigation.jsx              # Main navigation
│       │   ├── NavigationModals.jsx        # Navigation overlays
│       │   ├── OrderSummary.jsx            # Order confirmation
│       │   ├── PickupDeliveryForm.jsx      # Delivery options
│       │   ├── PricingTiers.jsx            # Pricing display
│       │   ├── PricingWidget.jsx           # Pricing components
│       │   ├── ProcessWidget.jsx           # Process steps
│       │   ├── SaviAssistant.jsx           # AI shopping assistant
│       │   ├── ServiceOverview.jsx         # Service features
│       │   ├── ServiceTypeSelector.jsx     # Service selection
│       │   ├── StoreDirectory.jsx          # Store listings (legacy)
│       │   ├── StoreLogoTrain.jsx          # Logo carousel
│       │   ├── StoreSearchModal.jsx        # Store search modal
│       │   ├── TailoringForm.jsx           # Custom tailoring
│       │   ├── ThemeToggle.jsx             # Dark/light mode
│       │   ├── TuhmeIcon.jsx               # Brand icons
│       │   ├── TuhmeNow.jsx                # Instant ordering
│       │   └── UserDashboard.jsx           # User account
│       │
│       ├── contexts/               # React contexts
│       │   ├── ModalContext.jsx            # Modal state management
│       │   └── ThemeContext.jsx            # Theme management
│       │
│       ├── firebase/               # Firebase configuration
│       │   └── config.js
│       │
│       ├── hooks/                  # Custom React hooks
│       │   └── useHourlyImage.js           # Dynamic image rotation
│       │
│       ├── services/               # Business logic layer
│       │   ├── membershipService.js        # Membership management
│       │   ├── orderService.js             # Order processing
│       │   ├── receiptService.js           # Receipt generation
│       │   ├── storeService.js             # Store data management
│       │   ├── stripeService.js            # Payment processing
│       │   ├── unsplashService.js          # Image services
│       │   └── whatsappService.js          # WhatsApp integration
│       │
│       └── styles/                 # Modular CSS files
│           ├── benefits-widget.css         # Benefits styling
│           ├── call-to-action-widget.css   # CTA styling
│           ├── color-overrides.css         # Color customizations
│           ├── color-scheme.css            # Color system
│           ├── content-widgets.css         # Content styling
│           ├── floating-effects.css        # Animation effects
│           ├── get-in-touch-modal.css      # Contact modal styling
│           ├── navigation-modals.css       # Navigation styling
│           ├── typography-overrides.css    # Font customizations
│           └── typography.css              # Typography system
│
└── tuhme-vite/                     # Legacy files (maintained for reference)
    └── src/styles/
        └── typography-overrides.css
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/theCephusHasLanded/Tuhme.git
   cd TUHME
   ```

2. **Install dependencies**
   ```bash
   ./install_deps.sh
   # or manually:
   cd tuhme-app && npm install
   ```

3. **Set up environment variables**
   ```bash
   cd tuhme-app
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   ./test_start.sh
   # or manually:
   cd tuhme-app && npm run dev
   ```

## 🏪 Store Management

The application manages 53+ partner stores with complete metadata:

- **Store Hours**: Real-time open/closed status
- **Location Data**: Neighborhood and address information
- **Specialties**: Product categories and expertise
- **Contact Integration**: Direct WhatsApp links
- **Custom Icons**: SVG logos for each brand

### Featured Stores Include:
- Luxury Fashion: Gucci, Prada, Louis Vuitton, Fendi
- Department Stores: Saks Fifth Avenue, Bergdorf Goodman, Bloomingdales
- Athletic Wear: Nike, New Balance, Arc'teryx
- Jewelry: Tiffany & Co., Pandora
- Fragrance: Diptyque
- And many more...

## 🎨 UI Components

### Key Features:
- **Horizontal Store Carousel**: Space-efficient scrolling display
- **Interactive Store Cards**: Detailed information with action buttons
- **Responsive Design**: Mobile-first approach
- **Luxury Aesthetics**: Golden gradients and premium styling
- **Smooth Animations**: CSS keyframes and transitions

### Component Architecture:
- **Modular Design**: Reusable widget system
- **Context API**: Centralized state management
- **Custom Hooks**: Shared functionality
- **Service Layer**: Business logic separation

## 🔧 Backend Services

### Express.js Server (`server.js`)
- API endpoints for order processing
- WhatsApp integration
- File upload handling
- Environment configuration

### Service Layer
- **Store Service**: Manages store data and hours
- **Order Service**: Handles order processing
- **WhatsApp Service**: Message generation and integration
- **Stripe Service**: Payment processing
- **Membership Service**: User account management

## 🌐 Deployment

### Vercel Deployment
The application is deployed at: `https://tuhme-593xlrwm0-christina-cephus-projects.vercel.app`

### Build Process
```bash
cd tuhme-app
npm run build
```

## 📱 Mobile Experience

- **Touch-Friendly**: Optimized for mobile interactions
- **Responsive Layout**: Adapts to all screen sizes
- **Fast Loading**: Optimized assets and lazy loading
- **WhatsApp Integration**: Native mobile app integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Tuhme.

## 🔗 Links

- **Live Site**: https://tuhme-593xlrwm0-christina-cephus-projects.vercel.app
- **Repository**: https://github.com/theCephusHasLanded/Tuhme

---

*Built with ❤️ using React, Vite, and modern web technologies*