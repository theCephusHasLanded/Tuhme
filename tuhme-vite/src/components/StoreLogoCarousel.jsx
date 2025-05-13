import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
  Fade,
  Zoom,
  Tooltip,
  Grid
} from '@mui/material';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  StoreRounded as StoreIcon
} from '@mui/icons-material';

// Luxury store data with logos and URLs
const luxuryStores = [
  {
    id: 1,
    name: 'Saks Fifth Avenue',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Saks_Fifth_Avenue_Logo_Vertical_2007.svg/1600px-Saks_Fifth_Avenue_Logo_Vertical_2007.svg.png?20200526002905',
    url: 'https://www.saksfifthavenue.com/c/sale-2/sale?pmid=27066400&sre=hero%5E1%5E1%5Eshop%20now%5E011%20%3E%20null%5Ecc6635ad-b50b-4e76-ad52-80ee65907873'
  },
  {
    id: 2,
    name: 'Bergdorf Goodman',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bergdorf_Goodman_Logo.svg',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwjfvMDTgouNAxWnQkcBHfDJNssYABAKGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMTlnV8wiMsEEeL3KRsjGObF751GWag_y6OKjKUPp0_oiyuVo7DaFUaAt04EALw_wcB&sig=AOD64_2bw6Bj6piJ3mUBftu_vvYKTAp1qA&q&nis=4&adurl&ved=2ahUKEwifzbnTgouNAxXgGFkFHfkRKfMQ0Qx6BAgaEAE'
  },
  {
    id: 3,
    name: 'Nordstrom',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nordstrom_Logo_1991.svg/1062px-Nordstrom_Logo_1991.svg.png?20110711204114',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj7t7-_iIuNAxWjXkcBHQ7NKpEYABABGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMoDr8zMr3zDe4nA6ApUFkyLcFvo35-sYsvW28-PUnIDi9C8v2XqbAaAhyYEALw_wcB&ei=XgUYaLb4I6yv5NoP9r-zmQE&sig=AOD64_1V1eaZ8aDmHphWvmrcXO4uPfXepg&q&sqi=2&nis=4&adurl&ved=2ahUKEwi2n7q_iIuNAxWsF1kFHfbfLBMQ0Qx6BAgJEAE'
  },
  {
    id: 4,
    name: 'Bloomingdale\'s',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Bloomingdale%27s_Logo.svg/350px-Bloomingdale%27s_Logo.svg.png?20150119163919',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwju2va8gouNAxX8S0cBHUCpEMsYABAGGgJxdQ&co=1&gclid=Cj0KCQjwoNzABhDbARIsALfY8VP5u_iIWRZkJpDi3xfijbX81kT7Z_xqOcciveX6mL103CbB-fu47RwaArQqEALw_wcB&sig=AOD64_1numAMkbYAtGJR1FSzNzooWxUOMw&q&adurl&ved=2ahUKEwjw6-68gouNAxWDMlkFHf9ZL2MQ0Qx6BAhdEAE'
  },
  {
    id: 5,
    name: 'Printemps',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Logoprintemps2022.png/1600px-Logoprintemps2022.png?20220816083108',
    url: 'https://us.printemps.com/'
  },
  {
    id: 6,
    name: 'Gucci',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/826px-1960s_Gucci_Logo.svg.png?20170118155705',
    url: 'https://www.https://www.google.com/aclk?sa=l&ai=DChcSEwiDy9eVgIuNAxWTcUcBHQ99LZ0YABAGGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMF8S5IbI05gT0Te_NXvUVWiUaWspAhQthf3zvgjsFV9BnKc31lvmMaAlZ_EALw_wcB&sig=AOD64_0J7fUdC5J8iZv_Z0LT07VQkDL2xA&q&nis=4&adurl&ved=2ahUKEwjIqNKVgIuNAxX8FlkFHTpoGVAQ0Qx6BAgKEAE.com'
  },
  {
    id: 7,
    name: 'Louis Vuitton',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Louis_Vuitton_SVG_Monogram_Logo.svg/1024px-Louis_Vuitton_SVG_Monogram_Logo.svg.png?20230720090352',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwjaysyEgouNAxXPV0cBHW0-BMEYABAMGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMWGmmwTFiSTbGlbeyhqOsMfxEpDzFoYr6Ty2WyKWoHO_Oe5QQOn4QaAsjAEALw_wcB&sig=AOD64_11taczFI-eNx_wpsdIis8zFjD4JQ&q&nis=4&adurl&ved=2ahUKEwiatsaEgouNAxVJFVkFHZ4IJxYQ0Qx6BAgKEAE'
  },
  {
    id: 8,
    name: 'Prada',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Prada-Logo.svg/1024px-Prada-Logo.svg.png?20200520125737',
    url: 'https://www.https://www.google.com/aclk?sa=l&ai=DChcSEwiPjduLgIuNAxWLXUcBHfPDK-UYABAGGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMKhDfYHcyiFa6XoSHbTsjEqQVlh4Kesnx62PikYRn7oVhuX8VRvzsaAoSsEALw_wcB&sig=AOD64_0VptDGyOmNTaAIB96MzwpcJq3Xfg&q&nis=4&adurl&ved=2ahUKEwjyoNWLgIuNAxWjF1kFHXGpKUIQ0Qx6BAgJEAE.com'
  },
  {
    id: 9,
    name: 'Miu Miu',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Miu_Miu_-_logo_%28Italy%2C_1993%29.svg/732px-Miu_Miu_-_logo_%28Italy%2C_1993%29.svg.png?20240215193658',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwjG7PzcgYuNAxUvcUcBHeJPPKMYABAEGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNWZctJXWx5VCBruZqvBfBeSn9d9pkOnexUvd1oOtAF62Upp9Bi6bkaArMaEALw_wcB&sig=AOD64_0jy2skRKz7OhsT5X5n5vJlVQobqg&q&nis=4&adurl&ved=2ahUKEwi2z_bcgYuNAxUID1kFHS4QCncQ0Qx6BAgLEAE'
  },
  {
    id: 10,
    name: 'Anthopologie',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/AnthropologieLogo.png?20160517105308',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwjtwve0jYuNAxUXR0cBHbmXDVIYABBFGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VO14tGQhoQw6Diaud3-_dONoIbmCoss3rdaGXpWAEPNpw5oz4SnJt8aAgbxEALw_wcB&ei=hgoYaKWCJL3V5NoP35PK8QU&sig=AOD64_0rUCGVSpILmASMsU04KWi1xjOPTQ&q&sqi=2&nis=4&adurl&ved=2ahUKEwil3fC0jYuNAxW9KlkFHd-JMl4Q0Qx6BAgLEAE'
  },
  {
    id: 11,
    name: 'Fendi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Fendi_logo.svg/1024px-Fendi_logo.svg.png?20220722130159',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwj7lrjVgYuNAxWbYkcBHXSPDZkYABAGGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VNl21_RMjWYfYovWiQPtiZGQNYVe3A225GoCrd5IE2dYoJ4pkzhUXMaAh5jEALw_wcB&sig=AOD64_2KAQ0L7efsXD-HwMXr9oiVV5HorA&q&nis=4&adurl&ved=2ahUKEwjl2rLVgYuNAxXzFmIAHX2jHgMQ0Qx6BAgJEAE'
  },
  {
    id: 12,
    name: 'Loro Piana',
    logo: 'https://logos-world.net/wp-content/uploads/2024/07/Loro-Piana-Logo.png',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwjKvrulgYuNAxXzXP8BHblwCPcYABAHGgJtZA&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VOAfm7mpiV1V5hLKPhAyegTnvzkOZb3k9-ERXgSg3JyJz_Dkkn25SIaAvesEALw_wcB&sig=AOD64_0cVPch366oavIVR0UAoPa3uubcfQ&q&nis=4&adurl&ved=2ahUKEwjR2balgYuNAxUAvokEHaFcESsQ0Qx6BAgJEAE'
  },
  {
    id: 13,
    name: 'Arc\'teryx',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%B1%D1%80%D0%B5%D0%BD%D0%B4%D1%83_Arc%27teryx.png?20250318183148',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwis8sr_gIuNAxVgW0cBHYQdNUMYABAGGgJxdQ&ae=1&dsh=1&co=1&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMzHbuXeHSvwmDYdiOPpakAWW-lCkCfWeqh5xI7iw2K4naiSK12Y40aAp3hEALw_wcB&sig=AOD64_1rMUDseGjDvhH00S38yUTKz-L5ww&q&adurl=https://arcteryx.com/?CMPID%3Dps%7Ctxt%7Csb%7Cgoogle%7CArc%27teryx_Google-Search_S20_Performance_BOF_R:NAM_C:USA_L:EN_Branded-Proper%7CArcteryx%7Carcteryx%7C65836564211-743427122149%26utm_souce%3D%26utm_medium%3Dps%7Ctxt%7Csb%26utm_campaign%3DArc%27teryx_Google-Search_S20_Performance_BOF_R:NAM_C:USA_L:EN_Branded-Proper%26gclsrc%3Daw.ds%26gad_source%3D1%26gbraid%3D0AAAAADt59Pt_MO6z8Mx3u_XJfLhMiNBR3%26gclid%3DCj0KCQjwoNzABhDbARIsALfY8VMzHbuXeHSvwmDYdiOPpakAWW-lCkCfWeqh5xI7iw2K4naiSK12Y40aAp3hEALw_wcB&ved=2ahUKEwjgxsX_gIuNAxXOEVkFHTxHPdEQ0Qx6BAgJEAE'
  },
  {
    id: 14,
    name: 'New Balance',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/New_balance.png',
    url: 'https://www.newbalance.com/'
  },
  {
    id: 15,
    name: 'Tiffany & Co.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Tiffany_Logo.svg/1600px-Tiffany_Logo.svg.png?20150906052737',
    url: 'https://www.google.com/aclk?sa=l&ai=DChcSEwjCy-3rgIuNAxW1TUcBHVJ6GNsYABAHGgJxdQ&co=1&ase=2&gclid=Cj0KCQjwoNzABhDbARIsALfY8VPEWksab7fhGpuhcmDEWArgB_3vSYe3b_efIGzCsRVd4_nCBH68hy0aArmbEALw_wcB&ei=WP0XaISBB_XQ5NoPn-WmuAw&sig=AOD64_3arb9bNmqiH7xUh-cnkmK9eq2jjg&q&sqi=2&nis=4&adurl&ved=2ahUKEwiEjefrgIuNAxV1KFkFHZ-yCccQ0Qx6BAgVEAQ'
  }
];

const StoreLogoCarousel = ({ onStoreSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const carouselRef = useRef(null);

  // Determine items per slide based on screen size
  const getItemsPerSlide = () => {
    if (isMobile) return 3;
    if (isTablet) return 4;
    return 6;
  };

  const itemsPerSlide = getItemsPerSlide();
  const totalSlides = Math.ceil(luxuryStores.length / itemsPerSlide);

  // Handle manual navigation
  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextIndex = startIndex + itemsPerSlide;

    if (nextIndex >= luxuryStores.length) {
      // Loop back to the beginning
      setStartIndex(0);
    } else {
      setStartIndex(nextIndex);
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const prevIndex = startIndex - itemsPerSlide;

    if (prevIndex < 0) {
      // Loop to the end
      const lastPageIndex = Math.floor((luxuryStores.length - 1) / itemsPerSlide) * itemsPerSlide;
      setStartIndex(lastPageIndex);
    } else {
      setStartIndex(prevIndex);
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto rotation
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000); // Faster rotation (3 seconds instead of 5)

    return () => clearInterval(timer);
  }, [startIndex, isAnimating]);

  // Touch events for swipe on mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left (next)
        handleNext();
      } else {
        // Swipe right (previous)
        handlePrev();
      }
    }

    setTouchStart(null);
  };

  // Handle store click
  const handleStoreClick = (store) => {
    // Always open in a new tab to avoid captcha issues
    window.open(store.url, '_blank');

    // Fire custom event with proper regionId
    const openStoreEvent = new CustomEvent('openStoreWebsite', {
      detail: {
        storeName: store.name,
        storeUrl: store.url,
        storeType: 'luxury',
        regionId: 'manhattan' // Add default regionId
      }
    });
    window.dispatchEvent(openStoreEvent);

    // Show express order instructions modal via callback
    if (onStoreSelect) {
      onStoreSelect(store, 'newTab');
    }
  };

  // Get visible logos
  const visibleLogos = luxuryStores.slice(startIndex, startIndex + itemsPerSlide);

  // Fill with items from the beginning if needed
  if (visibleLogos.length < itemsPerSlide) {
    const neededItems = itemsPerSlide - visibleLogos.length;
    const fillerItems = luxuryStores.slice(0, neededItems);
    visibleLogos.push(...fillerItems);
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: theme.palette.grey[50],
        overflowX: 'hidden',
        borderTop: `1px solid ${theme.palette.grey[100]}`,
        borderBottom: `1px solid ${theme.palette.grey[100]}`
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            component="span"
            variant="overline"
            sx={{
              fontWeight: 500,
              color: 'primary.main',
              letterSpacing: '0.15em',
              mb: 1,
              display: 'block'
            }}
          >
            Elite Shopping Experience
          </Typography>

          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              letterSpacing: -0.5,
              background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', md: 'block' }
            }}
          >
            Manhattan's Finest Stores at Your Fingertips
          </Typography>

          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              display: { xs: 'block', md: 'none' }
            }}
          >
            Manhattan's Finest Stores at Your Fingertips
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Browse directly from these luxury boutiques and have items delivered to your door
            by our concierge team.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            px: { xs: 2, md: 8 },
            py: 4,
            backgroundColor: 'transparent',
            borderRadius: 4,
            overflow: 'visible'
          }}
        >
          {/* Navigation arrows */}
          <Zoom in={true} style={{ transitionDelay: '200ms' }}>
            <IconButton
              onClick={handlePrev}
              aria-label="Previous stores"
              size="large"
              sx={{
                position: 'absolute',
                left: { xs: -16, md: -24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'white',
                boxShadow: theme.shadows.md,
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'translateY(-50%) scale(1.1)',
                  boxShadow: theme.shadows.lg
                },
                display: { xs: 'none', md: 'flex' },
                transition: 'all 0.3s ease',
                width: 48,
                height: 48
              }}
            >
              <LeftIcon />
            </IconButton>
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <IconButton
              onClick={handleNext}
              aria-label="Next stores"
              size="large"
              sx={{
                position: 'absolute',
                right: { xs: -16, md: -24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'white',
                boxShadow: theme.shadows.md,
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'translateY(-50%) scale(1.1)',
                  boxShadow: theme.shadows.lg
                },
                display: { xs: 'none', md: 'flex' },
                transition: 'all 0.3s ease',
                width: 48,
                height: 48
              }}
            >
              <RightIcon />
            </IconButton>
          </Zoom>

          {/* Logo carousel */}
          <Box
            ref={carouselRef}
            sx={{
              display: 'flex',
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              justifyContent: 'center',
              mx: 'auto',
              gap: { xs: 2, md: 4 },
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
                '100%': { transform: 'translateY(0px)' }
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {visibleLogos.map((store, index) => (
              <Fade
                key={`${store.id}-${index}`}
                in={true}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transitionDuration: '700ms'
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: `calc(100% / ${itemsPerSlide} - 16px)`,
                      md: `calc(100% / ${itemsPerSlide} - 32px)`
                    },
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      cursor: 'pointer'
                    }
                  }}
                  onClick={() => handleStoreClick(store)}
                >
                  <Tooltip title={`Browse ${store.name}`} placement="top" arrow>
                    <Paper
                      elevation={2}
                      sx={{
                        height: { xs: 90, md: 120 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: { xs: 2, md: 3 },
                        bgcolor: 'white',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: theme.shadows.lg,
                          bgcolor: 'rgba(255, 255, 255, 0.95)',
                          transform: 'scale(1.08) translateY(-5px)'
                        },
                        position: 'relative',
                        overflow: 'hidden',
                        animation: index % 2 === 0 ? 'pulse 3s infinite' : 'pulse 4s infinite 1s',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.03)' },
                          '100%': { transform: 'scale(1)' }
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={store.logo}
                        alt={store.name}
                        sx={{
                          maxWidth: '85%',
                          maxHeight: { xs: '60px', md: '70px' },
                          objectFit: 'contain',
                          filter: 'contrast(1.1)',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />

                      {/* Store icon indicator */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0.7,
                          transition: 'opacity 0.3s ease',
                          '&:hover': {
                            opacity: 1
                          }
                        }}
                      >
                        <StoreIcon sx={{ fontSize: 12, color: 'white' }} />
                      </Box>
                    </Paper>
                  </Tooltip>

                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      mt: 1.5,
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', md: '0.875rem' }
                    }}
                  >
                    {store.name}
                  </Typography>
                </Box>
              </Fade>
            ))}
          </Box>
        </Paper>

        {/* Dots indicator */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            gap: 1
          }}
        >
          {Array.from({ length: totalSlides }).map((_, index) => {
            const currentSlide = Math.floor(startIndex / itemsPerSlide);
            return (
              <Box
                key={index}
                sx={{
                  width: currentSlide === index ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: currentSlide === index ? 'primary.main' : theme.palette.grey[300],
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: currentSlide === index ? 'primary.dark' : theme.palette.grey[400]
                  }
                }}
                onClick={() => {
                  setStartIndex(index * itemsPerSlide);
                }}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default StoreLogoCarousel;
