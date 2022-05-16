import {createTheme} from '@shopify/restyle';

const palette = {
  blue: '#01BAEF',
  yellow: '#FED90F',
  red: '#FF1053',

  black: '#040F16',
  white: '#FFFFFF',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    primaryText: palette.black,
    createButton: palette.black,
    shadow: palette.black,
    emoji: palette.yellow,
    primaryCard: palette.blue,
    secondaryCard: palette.yellow,
    tertiaryCard: palette.red
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontFamily: 'ShopifySans-Bold',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'primaryText',
    },
    subheader: {
      fontFamily: 'ShopifySans-SemiBold',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'primaryText',
    },
    body: {
      fontFamily: 'ShopifySans',
      fontSize: 16,
      lineHeight: 24,
      color: 'primaryText',
    },
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
      backgroundColor: 'primaryCard',
    },
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: 'shadow',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    }
  }
});

export type Theme = typeof theme;
export default theme;