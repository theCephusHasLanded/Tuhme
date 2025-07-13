// Generate avatar-style icon based on store name
const generateAvatarIcon = (storeName) => {
  const firstLetter = storeName.charAt(0).toUpperCase();
  const colors = [
    '#000000', '#333333', '#8b9dc3', '#dda15e', '#a8dadc',
    '#f1faee', '#ffb3ba', '#c7f9cc', '#bde0ff', '#ffd23f',
    '#a663cc', '#ff6b35', '#4ecdc4', '#ff9a8b', '#f8f32b',
    '#95e1d3', '#f38ba8', '#74c0fc', '#ffd43b', '#b197fc'
  ];
  const color = colors[firstLetter.charCodeAt(0) % colors.length];
  
  return `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="60" cy="60" r="58" fill="${color}" opacity="0.9"/>
        <circle cx="60" cy="60" r="58" stroke="${color}" stroke-width="2" fill="none" opacity="0.3"/>
        <text x="60" y="75" text-anchor="middle" fill="white" font-family="var(--font-display)" font-size="48" font-weight="700" text-shadow="0 2px 4px rgba(0,0,0,0.3)">${firstLetter}</text>
      </g>
    </svg>
  `;
};

// Store name mapping - maps store IDs to readable names
const storeNames = {
  'miu-miu': 'Miu Miu',
  'polene': 'Polène',
  'arcteryx': "Arc'teryx",
  'zara': 'Zara',
  'rag-bone': 'rag & bone',
  'apc': 'A.P.C.',
  'alo': 'Alo',
  'alice-olivia': 'alice + olivia',
  'free-people': 'Free People',
  'jcrew': 'J.Crew',
  'james-perse': 'James Perse',
  'kenzo': 'Kenzo',
  'loro-piana': 'Loro Piana',
  'vince': 'Vince',
  'hugo-boss': 'Hugo Boss',
  'wilsons-leather': 'Wilsons Leather',
  'allbirds': 'allbirds',
  'bergdorf-goodman': 'Bergdorf Goodman',
  'saks-fifth-avenue': 'Saks Fifth Avenue',
  'tiffany-co': 'Tiffany & Co.',
  'chanel-57th': 'Chanel',
  'nordstrom-nyc': 'Nordstrom',
  'gucci': 'Gucci',
  'prada': 'Prada',
  'louis-vuitton': 'Louis Vuitton',
  'fendi': 'Fendi',
  'new-balance': 'New Balance',
  'bloomingdales': "Bloomingdale's",
  'brunello-cucinelli-madison': 'Brunello Cucinelli',
  'max-mara-madison': 'Max Mara',
  'diptyque-bleecker': 'diptyque',
  'nike-soho': 'Nike',
  'new-balance-flatiron': 'New Balance',
  'golden-goose-soho': 'Golden Goose',
  'pandora-times-square': 'Pandora',
  'adidas-soho': 'Adidas',
  'anthropologie-soho': 'Anthropologie',
  'celine-madison': 'Celine',
  'dior-57th': 'Dior',
  'hermès-madison': 'Hermès',
  'saint-laurent-soho': 'Saint Laurent',
  'bottega-veneta-madison': 'Bottega Veneta',
  'balenciaga-madison': 'Balenciaga',
  'givenchy-madison': 'Givenchy',
  'valentino-madison': 'Valentino',
  'tom-ford-madison': 'Tom Ford',
  'isabel-marant-soho': 'Isabel Marant',
  'theory-soho': 'Theory',
  'acne-studios-soho': 'Acne Studios',
  'ganni-soho': 'Ganni',
  'staud-soho': 'Staud',
  'jacquemus-soho': 'Jacquemus',
  'mansur-gavriel-soho': 'Mansur Gavriel',
  'proenza-schouler-soho': 'Proenza Schouler'
};

// Export function that generates avatar-style icons for all stores
export const getBrandSVG = (storeId) => {
  const storeName = storeNames[storeId] || storeId.replace(/-/g, ' ');
  return generateAvatarIcon(storeName);
};

export default { getBrandSVG };