class StoreService {
  constructor() {
    this.manhattanStores = [
      // Luxury Department Stores
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
        coordinates: { lat: 40.7655, lng: -73.9832 },
        instagram: '@nordstrom',
        featured: true
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
        coordinates: { lat: 40.7631, lng: -73.9712 },
        instagram: '@bergdorfs',
        featured: true
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
        coordinates: { lat: 40.7575, lng: -73.9776 },
        instagram: '@saks',
        featured: true
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
        coordinates: { lat: 40.7614, lng: -73.9776 },
        instagram: '@tiffanyandco',
        featured: true
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
        coordinates: { lat: 40.7614, lng: -73.9776 },
        instagram: '@chanelofficial',
        featured: true
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
        rating: 4.3,
        neighborhood: 'Midtown East',
        coordinates: { lat: 40.7614, lng: -73.9776 },
        instagram: '@louisvuitton',
        featured: true
      },
      {
        id: 'gucci-fifth',
        name: 'Gucci',
        category: 'Luxury Fashion',
        address: '725 5th Ave, New York, NY 10022',
        phone: '(212) 826-2600',
        website: 'https://www.gucci.com',
        description: 'Italian luxury fashion house known for eclectic and contemporary designs.',
        hours: {
          monday: '10:00 AM - 8:00 PM',
          tuesday: '10:00 AM - 8:00 PM',
          wednesday: '10:00 AM - 8:00 PM',
          thursday: '10:00 AM - 8:00 PM',
          friday: '10:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Ready-to-Wear', 'Handbags', 'Shoes', 'Accessories'],
        priceRange: '$$$$',
        rating: 4.2,
        neighborhood: 'Midtown East',
        coordinates: { lat: 40.7614, lng: -73.9776 },
        instagram: '@gucci',
        featured: true
      },
      {
        id: 'prada-broadway',
        name: 'Prada',
        category: 'Luxury Fashion',
        address: '575 Broadway, New York, NY 10012',
        phone: '(212) 334-8888',
        website: 'https://www.prada.com',
        description: 'Italian luxury fashion house known for minimalist designs and innovation.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '11:00 AM - 6:00 PM'
        },
        specialties: ['Ready-to-Wear', 'Leather Goods', 'Footwear', 'Eyewear'],
        priceRange: '$$$$',
        rating: 4.1,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7248, lng: -73.9986 },
        instagram: '@prada',
        featured: true
      },
      {
        id: 'hermes-madison',
        name: 'Hermès',
        category: 'Luxury Fashion',
        address: '691 Madison Ave, New York, NY 10065',
        phone: '(212) 751-3181',
        website: 'https://www.hermes.com',
        description: 'French luxury goods manufacturer specializing in leather and silk.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Leather Goods', 'Silk Scarves', 'Ready-to-Wear', 'Perfumes'],
        priceRange: '$$$$',
        rating: 4.6,
        neighborhood: 'Upper East Side',
        coordinates: { lat: 40.7614, lng: -73.9776 },
        instagram: '@hermes',
        featured: true
      },
      {
        id: 'dior-57th',
        name: 'Dior',
        category: 'Luxury Fashion',
        address: '21 E 57th St, New York, NY 10022',
        phone: '(212) 931-2950',
        website: 'https://www.dior.com',
        description: 'French luxury fashion house known for haute couture and beauty.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Haute Couture', 'Ready-to-Wear', 'Accessories', 'Beauty'],
        priceRange: '$$$$',
        rating: 4.4,
        neighborhood: 'Midtown East',
        coordinates: { lat: 40.7614, lng: -73.9776 },
        instagram: '@dior',
        featured: true
      },
      {
        id: 'the-webster-soho',
        name: 'The Webster',
        category: 'Contemporary Fashion',
        address: '29 Greene St, New York, NY 10013',
        phone: '(212) 965-9747',
        website: 'https://thewebster.us',
        description: 'Curated selection of designer fashion and emerging brands.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Contemporary Fashion', 'Emerging Designers', 'Accessories', 'Lifestyle'],
        priceRange: '$$$',
        rating: 4.3,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7248, lng: -73.9986 },
        instagram: '@thewebster',
        featured: false
      },
      // Additional Luxury Fashion Brands
      {
        id: 'miu-miu-soho',
        name: 'Miu Miu',
        category: 'Luxury Fashion',
        address: '100 Prince St, New York, NY 10012',
        phone: '(212) 334-5156',
        website: 'https://www.miumiu.com',
        description: 'Prada\'s younger sister brand featuring playful luxury fashion and accessories.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Ready-to-Wear', 'Handbags', 'Shoes', 'Accessories'],
        priceRange: '$$$$',
        rating: 4.4,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7242, lng: -73.9981 },
        instagram: '@miumiu',
        featured: true
      },
      {
        id: 'polene-soho',
        name: 'Polène',
        category: 'Luxury Fashion',
        address: '64 Wooster St, New York, NY 10012',
        phone: '(212) 219-2356',
        website: 'https://polene-paris.com',
        description: 'Contemporary luxury leather goods brand from Paris.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Leather Goods', 'Handbags', 'Accessories', 'Contemporary Design'],
        priceRange: '$$$',
        rating: 4.3,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7230, lng: -73.9990 },
        instagram: '@polene_official',
        featured: true
      },
      {
        id: 'polene-madison',
        name: 'Polène Madison Avenue',
        category: 'Luxury Fashion',
        address: '881 Madison Ave, New York, NY 10021',
        phone: '(212) 879-5050',
        website: 'https://polene-paris.com',
        description: 'Contemporary luxury leather goods brand from Paris - Upper East Side location.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Leather Goods', 'Handbags', 'Accessories', 'Contemporary Design'],
        priceRange: '$$$',
        rating: 4.3,
        neighborhood: 'Upper East Side',
        coordinates: { lat: 40.7790, lng: -73.9620 },
        instagram: '@polene_official',
        featured: true
      },
      {
        id: 'arcteryx-soho',
        name: 'Arc\'teryx',
        category: 'Activewear',
        address: '511 Broadway, New York, NY 10012',
        phone: '(212) 219-4400',
        website: 'https://arcteryx.com',
        description: 'Premium outdoor and technical apparel brand from Canada.',
        hours: {
          monday: '11:00 AM - 8:00 PM',
          tuesday: '11:00 AM - 8:00 PM',
          wednesday: '11:00 AM - 8:00 PM',
          thursday: '11:00 AM - 8:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Technical Outerwear', 'Outdoor Gear', 'Performance Apparel', 'Backpacks'],
        priceRange: '$$$',
        rating: 4.5,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7215, lng: -73.9993 },
        instagram: '@arcteryx',
        featured: true
      },
      {
        id: 'zara-fifth-avenue',
        name: 'Zara 5th Avenue Flagship',
        category: 'Contemporary Fashion',
        address: '101 5th Ave, New York, NY 10003',
        phone: '(212) 741-0555',
        website: 'https://www.zara.com',
        description: 'Spanish fast-fashion retailer\'s flagship store with latest trends.',
        hours: {
          monday: '10:00 AM - 9:00 PM',
          tuesday: '10:00 AM - 9:00 PM',
          wednesday: '10:00 AM - 9:00 PM',
          thursday: '10:00 AM - 9:00 PM',
          friday: '10:00 AM - 9:00 PM',
          saturday: '10:00 AM - 9:00 PM',
          sunday: '11:00 AM - 8:00 PM'
        },
        specialties: ['Fast Fashion', 'Trendy Clothing', 'Men\'s Wear', 'Women\'s Wear'],
        priceRange: '$$',
        rating: 4.0,
        neighborhood: 'Flatiron',
        coordinates: { lat: 40.7364, lng: -73.9900 },
        instagram: '@zara',
        featured: false
      },
      {
        id: 'zara-soho',
        name: 'Zara SoHo',
        category: 'Contemporary Fashion',
        address: '580 Broadway, New York, NY 10012',
        phone: '(212) 343-1725',
        website: 'https://www.zara.com',
        description: 'Spanish fast-fashion retailer with contemporary styles.',
        hours: {
          monday: '10:00 AM - 9:00 PM',
          tuesday: '10:00 AM - 9:00 PM',
          wednesday: '10:00 AM - 9:00 PM',
          thursday: '10:00 AM - 9:00 PM',
          friday: '10:00 AM - 9:00 PM',
          saturday: '10:00 AM - 9:00 PM',
          sunday: '11:00 AM - 8:00 PM'
        },
        specialties: ['Fast Fashion', 'Trendy Clothing', 'Accessories', 'Home'],
        priceRange: '$$',
        rating: 4.0,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7248, lng: -73.9980 },
        instagram: '@zara',
        featured: false
      },
      {
        id: 'rag-bone-soho',
        name: 'Rag & Bone',
        category: 'Contemporary Fashion',
        address: '119 Mercer St, New York, NY 10012',
        phone: '(212) 219-2204',
        website: 'https://www.rag-bone.com',
        description: 'Contemporary American fashion brand known for denim and modern classics.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Denim', 'Contemporary Fashion', 'Leather Goods', 'Footwear'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7248, lng: -73.9986 },
        instagram: '@rag_bone',
        featured: true
      },
      {
        id: 'rag-bone-madison',
        name: 'Rag & Bone Madison Avenue',
        category: 'Contemporary Fashion',
        address: '1014 Madison Ave, New York, NY 10075',
        phone: '(212) 794-5100',
        website: 'https://www.rag-bone.com',
        description: 'Contemporary American fashion brand - Upper East Side location.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Denim', 'Contemporary Fashion', 'Leather Goods', 'Footwear'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'Upper East Side',
        coordinates: { lat: 40.7829, lng: -73.9592 },
        instagram: '@rag_bone',
        featured: true
      },
      {
        id: 'apc-soho',
        name: 'A.P.C. SoHo',
        category: 'Contemporary Fashion',
        address: '131 Mercer St, New York, NY 10012',
        phone: '(212) 966-9685',
        website: 'https://www.apc-us.com',
        description: 'French contemporary fashion brand known for minimalist designs.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Minimalist Fashion', 'Denim', 'Accessories', 'Ready-to-Wear'],
        priceRange: '$$$',
        rating: 4.3,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7248, lng: -73.9986 },
        instagram: '@apc_paris',
        featured: true
      },
      {
        id: 'apc-les',
        name: 'A.P.C. Lower East Side',
        category: 'Contemporary Fashion',
        address: '35 Orchard St, New York, NY 10002',
        phone: '(212) 529-2670',
        website: 'https://www.apc-us.com',
        description: 'French contemporary fashion brand - Lower East Side location.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Minimalist Fashion', 'Denim', 'Accessories', 'Ready-to-Wear'],
        priceRange: '$$$',
        rating: 4.3,
        neighborhood: 'Lower East Side',
        coordinates: { lat: 40.7188, lng: -73.9889 },
        instagram: '@apc_paris',
        featured: true
      },
      {
        id: 'alo-soho',
        name: 'Alo SoHo',
        category: 'Activewear',
        address: '594 Broadway, New York, NY 10012',
        phone: '(212) 925-2556',
        website: 'https://www.aloyoga.com',
        description: 'Premium activewear and yoga apparel brand.',
        hours: {
          monday: '10:00 AM - 8:00 PM',
          tuesday: '10:00 AM - 8:00 PM',
          wednesday: '10:00 AM - 8:00 PM',
          thursday: '10:00 AM - 8:00 PM',
          friday: '10:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Yoga Wear', 'Activewear', 'Athleisure', 'Wellness'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7248, lng: -73.9980 },
        instagram: '@alo',
        featured: true
      },
      {
        id: 'alo-flatiron',
        name: 'Alo Flatiron',
        category: 'Activewear',
        address: '41 E 8th St, New York, NY 10003',
        phone: '(212) 777-2556',
        website: 'https://www.aloyoga.com',
        description: 'Premium activewear and yoga apparel brand - Flatiron location.',
        hours: {
          monday: '10:00 AM - 8:00 PM',
          tuesday: '10:00 AM - 8:00 PM',
          wednesday: '10:00 AM - 8:00 PM',
          thursday: '10:00 AM - 8:00 PM',
          friday: '10:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Yoga Wear', 'Activewear', 'Athleisure', 'Wellness'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'Flatiron',
        coordinates: { lat: 40.7331, lng: -73.9925 },
        instagram: '@alo',
        featured: true
      },
      {
        id: 'alice-olivia-soho',
        name: 'Alice + Olivia',
        category: 'Contemporary Fashion',
        address: '298 Mott St, New York, NY 10012',
        phone: '(212) 343-1070',
        website: 'https://www.aliceandolivia.com',
        description: 'Contemporary fashion brand known for whimsical and feminine designs.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Contemporary Fashion', 'Dresses', 'Whimsical Designs', 'Party Wear'],
        priceRange: '$$$',
        rating: 4.1,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7236, lng: -73.9954 },
        instagram: '@aliceandolivia',
        featured: true
      },
      {
        id: 'free-people-soho',
        name: 'Free People SoHo',
        category: 'Contemporary Fashion',
        address: '79 5th Ave, New York, NY 10003',
        phone: '(212) 673-1077',
        website: 'https://www.freepeople.com',
        description: 'Bohemian-inspired contemporary fashion and lifestyle brand.',
        hours: {
          monday: '11:00 AM - 8:00 PM',
          tuesday: '11:00 AM - 8:00 PM',
          wednesday: '11:00 AM - 8:00 PM',
          thursday: '11:00 AM - 8:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Bohemian Fashion', 'Dresses', 'Accessories', 'Lifestyle'],
        priceRange: '$$',
        rating: 4.0,
        neighborhood: 'Flatiron',
        coordinates: { lat: 40.7364, lng: -73.9900 },
        instagram: '@freepeople',
        featured: false
      },
      {
        id: 'free-people-west-village',
        name: 'Free People West Village',
        category: 'Contemporary Fashion',
        address: '380 Bleecker St, New York, NY 10014',
        phone: '(212) 673-1077',
        website: 'https://www.freepeople.com',
        description: 'Bohemian-inspired contemporary fashion - West Village location.',
        hours: {
          monday: '11:00 AM - 8:00 PM',
          tuesday: '11:00 AM - 8:00 PM',
          wednesday: '11:00 AM - 8:00 PM',
          thursday: '11:00 AM - 8:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Bohemian Fashion', 'Dresses', 'Accessories', 'Lifestyle'],
        priceRange: '$$',
        rating: 4.0,
        neighborhood: 'West Village',
        coordinates: { lat: 40.7368, lng: -74.0037 },
        instagram: '@freepeople',
        featured: false
      },
      {
        id: 'jcrew-rockefeller',
        name: 'J.Crew Rockefeller Center',
        category: 'Contemporary Fashion',
        address: '30 Rockefeller Plaza, New York, NY 10112',
        phone: '(212) 765-4227',
        website: 'https://www.jcrew.com',
        description: 'American clothing brand known for preppy and classic styles.',
        hours: {
          monday: '10:00 AM - 8:00 PM',
          tuesday: '10:00 AM - 8:00 PM',
          wednesday: '10:00 AM - 8:00 PM',
          thursday: '10:00 AM - 8:00 PM',
          friday: '10:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Preppy Fashion', 'Work Wear', 'Casual Clothing', 'Accessories'],
        priceRange: '$$',
        rating: 4.1,
        neighborhood: 'Midtown West',
        coordinates: { lat: 40.7587, lng: -73.9787 },
        instagram: '@jcrew',
        featured: false
      },
      {
        id: 'jcrew-soho',
        name: 'J.Crew SoHo',
        category: 'Contemporary Fashion',
        address: '99 Prince St, New York, NY 10012',
        phone: '(212) 966-2739',
        website: 'https://www.jcrew.com',
        description: 'American clothing brand - SoHo flagship location.',
        hours: {
          monday: '10:00 AM - 8:00 PM',
          tuesday: '10:00 AM - 8:00 PM',
          wednesday: '10:00 AM - 8:00 PM',
          thursday: '10:00 AM - 8:00 PM',
          friday: '10:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Preppy Fashion', 'Work Wear', 'Casual Clothing', 'Accessories'],
        priceRange: '$$',
        rating: 4.1,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7242, lng: -73.9981 },
        instagram: '@jcrew',
        featured: false
      },
      {
        id: 'james-perse-soho',
        name: 'James Perse',
        category: 'Contemporary Fashion',
        address: '449 Broome St, New York, NY 10013',
        phone: '(212) 431-4593',
        website: 'https://www.jamesperse.com',
        description: 'Los Angeles-based contemporary fashion brand known for casual luxury.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Casual Luxury', 'T-shirts', 'Knitwear', 'Relaxed Silhouettes'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7215, lng: -73.9993 },
        instagram: '@jamesperse',
        featured: true
      },
      {
        id: 'kenzo-soho',
        name: 'Kenzo',
        category: 'Luxury Fashion',
        address: '96 Greene St, New York, NY 10012',
        phone: '(212) 226-7573',
        website: 'https://www.kenzo.com',
        description: 'French luxury fashion house known for bold prints and streetwear influences.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Designer Fashion', 'Bold Prints', 'Streetwear', 'Accessories'],
        priceRange: '$$$$',
        rating: 4.3,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7230, lng: -73.9990 },
        instagram: '@kenzo',
        featured: true
      },
      {
        id: 'loro-piana-madison',
        name: 'Loro Piana',
        category: 'Luxury Fashion',
        address: '821 Madison Ave, New York, NY 10021',
        phone: '(212) 794-5050',
        website: 'https://www.loropiana.com',
        description: 'Italian luxury fashion house renowned for cashmere and fine textiles.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Cashmere', 'Fine Textiles', 'Luxury Clothing', 'Accessories'],
        priceRange: '$$$$',
        rating: 4.5,
        neighborhood: 'Upper East Side',
        coordinates: { lat: 40.7755, lng: -73.9625 },
        instagram: '@loropiana',
        featured: true
      },
      {
        id: 'vince-soho',
        name: 'Vince SoHo',
        category: 'Contemporary Fashion',
        address: '122 Spring St, New York, NY 10012',
        phone: '(212) 431-0088',
        website: 'https://www.vince.com',
        description: 'Contemporary fashion brand known for modern minimalism.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Modern Minimalism', 'Knitwear', 'Leather Goods', 'Footwear'],
        priceRange: '$$$',
        rating: 4.1,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7223, lng: -73.9976 },
        instagram: '@vince',
        featured: true
      },
      {
        id: 'vince-madison',
        name: 'Vince Madison Avenue',
        category: 'Contemporary Fashion',
        address: '991 Madison Ave, New York, NY 10075',
        phone: '(212) 327-2838',
        website: 'https://www.vince.com',
        description: 'Contemporary fashion brand - Upper East Side location.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Modern Minimalism', 'Knitwear', 'Leather Goods', 'Footwear'],
        priceRange: '$$$',
        rating: 4.1,
        neighborhood: 'Upper East Side',
        coordinates: { lat: 40.7814, lng: -73.9597 },
        instagram: '@vince',
        featured: true
      },
      {
        id: 'boss-fifth-avenue',
        name: 'Hugo Boss',
        category: 'Contemporary Fashion',
        address: '717 5th Ave, New York, NY 10022',
        phone: '(212) 485-1800',
        website: 'https://www.hugoboss.com',
        description: 'German luxury fashion and style house.',
        hours: {
          monday: '10:00 AM - 8:00 PM',
          tuesday: '10:00 AM - 8:00 PM',
          wednesday: '10:00 AM - 8:00 PM',
          thursday: '10:00 AM - 8:00 PM',
          friday: '10:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Business Wear', 'Suits', 'Formal Wear', 'Accessories'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'Midtown East',
        coordinates: { lat: 40.7614, lng: -73.9776 },
        instagram: '@hugoboss',
        featured: true
      },
      {
        id: 'boss-soho',
        name: 'Hugo Boss SoHo',
        category: 'Contemporary Fashion',
        address: '132 Spring St, New York, NY 10012',
        phone: '(212) 965-1300',
        website: 'https://www.hugoboss.com',
        description: 'German luxury fashion house - SoHo location.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Business Wear', 'Suits', 'Casual Wear', 'Accessories'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7223, lng: -73.9976 },
        instagram: '@hugoboss',
        featured: true
      },
      {
        id: 'wilsons-leather-times-square',
        name: 'Wilsons Leather',
        category: 'Leather Goods',
        address: '1500 Broadway, New York, NY 10036',
        phone: '(212) 302-2470',
        website: 'https://www.wilsonsleather.com',
        description: 'American leather goods retailer specializing in jackets and accessories.',
        hours: {
          monday: '10:00 AM - 9:00 PM',
          tuesday: '10:00 AM - 9:00 PM',
          wednesday: '10:00 AM - 9:00 PM',
          thursday: '10:00 AM - 9:00 PM',
          friday: '10:00 AM - 9:00 PM',
          saturday: '10:00 AM - 9:00 PM',
          sunday: '11:00 AM - 8:00 PM'
        },
        specialties: ['Leather Jackets', 'Accessories', 'Handbags', 'Men\'s Leather'],
        priceRange: '$$',
        rating: 4.0,
        neighborhood: 'Times Square',
        coordinates: { lat: 40.7580, lng: -73.9855 },
        instagram: '@wilsonsleather',
        featured: false
      },
      {
        id: 'allbirds-soho',
        name: 'Allbirds SoHo',
        category: 'Sustainable Fashion',
        address: '73 Spring St, New York, NY 10012',
        phone: '(646) 838-1505',
        website: 'https://www.allbirds.com',
        description: 'Sustainable footwear brand using natural materials.',
        hours: {
          monday: '11:00 AM - 8:00 PM',
          tuesday: '11:00 AM - 8:00 PM',
          wednesday: '11:00 AM - 8:00 PM',
          thursday: '11:00 AM - 8:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Sustainable Footwear', 'Natural Materials', 'Comfort Shoes', 'Eco-Friendly'],
        priceRange: '$$',
        rating: 4.3,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7223, lng: -73.9976 },
        instagram: '@allbirds',
        featured: true
      },
      {
        id: 'allbirds-flatiron',
        name: 'Allbirds Flatiron',
        category: 'Sustainable Fashion',
        address: '28 W 23rd St, New York, NY 10010',
        phone: '(646) 838-1506',
        website: 'https://www.allbirds.com',
        description: 'Sustainable footwear brand - Flatiron location.',
        hours: {
          monday: '11:00 AM - 8:00 PM',
          tuesday: '11:00 AM - 8:00 PM',
          wednesday: '11:00 AM - 8:00 PM',
          thursday: '11:00 AM - 8:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Sustainable Footwear', 'Natural Materials', 'Comfort Shoes', 'Eco-Friendly'],
        priceRange: '$$',
        rating: 4.3,
        neighborhood: 'Flatiron',
        coordinates: { lat: 40.7420, lng: -73.9887 },
        instagram: '@allbirds',
        featured: true
      },
      {
        id: 'brunello-cucinelli-madison',
        name: 'Brunello Cucinelli',
        category: 'Luxury Fashion',
        address: '765 Madison Ave, New York, NY 10065',
        phone: '(212) 813-0900',
        website: 'https://www.brunellocucinelli.com',
        description: 'Italian luxury fashion house known for premium cashmere and sophisticated menswear and womenswear.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Cashmere', 'Italian Craftsmanship', 'Luxury Knitwear', 'Tailoring'],
        priceRange: '$$$$',
        rating: 4.7,
        neighborhood: 'Upper East Side',
        coordinates: { lat: 40.7641, lng: -73.9720 },
        instagram: '@brunellocucinelli',
        featured: true
      },
      {
        id: 'max-mara-madison',
        name: 'Max Mara',
        category: 'Contemporary Fashion',
        address: '813 Madison Ave, New York, NY 10065',
        phone: '(212) 879-6100',
        website: 'https://www.maxmara.com',
        description: 'Italian fashion house renowned for luxury coats, sophisticated ready-to-wear, and timeless elegance.',
        hours: {
          monday: '10:00 AM - 7:00 PM',
          tuesday: '10:00 AM - 7:00 PM',
          wednesday: '10:00 AM - 7:00 PM',
          thursday: '10:00 AM - 7:00 PM',
          friday: '10:00 AM - 7:00 PM',
          saturday: '10:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Luxury Coats', 'Italian Design', 'Professional Wear', 'Tailoring'],
        priceRange: '$$$',
        rating: 4.5,
        neighborhood: 'Upper East Side',
        coordinates: { lat: 40.7685, lng: -73.9668 },
        instagram: '@maxmara',
        featured: true
      },
      {
        id: 'diptyque-bleecker',
        name: 'Diptyque',
        category: 'Beauty & Fragrance',
        address: '376 Bleecker St, New York, NY 10014',
        phone: '(212) 633-9313',
        website: 'https://www.diptyque.com',
        description: 'French luxury fragrance house offering artisanal candles, perfumes, and home fragrance products.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Luxury Candles', 'Artisanal Fragrances', 'Home Fragrance', 'French Craftsmanship'],
        priceRange: '$$$',
        rating: 4.6,
        neighborhood: 'West Village',
        coordinates: { lat: 40.7335, lng: -74.0027 },
        instagram: '@diptyque',
        featured: true
      },
      {
        id: 'nike-soho',
        name: 'Nike SoHo',
        category: 'Athletic Wear',
        address: '529 Broadway, New York, NY 10012',
        phone: '(212) 226-5433',
        website: 'https://www.nike.com',
        description: 'Global athletic footwear and apparel brand offering innovative sportswear and lifestyle products.',
        hours: {
          monday: '10:00 AM - 9:00 PM',
          tuesday: '10:00 AM - 9:00 PM',
          wednesday: '10:00 AM - 9:00 PM',
          thursday: '10:00 AM - 9:00 PM',
          friday: '10:00 AM - 9:00 PM',
          saturday: '10:00 AM - 9:00 PM',
          sunday: '11:00 AM - 8:00 PM'
        },
        specialties: ['Athletic Footwear', 'Performance Apparel', 'Limited Editions', 'Customization'],
        priceRange: '$$',
        rating: 4.2,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7230, lng: -73.9969 },
        instagram: '@nike',
        featured: true
      },
      {
        id: 'new-balance-flatiron',
        name: 'New Balance',
        category: 'Athletic Wear',
        address: '150 5th Ave, New York, NY 10011',
        phone: '(212) 727-4465',
        website: 'https://www.newbalance.com',
        description: 'Athletic footwear and apparel company known for premium running shoes and lifestyle sneakers.',
        hours: {
          monday: '10:00 AM - 8:00 PM',
          tuesday: '10:00 AM - 8:00 PM',
          wednesday: '10:00 AM - 8:00 PM',
          thursday: '10:00 AM - 8:00 PM',
          friday: '10:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Running Shoes', 'Athletic Performance', 'Lifestyle Sneakers', 'Made in USA'],
        priceRange: '$$',
        rating: 4.4,
        neighborhood: 'Flatiron',
        coordinates: { lat: 40.7410, lng: -73.9896 },
        instagram: '@newbalance',
        featured: true
      },
      {
        id: 'golden-goose-soho',
        name: 'Golden Goose',
        category: 'Luxury Footwear',
        address: '437 West Broadway, New York, NY 10012',
        phone: '(212) 219-2644',
        website: 'https://www.goldengoose.com',
        description: 'Italian luxury footwear and fashion brand known for their signature distressed sneakers and artisanal craftsmanship.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 7:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Luxury Sneakers', 'Italian Craftsmanship', 'Distressed Design', 'Limited Editions'],
        priceRange: '$$$',
        rating: 4.3,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7242, lng: -74.0055 },
        instagram: '@goldengoose',
        featured: true
      },
      {
        id: 'pandora-times-square',
        name: 'Pandora',
        category: 'Jewelry',
        address: '1535 Broadway, New York, NY 10036',
        phone: '(212) 768-6472',
        website: 'https://www.pandora.net',
        description: 'Danish jewelry manufacturer known for customizable charm bracelets, rings, and contemporary jewelry designs.',
        hours: {
          monday: '10:00 AM - 9:00 PM',
          tuesday: '10:00 AM - 9:00 PM',
          wednesday: '10:00 AM - 9:00 PM',
          thursday: '10:00 AM - 9:00 PM',
          friday: '10:00 AM - 9:00 PM',
          saturday: '10:00 AM - 9:00 PM',
          sunday: '10:00 AM - 8:00 PM'
        },
        specialties: ['Charm Bracelets', 'Contemporary Jewelry', 'Customization', 'Sterling Silver'],
        priceRange: '$$',
        rating: 4.1,
        neighborhood: 'Times Square',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        instagram: '@pandora_na',
        featured: true
      }
    ];

    this.brooklynStores = [
      {
        id: 'bird-brooklyn',
        name: 'Bird Brooklyn',
        category: 'Contemporary Fashion',
        address: '220 Smith St, Brooklyn, NY 11201',
        phone: '(718) 797-3774',
        website: 'https://www.shopbird.com',
        description: 'Boutique featuring contemporary and emerging designer fashion.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '11:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Contemporary Fashion', 'Emerging Designers', 'Accessories', 'Local Brands'],
        priceRange: '$$$',
        rating: 4.4,
        neighborhood: 'Cobble Hill',
        coordinates: { lat: 40.6847, lng: -73.9967 },
        instagram: '@birdbrooklyn',
        featured: true
      },
      {
        id: 'catbird',
        name: 'Catbird',
        category: 'Jewelry & Accessories',
        address: '219 Bedford Ave, Brooklyn, NY 11249',
        phone: '(718) 599-3457',
        website: 'https://www.catbirdnyc.com',
        description: 'Delicate jewelry and curated vintage pieces in Williamsburg.',
        hours: {
          monday: '12:00 PM - 7:00 PM',
          tuesday: '12:00 PM - 7:00 PM',
          wednesday: '12:00 PM - 7:00 PM',
          thursday: '12:00 PM - 7:00 PM',
          friday: '12:00 PM - 8:00 PM',
          saturday: '11:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Fine Jewelry', 'Vintage', 'Wedding Bands', 'Accessories'],
        priceRange: '$$',
        rating: 4.5,
        neighborhood: 'Williamsburg',
        coordinates: { lat: 40.7081, lng: -73.9571 },
        instagram: '@catbirdnyc',
        featured: true
      },
      {
        id: 'sincerely-tommy',
        name: 'Sincerely Tommy',
        category: 'Streetwear',
        address: '343 Tompkins Ave, Brooklyn, NY 11216',
        phone: '(347) 915-1287',
        website: 'https://www.sincerelytommy.com',
        description: 'Contemporary streetwear and lifestyle brand based in Bed-Stuy.',
        hours: {
          monday: 'Closed',
          tuesday: '12:00 PM - 7:00 PM',
          wednesday: '12:00 PM - 7:00 PM',
          thursday: '12:00 PM - 7:00 PM',
          friday: '12:00 PM - 8:00 PM',
          saturday: '11:00 AM - 8:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Streetwear', 'Contemporary Fashion', 'Local Brands', 'Lifestyle'],
        priceRange: '$$',
        rating: 4.6,
        neighborhood: 'Bed-Stuy',
        coordinates: { lat: 40.6892, lng: -73.9442 },
        instagram: '@sincerelytommy',
        featured: true
      },
      {
        id: 'pilgrim-surf-supply',
        name: 'Pilgrim Surf + Supply',
        category: 'Lifestyle & Surf',
        address: '68 N 4th St, Brooklyn, NY 11249',
        phone: '(718) 218-7456',
        website: 'https://www.pilgrimsupply.com',
        description: 'Surf-inspired lifestyle brand with curated selection of clothing and accessories.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Surf Wear', 'Lifestyle', 'Outdoor Gear', 'Contemporary Fashion'],
        priceRange: '$$',
        rating: 4.3,
        neighborhood: 'Williamsburg',
        coordinates: { lat: 40.7081, lng: -73.9571 },
        instagram: '@pilgrimsupply',
        featured: true
      },
      {
        id: 'maryam-nassir-zadeh',
        name: 'Maryam Nassir Zadeh',
        category: 'Designer Fashion',
        address: '123 Norfolk St, New York, NY 10002',
        phone: '(212) 228-2888',
        website: 'https://www.mnzstore.com',
        description: 'Eponymous designer boutique featuring contemporary women\'s fashion.',
        hours: {
          monday: '12:00 PM - 7:00 PM',
          tuesday: '12:00 PM - 7:00 PM',
          wednesday: '12:00 PM - 7:00 PM',
          thursday: '12:00 PM - 7:00 PM',
          friday: '12:00 PM - 7:00 PM',
          saturday: '11:00 AM - 8:00 PM',
          sunday: '12:00 PM - 7:00 PM'
        },
        specialties: ['Designer Fashion', 'Contemporary', 'Shoes', 'Accessories'],
        priceRange: '$$$',
        rating: 4.2,
        neighborhood: 'Lower East Side',
        coordinates: { lat: 40.7223, lng: -73.9880 },
        instagram: '@maryamnassirzadeh',
        featured: true
      },
      {
        id: 'frankie-shop-brooklyn',
        name: 'Frankie Shop Brooklyn',
        category: 'Contemporary Fashion',
        address: '17 Crosby St, New York, NY 10013',
        phone: '(646) 657-9185',
        website: 'https://thefrankieshop.com',
        description: 'Curated selection of contemporary and emerging designers.',
        hours: {
          monday: '11:00 AM - 7:00 PM',
          tuesday: '11:00 AM - 7:00 PM',
          wednesday: '11:00 AM - 7:00 PM',
          thursday: '11:00 AM - 7:00 PM',
          friday: '11:00 AM - 7:00 PM',
          saturday: '11:00 AM - 8:00 PM',
          sunday: '12:00 PM - 6:00 PM'
        },
        specialties: ['Contemporary Fashion', 'Emerging Designers', 'Minimalist Style', 'Accessories'],
        priceRange: '$$',
        rating: 4.4,
        neighborhood: 'SoHo',
        coordinates: { lat: 40.7248, lng: -73.9986 },
        instagram: '@thefrankieshop',
        featured: true
      },
      {
        id: 'reformation-williamsburg',
        name: 'Reformation',
        category: 'Sustainable Fashion',
        address: '175 Grand St, Brooklyn, NY 11249',
        phone: '(929) 295-2770',
        website: 'https://www.thereformation.com',
        description: 'Sustainable fashion brand known for vintage-inspired designs.',
        hours: {
          monday: '11:00 AM - 8:00 PM',
          tuesday: '11:00 AM - 8:00 PM',
          wednesday: '11:00 AM - 8:00 PM',
          thursday: '11:00 AM - 8:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Sustainable Fashion', 'Vintage-Inspired', 'Dresses', 'Contemporary'],
        priceRange: '$$',
        rating: 4.1,
        neighborhood: 'Williamsburg',
        coordinates: { lat: 40.7081, lng: -73.9571 },
        instagram: '@reformation',
        featured: true
      },
      {
        id: 'kith-brooklyn',
        name: 'Kith Brooklyn',
        category: 'Streetwear',
        address: '233 Flatbush Ave, Brooklyn, NY 11217',
        phone: '(718) 230-0033',
        website: 'https://kith.com',
        description: 'Premium streetwear and lifestyle brand with exclusive collaborations.',
        hours: {
          monday: '11:00 AM - 8:00 PM',
          tuesday: '11:00 AM - 8:00 PM',
          wednesday: '11:00 AM - 8:00 PM',
          thursday: '11:00 AM - 8:00 PM',
          friday: '11:00 AM - 8:00 PM',
          saturday: '10:00 AM - 8:00 PM',
          sunday: '11:00 AM - 7:00 PM'
        },
        specialties: ['Streetwear', 'Premium Sneakers', 'Limited Editions', 'Collaborations'],
        priceRange: '$$$',
        rating: 4.5,
        neighborhood: 'Prospect Heights',
        coordinates: { lat: 40.6776, lng: -73.9707 },
        instagram: '@kith',
        featured: true
      }
    ];

    this.allStores = [...this.manhattanStores, ...this.brooklynStores];
  }

  // Store retrieval methods
  getAllStores() {
    return this.allStores.map(store => ({
      ...store,
      isOpen: this.isStoreOpen(store.id)
    }));
  }

  getManhattanStores() {
    return this.manhattanStores;
  }

  getBrooklynStores() {
    return this.brooklynStores;
  }

  getFeaturedStores() {
    return this.allStores.filter(store => store.featured);
  }

  getStoreById(id) {
    return this.allStores.find(store => store.id === id);
  }

  getStoresByCategory(category) {
    return this.allStores.filter(store => 
      store.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  getStoresByNeighborhood(neighborhood) {
    return this.allStores.filter(store => 
      store.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
    );
  }

  getStoresByPriceRange(priceRange) {
    return this.allStores.filter(store => store.priceRange === priceRange);
  }

  searchStores(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.allStores.filter(store => 
      store.name.toLowerCase().includes(lowercaseQuery) ||
      store.category.toLowerCase().includes(lowercaseQuery) ||
      store.neighborhood.toLowerCase().includes(lowercaseQuery) ||
      store.specialties.some(specialty => 
        specialty.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  // Store utility methods
  getStoreHours(storeId, day = null) {
    const store = this.getStoreById(storeId);
    if (!store) return null;
    
    if (day) {
      return store.hours[day.toLowerCase()];
    }
    
    return store.hours;
  }

  isStoreOpen(storeId) {
    const store = this.getStoreById(storeId);
    if (!store) return false;
    
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    
    const todayHours = store.hours[day];
    if (!todayHours || todayHours === 'Closed') return false;
    
    const [openTime, closeTime] = todayHours.split(' - ');
    const openHour = this.convertTo24Hour(openTime);
    const closeHour = this.convertTo24Hour(closeTime);
    
    return time >= openHour && time <= closeHour;
  }

  convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}:00`;
  }

  getStoresByDistance(userLat, userLng, maxDistance = 10) {
    return this.allStores
      .map(store => ({
        ...store,
        distance: this.calculateDistance(
          userLat, userLng,
          store.coordinates.lat, store.coordinates.lng
        )
      }))
      .filter(store => store.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  }

  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // SVG and visual methods
  generateStoreSVG(storeId) {
    const store = this.getStoreById(storeId);
    if (!store) return null;

    // Generate a unique SVG based on store characteristics
    const colors = this.getStoreColors(store);
    const icon = this.getStoreIcon(store);
    
    return {
      id: store.id,
      name: store.name,
      svg: this.createStoreSVG(store, colors, icon),
      colors: colors,
      icon: icon
    };
  }

  getStoreColors(store) {
    // Define color schemes based on store category and brand identity
    const colorSchemes = {
      'Luxury Department Store': {
        primary: '#D4AF37',
        secondary: '#1A1A1A',
        accent: '#F5F5DC'
      },
      'Luxury Fashion': {
        primary: '#000000',
        secondary: '#D4AF37',
        accent: '#FFFFFF'
      },
      'Luxury Jewelry': {
        primary: '#87CEEB',
        secondary: '#000080',
        accent: '#FFFFFF'
      },
      'Contemporary Fashion': {
        primary: '#2F4F4F',
        secondary: '#D3D3D3',
        accent: '#FFFFFF'
      },
      'Streetwear': {
        primary: '#FF6B35',
        secondary: '#2E3440',
        accent: '#ECEFF4'
      },
      'Sustainable Fashion': {
        primary: '#228B22',
        secondary: '#F5F5DC',
        accent: '#FFFFFF'
      }
    };

    return colorSchemes[store.category] || colorSchemes['Contemporary Fashion'];
  }

  getStoreIcon(store) {
    const iconMap = {
      'Luxury Department Store': 'department-store',
      'Luxury Fashion': 'fashion',
      'Luxury Jewelry': 'jewelry',
      'Contemporary Fashion': 'boutique',
      'Streetwear': 'streetwear',
      'Sustainable Fashion': 'eco-fashion',
      'Jewelry & Accessories': 'jewelry',
      'Lifestyle & Surf': 'lifestyle'
    };

    return iconMap[store.category] || 'boutique';
  }

  createStoreSVG(colors, iconType) {
    const svgTemplates = {
      'department-store': this.createDepartmentStoreSVG(colors),
      'fashion': this.createFashionSVG(colors),
      'jewelry': this.createJewelrySVG(colors),
      'boutique': this.createBoutiqueSVG(colors),
      'streetwear': this.createStreetwearSVG(colors),
      'eco-fashion': this.createEcoFashionSVG(colors),
      'lifestyle': this.createLifestyleSVG(colors)
    };

    return svgTemplates[iconType] || svgTemplates['boutique'];
  }

  createDepartmentStoreSVG(colors) {
    return `
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dept-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect x="8" y="16" width="48" height="40" fill="url(#dept-gradient)" rx="4"/>
        <rect x="12" y="20" width="8" height="12" fill="${colors.accent}" opacity="0.8"/>
        <rect x="24" y="20" width="8" height="12" fill="${colors.accent}" opacity="0.8"/>
        <rect x="36" y="20" width="8" height="12" fill="${colors.accent}" opacity="0.8"/>
        <rect x="48" y="20" width="4" height="12" fill="${colors.accent}" opacity="0.8"/>
        <rect x="12" y="36" width="40" height="4" fill="${colors.accent}"/>
        <circle cx="32" cy="48" r="4" fill="${colors.primary}"/>
      </svg>
    `;
  }

  createFashionSVG(colors) {
    return `
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fashion-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M20 12 L24 8 L40 8 L44 12 L44 20 L40 56 L24 56 L20 20 Z" fill="url(#fashion-gradient)"/>
        <ellipse cx="32" cy="20" rx="8" ry="4" fill="${colors.accent}"/>
        <rect x="28" y="24" width="8" height="20" fill="${colors.accent}" opacity="0.6"/>
        <circle cx="26" cy="16" r="2" fill="${colors.primary}"/>
        <circle cx="38" cy="16" r="2" fill="${colors.primary}"/>
      </svg>
    `;
  }

  createJewelrySVG(colors) {
    return `
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="jewelry-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
            <stop offset="70%" style="stop-color:${colors.primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
          </radialGradient>
        </defs>
        <path d="M32 8 L44 20 L40 24 L32 48 L24 24 L20 20 Z" fill="url(#jewelry-gradient)"/>
        <polygon points="28,20 32,16 36,20 34,22 30,22" fill="${colors.accent}"/>
        <circle cx="32" cy="32" r="6" fill="${colors.primary}" opacity="0.8"/>
        <circle cx="32" cy="32" r="3" fill="${colors.accent}"/>
      </svg>
    `;
  }

  createBoutiqueSVG(colors) {
    return `
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boutique-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect x="12" y="20" width="40" height="36" fill="url(#boutique-gradient)" rx="6"/>
        <rect x="16" y="24" width="32" height="28" fill="${colors.accent}" opacity="0.9"/>
        <circle cx="24" cy="36" r="6" fill="${colors.primary}" opacity="0.7"/>
        <circle cx="40" cy="36" r="6" fill="${colors.primary}" opacity="0.7"/>
        <rect x="20" y="8" width="24" height="16" fill="${colors.secondary}" rx="12"/>
        <rect x="28" y="44" width="8" height="8" fill="${colors.secondary}"/>
      </svg>
    `;
  }

  createStreetwearSVG(colors) {
    return `
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="street-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${colors.accent};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect x="8" y="16" width="48" height="40" fill="url(#street-gradient)" rx="8"/>
        <polygon points="16,24 24,16 40,16 48,24 44,28 36,20 28,20 20,28" fill="${colors.accent}"/>
        <rect x="20" y="32" width="24" height="16" fill="${colors.secondary}" opacity="0.8"/>
        <circle cx="44" cy="44" r="8" fill="${colors.primary}"/>
        <polygon points="40,40 44,36 48,40 48,48 40,48" fill="${colors.accent}"/>
      </svg>
    `;
  }

  createEcoFashionSVG(colors) {
    return `
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="eco-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="24" fill="url(#eco-gradient)"/>
        <path d="M20 32 Q32 20 44 32 Q32 44 20 32" fill="${colors.accent}"/>
        <circle cx="28" cy="28" r="4" fill="${colors.primary}"/>
        <circle cx="36" cy="36" r="4" fill="${colors.primary}"/>
        <path d="M24 16 Q32 24 40 16" stroke="${colors.accent}" stroke-width="2" fill="none"/>
        <path d="M24 48 Q32 40 40 48" stroke="${colors.accent}" stroke-width="2" fill="none"/>
      </svg>
    `;
  }

  createLifestyleSVG(colors) {
    return `
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lifestyle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#lifestyle-gradient)"/>
        <path d="M16 32 Q32 16 48 32 Q32 48 16 32" fill="${colors.accent}" opacity="0.8"/>
        <circle cx="32" cy="24" r="6" fill="${colors.primary}"/>
        <circle cx="24" cy="40" r="4" fill="${colors.secondary}"/>
        <circle cx="40" cy="40" r="4" fill="${colors.secondary}"/>
        <path d="M20 20 L44 44" stroke="${colors.accent}" stroke-width="3"/>
        <path d="M44 20 L20 44" stroke="${colors.accent}" stroke-width="3"/>
      </svg>
    `;
  }

  // Store statistics and analytics
  getStoreStats() {
    const stats = {
      total: this.allStores.length,
      manhattan: this.manhattanStores.length,
      brooklyn: this.brooklynStores.length,
      featured: this.getFeaturedStores().length,
      categories: {},
      neighborhoods: {},
      priceRanges: {}
    };

    this.allStores.forEach(store => {
      // Categories
      stats.categories[store.category] = (stats.categories[store.category] || 0) + 1;
      
      // Neighborhoods
      stats.neighborhoods[store.neighborhood] = (stats.neighborhoods[store.neighborhood] || 0) + 1;
      
      // Price ranges
      stats.priceRanges[store.priceRange] = (stats.priceRanges[store.priceRange] || 0) + 1;
    });

    return stats;
  }

  getAverageRating() {
    const totalRating = this.allStores.reduce((sum, store) => sum + store.rating, 0);
    return (totalRating / this.allStores.length).toFixed(1);
  }

  // Generate WhatsApp links for stores
  generateStoreWhatsAppLink(storeId, message = '') {
    const store = this.getStoreById(storeId);
    if (!store) return null;

    const defaultMessage = message || `Hi! I'm interested in shopping at ${store.name} through Tuhme. Can you help me with an order?`;
    const encodedMessage = encodeURIComponent(defaultMessage);
    
    // Use your business WhatsApp number
    const businessPhone = import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE || '+16465889916';
    
    return `https://wa.me/${businessPhone.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
  }

  // Export store data
  exportStoreData(format = 'json') {
    const data = {
      stores: this.allStores,
      stats: this.getStoreStats(),
      generatedAt: new Date().toISOString()
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    } else if (format === 'csv') {
      return this.convertToCSV(this.allStores);
    }

    return data;
  }

  convertToCSV(stores) {
    const headers = ['id', 'name', 'category', 'address', 'phone', 'website', 'neighborhood', 'rating', 'priceRange'];
    const csvContent = [
      headers.join(','),
      ...stores.map(store => 
        headers.map(header => `"${store[header] || ''}"`).join(',')
      )
    ].join('\n');

    return csvContent;
  }
}

// Export singleton instance
export default new StoreService();