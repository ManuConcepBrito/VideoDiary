import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#000000',
  white: '#F0F2F3',
  shadow: "#81878A"
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimaryBackground: palette.black,
    whiteText: palette.white,
    brightShadow: palette.shadow
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
  buttonVariants: {
    primary: {
      backgroundColor: "buttonPrimaryBackground",
      height: 54,
      width: 245,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'brightShadow',
      shadowOpacity: 1,
      shadowOffset: { width: 3, height: 3 },
      elevation: 5,
    },
  },
  border: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: "ChakraPetch_700Bold",
      fontSize: 40
    },
    buttonPrimary: {
      fontFamily: "ChakraPetch_700Bold",
      fontSize: 20,
      color: "whiteText"
    }
  }
});

export type Theme = typeof theme;
export default theme;