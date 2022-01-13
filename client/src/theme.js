import { settings } from "./settings";
import { tint } from "@theme-ui/color";

const isSafari =
  navigator.userAgent.indexOf("Safari") !== -1 &&
  navigator.userAgent.indexOf("Chrome") === -1;

const colors = {
  text: "#000000",
  brand: settings.tint,
};

export const chromeColors = {
  chrome: {
    dark: "#35363A",
    light: "#ffffff",
  },
  safari: {
    dark: "#2C2B2A",
    light: colors.brand,
  },
};

const space = [
  "0em",
  "0.2em",
  "1em",
  "1.6em",
  "2em",
  "4em",
  "5.5em",
  "8em",
  "10em",
  "12em",
];

export const scroll = {
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "brand",
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    cursor: "pointer",
    backgroundColor: tint("brand", 0.3),
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  space: space,
  sizes: space,
  fonts: {
    body: 'Styrene, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  breakpoints: ["40em", "64em", "98em", "120em"],
  lineHeights: {
    body: 1.4,
    heading: 1.1,
  },
  letterSpacings: {
    body: "-0.045em",
    heading: "-0.088em",
  },
  grids: {
    vertical: {},
  },
  buttons: {
    primary: {
      transition: "background 0.4s ease",
      bg: "brand",
      color: "text",
      fontSize: 4,
      px: 2,
      py: 1,
      cursor: "pointer",
      borderRadius: "99em",
      "&:hover": {
        bg: tint("brand", -0.3),
      },
    },
  },
  fontSizes: space,
  colors: colors,
  text: {
    default: {
      fontSize: 3,
      fontWeight: 400,
      fontFamily: "body",
      lineHeight: "body",
      letterSpacing: "body",
      display: "block",
      mb: 3,
    },
    lead: {
      variant: "text.default",
      lineHeight: "body",
      letterSpacing: "body",
      fontSize: 4,
      mb: 0,
    },
    heading: {
      variant: "text.default",
      lineHeight: "heading",
      letterSpacing: "heading",
      fontSize: 6,
      mb: 0,
    },
  },
  styles: {
    root: {
      ...scroll,
      overflowY: "auto",
      overflowX: "hidden",
      webkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      fontFeatureSettings: `"liga", "dlig"`,
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: isSafari
          ? chromeColors.safari.dark
          : chromeColors.chrome?.dark,
      },
      "@media (prefers-color-scheme: light)": {
        backgroundColor: isSafari
          ? chromeColors.safari.light
          : chromeColors.chrome?.light,
      },
    },
    a: { color: "inherit", "&:hover": { textDecoration: "none" } },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
};
