import { createTheme } from '@shopify/restyle';

export const palette = {
  blue: "#01BAEF",
  yellow: "#FED90F",
  red: "#FF1053",

  black: '#040F16',
  grey: '#81878A',
  white: '#FBFBFF',
};
const fonts = {
  bold: "ChakraPetch_700Bold",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    primaryText: palette.white,
    createButton: palette.black,
    darkShadow: palette.black,
    brightShadow: palette.grey,
    emoji: palette.yellow,
    primaryCard: palette.blue,
    secondaryCard: palette.yellow,
    tertiaryCard: palette.red,
  },
  spacing: {
    xs: 4,
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
    defaults: {
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "brightShadow",
      shadowOpacity: 1,
      shadowOffset: { width: 3, height: 3 },
      elevation: 5,
      flex: 1,
      height: 50,
      margin: "s",
    },
    primary: {
      backgroundColor: "buttonPrimaryBackground",
    },
    alert: {
      backgroundColor: "tertiaryCard",
    },
    search: {
      backgroundColor: "buttonPrimaryBackground",
      height: 44,
      width: 108,
      alignItems: "center",
      justifyContent: "center",
      margin: "s",
    },
  },
  textInputVariants: {
    primary: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  border: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    mainHeader: {
      fontFamily: fonts.bold,
      fontSize: 40,
      color: "whiteText",
      textShadowColor: "headerColor",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 2,
    },
    header: {
      fontFamily: fonts.bold,
      fontWeight: "bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: "primaryText",
    },
    subheader: {
      fontFamily: fonts.bold,
      fontWeight: "600",
      fontSize: 28,
      lineHeight: 36,
      color: "primaryText",
    },
    body: {
      fontFamily: fonts.bold,
      textShadowColor: 'darkShadow',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      fontSize: 20,
      lineHeight: 32,
      color: 'primaryText',
    },
  },
  cardVariants: {
    defaults: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      margin: 'xs',
      flex: 1,
      backgroundColor: 'primaryCard',
      borderColor: 'darkShadow',
      borderWidth: 3,
      shadowColor: 'brightShadow',
      shadowOpacity: 1,
      shadowOffset: { width: 3, height: 3 },
      elevation: 5,
      aspectRatio: 1,
      justifyContent: 'center',
      maxWidth: '31%',
    },
    primary: {
      backgroundColor: 'primaryCard',
    },
    secondary: {
      backgroundColor: 'secondaryCard',
    },
    tertiary: {
      backgroundColor: 'tertiaryCard',
    },
  },
});

export type Theme = typeof theme;
export default theme;
