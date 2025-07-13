import React, { useState, useEffect } from 'react';
import TuhmeIcon from './TuhmeIcon';
import colorSchemeManager from '../utils/colorSchemeManager';
import '../styles/enhanced-store-finder.css';

const EnhancedStoreFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllStores, setShowAllStores] = useState(false);
  const [currentPalette, setCurrentPalette] = useState(colorSchemeManager.getCurrentPalette());

  useEffect(() => {
    const updatePalette = () => {
      setCurrentPalette(colorSchemeManager.getCurrentPalette());
    };

    // Listen for color scheme changes
    const handleSchemeChange = (newPalette) => {
      setCurrentPalette(newPalette);
    };

    // Update palette on mount and set up listener
    updatePalette();
    const unsubscribe = colorSchemeManager.subscribe(handleSchemeChange);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Featured 6 stores from the 53 partner stores
  const featuredStores = [
    {
      id: 'nordstrom-nyc',
      name: 'Nordstrom',
      category: 'Department Store',
      address: '225 W 57th St, New York, NY 10019',
      phone: '(212) 295-2000',
      website: 'https://www.nordstrom.com',
      description: 'Premium department store with contemporary and designer fashion.',
      hours: {
        monday: '10:00 AM - 9:00 PM',
        tuesday: '10:00 AM - 9:00 PM',
        wednesday: '10:00 AM - 9:00 PM',
        thursday: '10:00 AM - 9:00 PM',
        friday: '10:00 AM - 9:00 PM',
        saturday: '10:00 AM - 9:00 PM',
        sunday: '11:00 AM - 8:00 PM'
      },
      specialties: ['Contemporary Fashion', 'Designer Brands', 'Shoes', 'Beauty'],
      priceRange: '$$$',
      rating: 4.1,
      neighborhood: 'Midtown West',
      instagram: '@nordstrom'
    },
    {
      id: 'bergdorf-goodman',
      name: 'Bergdorf Goodman',
      category: 'Luxury Department Store',
      address: '754 5th Ave, New York, NY 10019',
      phone: '(212) 753-7300',
      website: 'https://www.bergdorfgoodman.com',
      description: 'Iconic luxury department store featuring designer fashion, accessories, and beauty.',
      hours: {
        monday: '10:00 AM - 8:00 PM',
        tuesday: '10:00 AM - 8:00 PM',
        wednesday: '10:00 AM - 8:00 PM',
        thursday: '10:00 AM - 8:00 PM',
        friday: '10:00 AM - 8:00 PM',
        saturday: '10:00 AM - 8:00 PM',
        sunday: '11:00 AM - 7:00 PM'
      },
      specialties: ['Designer Fashion', 'Luxury Accessories', 'Fine Jewelry', 'Beauty'],
      priceRange: '$$$$',
      rating: 4.3,
      neighborhood: 'Midtown East',
      instagram: '@bergdorfs'
    },
    {
      id: 'chanel-57th',
      name: 'Chanel',
      category: 'Luxury Fashion',
      address: '15 E 57th St, New York, NY 10022',
      phone: '(212) 355-5050',
      website: 'https://www.chanel.com',
      description: 'French luxury fashion house known for timeless elegance.',
      hours: {
        monday: '10:00 AM - 7:00 PM',
        tuesday: '10:00 AM - 7:00 PM',
        wednesday: '10:00 AM - 7:00 PM',
        thursday: '10:00 AM - 7:00 PM',
        friday: '10:00 AM - 7:00 PM',
        saturday: '10:00 AM - 7:00 PM',
        sunday: '12:00 PM - 6:00 PM'
      },
      specialties: ['Haute Couture', 'Handbags', 'Fragrances', 'Jewelry'],
      priceRange: '$$$$',
      rating: 4.5,
      neighborhood: 'Midtown East',
      instagram: '@chanelofficial'
    },
    {
      id: 'louis-vuitton-fifth',
      name: 'Louis Vuitton',
      category: 'Luxury Fashion',
      address: '1 E 57th St, New York, NY 10022',
      phone: '(212) 758-8877',
      website: 'https://us.louisvuitton.com',
      description: 'French luxury fashion house specializing in leather goods and ready-to-wear.',
      hours: {
        monday: '10:00 AM - 8:00 PM',
        tuesday: '10:00 AM - 8:00 PM',
        wednesday: '10:00 AM - 8:00 PM',
        thursday: '10:00 AM - 8:00 PM',
        friday: '10:00 AM - 8:00 PM',
        saturday: '10:00 AM - 8:00 PM',
        sunday: '11:00 AM - 7:00 PM'
      },
      specialties: ['Leather Goods', 'Ready-to-Wear', 'Shoes', 'Accessories'],
      priceRange: '$$$$',
      rating: 4.6,
      neighborhood: 'Midtown East',
      instagram: '@louisvuitton'
    },
    {
      id: 'saks-fifth-avenue',
      name: 'Saks Fifth Avenue',
      category: 'Luxury Department Store',
      address: '611 5th Ave, New York, NY 10022',
      phone: '(212) 753-4000',
      website: 'https://www.saksfifthavenue.com',
      description: 'Premier luxury department store with exclusive designer collections.',
      hours: {
        monday: '10:00 AM - 8:30 PM',
        tuesday: '10:00 AM - 8:30 PM',
        wednesday: '10:00 AM - 8:30 PM',
        thursday: '10:00 AM - 8:30 PM',
        friday: '10:00 AM - 8:30 PM',
        saturday: '10:00 AM - 8:30 PM',
        sunday: '11:00 AM - 7:00 PM'
      },
      specialties: ['Designer Fashion', 'Luxury Handbags', 'Shoes', 'Beauty'],
      priceRange: '$$$$',
      rating: 4.2,
      neighborhood: 'Midtown East',
      instagram: '@saks'
    },
    {
      id: 'tiffany-co',
      name: 'Tiffany & Co.',
      category: 'Luxury Jewelry',
      address: '727 5th Ave, New York, NY 10022',
      phone: '(212) 755-8000',
      website: 'https://www.tiffany.com',
      description: 'Legendary American luxury jewelry and specialty retailer.',
      hours: {
        monday: '10:00 AM - 7:00 PM',
        tuesday: '10:00 AM - 7:00 PM',
        wednesday: '10:00 AM - 7:00 PM',
        thursday: '10:00 AM - 7:00 PM',
        friday: '10:00 AM - 7:00 PM',
        saturday: '10:00 AM - 7:00 PM',
        sunday: '12:00 PM - 6:00 PM'
      },
      specialties: ['Fine Jewelry', 'Engagement Rings', 'Watches', 'Silver'],
      priceRange: '$$$$',
      rating: 4.4,
      neighborhood: 'Midtown East',
      instagram: '@tiffanyandco'
    }
  ];

  // Complete 53+ partner stores data - comprehensive Manhattan & Brooklyn coverage
  const allPartnerStores = [
    ...featuredStores,
    // Luxury Fashion Houses
    {
      id: 'gucci-fifth',
      name: 'Gucci',
      category: 'Luxury Fashion',
      address: '725 5th Ave, New York, NY 10022',
      website: 'https://www.gucci.com',
      specialties: ['Designer Fashion', 'Leather Goods', 'Accessories'],
      rating: 4.4,
      priceRange: '$$$$',
      neighborhood: 'Midtown East',
      instagram: '@gucci'
    },
    {
      id: 'prada-soho',
      name: 'Prada',
      category: 'Luxury Fashion',
      address: '575 Broadway, New York, NY 10012',
      website: 'https://www.prada.com',
      specialties: ['Designer Fashion', 'Accessories', 'Footwear'],
      rating: 4.3,
      priceRange: '$$$$',
      neighborhood: 'SoHo',
      instagram: '@prada'
    },
    {
      id: 'hermes-madison',
      name: 'Hermès',
      category: 'Luxury Fashion',
      address: '691 Madison Ave, New York, NY 10065',
      website: 'https://www.hermes.com',
      specialties: ['Leather Goods', 'Silk', 'Jewelry', 'Watches'],
      rating: 4.5,
      priceRange: '$$$$',
      neighborhood: 'Upper East Side',
      instagram: '@hermes'
    },
    {
      id: 'dior-57th',
      name: 'Dior',
      category: 'Luxury Fashion',
      address: '21 E 57th St, New York, NY 10022',
      website: 'https://www.dior.com',
      specialties: ['Haute Couture', 'Beauty', 'Accessories'],
      rating: 4.4,
      priceRange: '$$$$',
      neighborhood: 'Midtown East',
      instagram: '@dior'
    },
    // Contemporary Fashion
    {
      id: 'zara-fifth',
      name: 'Zara',
      category: 'Contemporary Fashion',
      address: '666 5th Ave, New York, NY 10103',
      website: 'https://www.zara.com',
      specialties: ['Fast Fashion', 'Trendy Styles', 'Affordable Luxury'],
      rating: 4.0,
      priceRange: '$$',
      neighborhood: 'Midtown',
      instagram: '@zara'
    },
    {
      id: 'cos-soho',
      name: 'COS',
      category: 'Contemporary Fashion',
      address: '129 Spring St, New York, NY 10012',
      website: 'https://www.cosstores.com',
      specialties: ['Minimalist Design', 'Modern Essentials'],
      rating: 4.2,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@cosstores'
    },
    {
      id: 'rag-bone-soho',
      name: 'rag & bone',
      category: 'Contemporary Fashion',
      address: '119 Mercer St, New York, NY 10012',
      website: 'https://www.rag-bone.com',
      specialties: ['Contemporary Fashion', 'Denim', 'Footwear'],
      rating: 4.1,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@ragandbone'
    },
    // Streetwear & Contemporary
    {
      id: 'kith-soho',
      name: 'Kith',
      category: 'Streetwear',
      address: '337 Lafayette St, New York, NY 10012',
      website: 'https://kith.com',
      specialties: ['Streetwear', 'Sneakers', 'Limited Editions'],
      rating: 4.3,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@kith'
    },
    {
      id: 'supreme-soho',
      name: 'Supreme',
      category: 'Streetwear',
      address: '274 Lafayette St, New York, NY 10012',
      website: 'https://www.supremenewyork.com',
      specialties: ['Streetwear', 'Limited Drops', 'Collectibles'],
      rating: 4.2,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@supremenewyork'
    },
    // Athletic & Active Wear
    {
      id: 'nike-soho',
      name: 'Nike SoHo',
      category: 'Athletic Wear',
      address: '529 Broadway, New York, NY 10012',
      website: 'https://www.nike.com',
      specialties: ['Athletic Footwear', 'Performance Wear', 'Lifestyle'],
      rating: 4.1,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@nike'
    },
    {
      id: 'adidas-soho',
      name: 'adidas SoHo',
      category: 'Athletic Wear',
      address: '610 Broadway, New York, NY 10012',
      website: 'https://www.adidas.com',
      specialties: ['Athletic Wear', 'Sneakers', 'Performance'],
      rating: 4.0,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@adidas'
    },
    {
      id: 'lululemon-soho',
      name: 'lululemon',
      category: 'Athletic Wear',
      address: '481 Broadway, New York, NY 10013',
      website: 'https://www.lululemon.com',
      specialties: ['Yoga Wear', 'Athletic Apparel', 'Wellness'],
      rating: 4.3,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@lululemon'
    },
    // Beauty & Cosmetics
    {
      id: 'sephora-soho',
      name: 'Sephora',
      category: 'Beauty',
      address: '555 Broadway, New York, NY 10012',
      website: 'https://www.sephora.com',
      specialties: ['Cosmetics', 'Skincare', 'Fragrance'],
      rating: 4.0,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@sephora'
    },
    {
      id: 'glossier-soho',
      name: 'Glossier',
      category: 'Beauty',
      address: '123 Lafayette St, New York, NY 10013',
      website: 'https://www.glossier.com',
      specialties: ['Natural Beauty', 'Skincare', 'Minimalist Makeup'],
      rating: 4.4,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@glossier'
    },
    // Vintage & Unique
    {
      id: 'what-goes-around',
      name: 'What Goes Around Comes Around',
      category: 'Vintage Luxury',
      address: '351 W Broadway, New York, NY 10013',
      website: 'https://www.wgaca.com',
      specialties: ['Vintage Designer', 'Luxury Consignment', 'Rare Finds'],
      rating: 4.2,
      priceRange: '$$$$',
      neighborhood: 'SoHo',
      instagram: '@wgaca'
    },
    // Electronics & Tech
    {
      id: 'apple-soho',
      name: 'Apple SoHo',
      category: 'Technology',
      address: '103 Prince St, New York, NY 10012',
      website: 'https://www.apple.com',
      specialties: ['Electronics', 'Accessories', 'Tech Support'],
      rating: 4.3,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@apple'
    },
    // Home & Lifestyle
    {
      id: 'cb2-soho',
      name: 'CB2',
      category: 'Home & Design',
      address: '451 Broadway, New York, NY 10013',
      website: 'https://www.cb2.com',
      specialties: ['Modern Furniture', 'Home Decor', 'Accessories'],
      rating: 4.0,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@cb2'
    },
    // Additional Manhattan Stores
    {
      id: 'barneys-warehouse',
      name: 'Barneys Warehouse',
      category: 'Outlet',
      address: '255 W 17th St, New York, NY 10011',
      website: 'https://www.barneyswarehouse.com',
      specialties: ['Designer Discounts', 'End of Season', 'Luxury Outlet'],
      rating: 4.0,
      priceRange: '$$$',
      neighborhood: 'Chelsea',
      instagram: '@barneysny'
    },
    {
      id: 'century21',
      name: 'Century 21',
      category: 'Department Store',
      address: '22 Cortlandt St, New York, NY 10007',
      website: 'https://www.c21stores.com',
      specialties: ['Designer Discounts', 'Off-Price Luxury', 'Designer Brands'],
      rating: 3.9,
      priceRange: '$$',
      neighborhood: 'Financial District',
      instagram: '@century21stores'
    },
    // Brooklyn Stores
    {
      id: 'steven-alan-brooklyn',
      name: 'Steven Alan',
      category: 'Contemporary Fashion',
      address: '103 Franklin St, Brooklyn, NY 11222',
      website: 'https://www.stevenalan.com',
      specialties: ['Contemporary Menswear', 'Accessories', 'Lifestyle'],
      rating: 4.1,
      priceRange: '$$',
      neighborhood: 'Greenpoint',
      instagram: '@stevenalan'
    },
    {
      id: 'bird-brooklyn',
      name: 'Bird',
      category: 'Independent Boutique',
      address: '220 Smith St, Brooklyn, NY 11201',
      website: 'https://www.birdbrooklyn.com',
      specialties: ['Independent Designers', 'Unique Finds', 'Local Brands'],
      rating: 4.2,
      priceRange: '$$',
      neighborhood: 'Cobble Hill',
      instagram: '@birdbrooklyn'
    },
    {
      id: 'catbird-brooklyn',
      name: 'Catbird',
      category: 'Jewelry',
      address: '219 Bedford Ave, Brooklyn, NY 11249',
      website: 'https://www.catbirdnyc.com',
      specialties: ['Fine Jewelry', 'Piercing', 'Handmade Pieces'],
      rating: 4.4,
      priceRange: '$$$',
      neighborhood: 'Williamsburg',
      instagram: '@catbirdnyc'
    },
    // Additional Fashion & Lifestyle Stores (25 more to reach 53+)
    {
      id: 'uniqlo-soho',
      name: 'Uniqlo',
      category: 'Contemporary Fashion',
      address: '546 Broadway, New York, NY 10012',
      website: 'https://www.uniqlo.com',
      specialties: ['Casual Wear', 'Basics', 'Affordable Fashion'],
      rating: 4.1,
      priceRange: '$',
      neighborhood: 'SoHo',
      instagram: '@uniqlo'
    },
    {
      id: 'madewell-soho',
      name: 'Madewell',
      category: 'Contemporary Fashion',
      address: '486 Broadway, New York, NY 10013',
      website: 'https://www.madewell.com',
      specialties: ['Denim', 'Casual Wear', 'Accessories'],
      rating: 4.2,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@madewell'
    },
    {
      id: 'everlane-soho',
      name: 'Everlane',
      category: 'Sustainable Fashion',
      address: '28 Prince St, New York, NY 10012',
      website: 'https://www.everlane.com',
      specialties: ['Sustainable Fashion', 'Basics', 'Transparency'],
      rating: 4.0,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@everlane'
    },
    {
      id: 'reformation-soho',
      name: 'Reformation',
      category: 'Sustainable Fashion',
      address: '23 Howard St, New York, NY 10013',
      website: 'https://www.thereformation.com',
      specialties: ['Sustainable Fashion', 'Vintage-Inspired', 'Dresses'],
      rating: 4.3,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@reformation'
    },
    {
      id: 'acne-studios',
      name: 'Acne Studios',
      category: 'Designer Fashion',
      address: '33 Greene St, New York, NY 10013',
      website: 'https://www.acnestudios.com',
      specialties: ['Scandinavian Design', 'Ready-to-Wear', 'Leather Goods'],
      rating: 4.2,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@acnestudios'
    },
    {
      id: 'celine-madison',
      name: 'Celine',
      category: 'Luxury Fashion',
      address: '870 Madison Ave, New York, NY 10021',
      website: 'https://www.celine.com',
      specialties: ['Luxury Fashion', 'Handbags', 'Ready-to-Wear'],
      rating: 4.5,
      priceRange: '$$$$',
      neighborhood: 'Upper East Side',
      instagram: '@celine'
    },
    {
      id: 'bottega-veneta',
      name: 'Bottega Veneta',
      category: 'Luxury Fashion',
      address: '849 Madison Ave, New York, NY 10021',
      website: 'https://www.bottegaveneta.com',
      specialties: ['Luxury Leather Goods', 'Intrecciato', 'Ready-to-Wear'],
      rating: 4.4,
      priceRange: '$$$$',
      neighborhood: 'Upper East Side',
      instagram: '@bottegaveneta'
    },
    {
      id: 'saint-laurent',
      name: 'Saint Laurent',
      category: 'Luxury Fashion',
      address: '3 E 57th St, New York, NY 10022',
      website: 'https://www.ysl.com',
      specialties: ['Luxury Fashion', 'Rock-Chic Style', 'Handbags'],
      rating: 4.3,
      priceRange: '$$$$',
      neighborhood: 'Midtown East',
      instagram: '@ysl'
    },
    {
      id: 'theory-soho',
      name: 'Theory',
      category: 'Contemporary Fashion',
      address: '38 Gansevoort St, New York, NY 10014',
      website: 'https://www.theory.com',
      specialties: ['Modern Workwear', 'Minimalist Design', 'Tailoring'],
      rating: 4.1,
      priceRange: '$$$',
      neighborhood: 'Meatpacking District',
      instagram: '@theory'
    },
    {
      id: 'j-crew-soho',
      name: 'J.Crew',
      category: 'Contemporary Fashion',
      address: '99 Prince St, New York, NY 10012',
      website: 'https://www.jcrew.com',
      specialties: ['Classic American Style', 'Preppy Fashion', 'Workwear'],
      rating: 4.0,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@jcrew'
    },
    {
      id: 'anthropologie-soho',
      name: 'Anthropologie',
      category: 'Lifestyle & Fashion',
      address: '375 W Broadway, New York, NY 10012',
      website: 'https://www.anthropologie.com',
      specialties: ['Bohemian Style', 'Home Decor', 'Unique Finds'],
      rating: 4.1,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@anthropologie'
    },
    {
      id: 'free-people',
      name: 'Free People',
      category: 'Bohemian Fashion',
      address: '79 5th Ave, New York, NY 10003',
      website: 'https://www.freepeople.com',
      specialties: ['Boho Fashion', 'Festival Wear', 'Vintage-Inspired'],
      rating: 4.0,
      priceRange: '$$',
      neighborhood: 'Flatiron District',
      instagram: '@freepeople'
    },
    {
      id: 'aritzia-soho',
      name: 'Aritzia',
      category: 'Contemporary Fashion',
      address: '131 Spring St, New York, NY 10012',
      website: 'https://www.aritzia.com',
      specialties: ['Canadian Fashion', 'Modern Essentials', 'Outerwear'],
      rating: 4.2,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@aritzia'
    },
    {
      id: 'mango-soho',
      name: 'Mango',
      category: 'Contemporary Fashion',
      address: '560 Broadway, New York, NY 10012',
      website: 'https://shop.mango.com',
      specialties: ['European Fashion', 'Trendy Styles', 'Affordable Luxury'],
      rating: 3.9,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@mango'
    },
    {
      id: 'allbirds-soho',
      name: 'Allbirds',
      category: 'Sustainable Footwear',
      address: '73 Spring St, New York, NY 10012',
      website: 'https://www.allbirds.com',
      specialties: ['Sustainable Shoes', 'Comfort', 'Eco-Friendly'],
      rating: 4.2,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@allbirds'
    },
    {
      id: 'warby-parker',
      name: 'Warby Parker',
      category: 'Eyewear',
      address: '121 Greene St, New York, NY 10012',
      website: 'https://www.warbyparker.com',
      specialties: ['Prescription Glasses', 'Sunglasses', 'Eye Exams'],
      rating: 4.3,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@warbyparker'
    },
    {
      id: 'outdoor-voices',
      name: 'Outdoor Voices',
      category: 'Athletic Wear',
      address: '19 Howard St, New York, NY 10013',
      website: 'https://www.outdoorvoices.com',
      specialties: ['Activewear', 'Recreation', 'Community'],
      rating: 4.1,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@outdoorvoices'
    },
    {
      id: 'alo-yoga',
      name: 'Alo Yoga',
      category: 'Athletic Wear',
      address: '434 W Broadway, New York, NY 10012',
      website: 'https://www.aloyoga.com',
      specialties: ['Yoga Wear', 'Wellness', 'Lifestyle'],
      rating: 4.2,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@aloyoga'
    },
    {
      id: 'patagonia-soho',
      name: 'Patagonia',
      category: 'Outdoor & Sustainable',
      address: '426 W Broadway, New York, NY 10012',
      website: 'https://www.patagonia.com',
      specialties: ['Outdoor Gear', 'Sustainable Fashion', 'Activism'],
      rating: 4.4,
      priceRange: '$$',
      neighborhood: 'SoHo',
      instagram: '@patagonia'
    },
    {
      id: 'arc-teryx',
      name: 'Arc\'teryx',
      category: 'Outdoor & Technical',
      address: '580 Broadway, New York, NY 10012',
      website: 'https://www.arcteryx.com',
      specialties: ['Technical Outerwear', 'Outdoor Performance', 'Innovation'],
      rating: 4.5,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@arcteryx'
    },
    {
      id: 'canada-goose',
      name: 'Canada Goose',
      category: 'Luxury Outerwear',
      address: '101 Wooster St, New York, NY 10012',
      website: 'https://www.canadagoose.com',
      specialties: ['Luxury Outerwear', 'Cold Weather Gear', 'Parkas'],
      rating: 4.3,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@canadagoose'
    },
    {
      id: 'stone-island',
      name: 'Stone Island',
      category: 'Designer Streetwear',
      address: '107 Grand St, New York, NY 10013',
      website: 'https://www.stoneisland.com',
      specialties: ['Technical Fashion', 'Streetwear', 'Innovation'],
      rating: 4.2,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@stoneisland'
    },
    {
      id: 'off-white',
      name: 'Off-White',
      category: 'Luxury Streetwear',
      address: '25 E 61st St, New York, NY 10065',
      website: 'https://www.off---white.com',
      specialties: ['Luxury Streetwear', 'High Fashion', 'Collaborations'],
      rating: 4.1,
      priceRange: '$$$$',
      neighborhood: 'Upper East Side',
      instagram: '@off____white'
    },
    {
      id: 'golden-goose',
      name: 'Golden Goose',
      category: 'Luxury Sneakers',
      address: '106 Spring St, New York, NY 10012',
      website: 'https://www.goldengoose.com',
      specialties: ['Luxury Sneakers', 'Distressed Style', 'Italian Craftsmanship'],
      rating: 4.0,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@goldengoosedeluxebrand'
    },
    {
      id: 'common-projects',
      name: 'Common Projects',
      category: 'Minimalist Footwear',
      address: '285 Lafayette St, New York, NY 10012',
      website: 'https://www.commonprojects.com',
      specialties: ['Minimalist Sneakers', 'Italian Leather', 'Clean Design'],
      rating: 4.3,
      priceRange: '$$$',
      neighborhood: 'SoHo',
      instagram: '@commonprojects'
    }
  ];

  const generateStoreIcon = (storeName) => {
    const firstLetter = storeName.charAt(0).toUpperCase();
    const colors = ['#000000', '#333333', '#666666', '#999999'];
    const color = colors[firstLetter.charCodeAt(0) % colors.length];
    
    return (
      <div className="store-icon" style={{ backgroundColor: color }}>
        {firstLetter}
      </div>
    );
  };

  const generateWhatsAppLink = (store) => {
    const message = encodeURIComponent(
      `Hi! I'd like to shop at ${store.name}. I have some items in mind that I'd love to try on through TUHME.`
    );
    return `https://wa.me/16465889916?text=${message}`;
  };

  const formatHours = (hours) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[new Date().getDay()];
    
    return hours[currentDay] || 'Hours vary';
  };

  const filteredStores = allPartnerStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const displayStores = showAllStores ? filteredStores : featuredStores;

  return (
    <section className="enhanced-store-finder">
      <div className="store-finder-container">
        <div className="store-finder-header">
          <h2 className="finder-title">Find Any Store</h2>
          <p className="finder-subtitle">
            Shop from {allPartnerStores.length}+ curated partner stores across Manhattan & Brooklyn
          </p>
        </div>

        <div className="search-section">
          <div className="search-input-wrapper">
            <TuhmeIcon type="search" size={20} />
            <input
              type="text"
              placeholder="Search stores, brands, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="store-search-input"
            />
          </div>
          
          <button 
            onClick={() => setShowAllStores(!showAllStores)}
            className="toggle-view-btn"
          >
            {showAllStores ? 'Show Featured' : `View All ${allPartnerStores.length} Stores`}
          </button>
        </div>

        <div className="stores-grid-responsive">
          {displayStores.map((store) => (
            <div key={store.id} className="store-card-modern">
              {/* Card Header with Store Info */}
              <div className="store-header-modern">
                <div className="store-icon-section">
                  {generateStoreIcon(store.name)}
                </div>
                
                <div className="store-info-section">
                  <div className="store-title-row">
                    <h3 className="store-name-modern">{store.name}</h3>
                    <div className="store-rating-compact">
                      <span className="rating-stars">{'★'.repeat(Math.floor(store.rating))}</span>
                      <span className="rating-number">{store.rating}</span>
                    </div>
                  </div>
                  
                  <div className="store-meta-row">
                    <span className="store-category-modern">{store.category}</span>
                    <span className="price-indicator-modern">{store.priceRange}</span>
                    {store.neighborhood && (
                      <span className="neighborhood-modern">{store.neighborhood}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Info Section */}
              <div className="store-quick-info">
                {store.address && (
                  <div className="info-item">
                    <TuhmeIcon type="location" size={14} />
                    <span className="info-text">{store.address.split(',')[0]}</span>
                  </div>
                )}
                
                {store.hours && (
                  <div className="info-item">
                    <TuhmeIcon type="clock" size={14} />
                    <span className="info-text">Today: {formatHours(store.hours)}</span>
                  </div>
                )}
              </div>

              {/* Specialties Tags */}
              <div className="store-specialties-compact">
                {store.specialties.slice(0, 2).map((specialty, index) => (
                  <span key={index} className="specialty-tag-modern">
                    {specialty}
                  </span>
                ))}
                {store.specialties.length > 2 && (
                  <span className="more-specialties">+{store.specialties.length - 2} more</span>
                )}
              </div>

              {/* Horizontal Action Buttons */}
              <div className="store-actions-horizontal">
                <a 
                  href={generateWhatsAppLink(store)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn primary-action"
                >
                  <TuhmeIcon type="message" size={16} />
                  <span>Shop Now</span>
                </a>
                
                <a 
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn secondary-action"
                >
                  <TuhmeIcon type="external" size={16} />
                  <span>Website</span>
                </a>

                {store.instagram && (
                  <a 
                    href={`https://instagram.com/${store.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn social-action"
                    title={store.instagram}
                  >
                    <TuhmeIcon type="instagram" size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayStores.length === 0 && searchTerm && (
          <div className="no-results">
            <TuhmeIcon type="search" size={48} />
            <p>No stores found for "{searchTerm}"</p>
            <p>Try searching for categories like "luxury", "department store", or specific brands.</p>
          </div>
        )}

        <div className="store-finder-footer">
          <p>Don't see your favorite store? <a href={generateWhatsAppLink({name: 'any store'})}>Message us</a> and we'll shop there for you!</p>
        </div>
      </div>

    </section>
  );
};

export default EnhancedStoreFinder;