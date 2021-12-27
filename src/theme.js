const colors = {
  text: "#111",
  brand: `hsl(144, 6%, 50%)`,
};
const space = [
  "0em",
  "0.2em",
  "1em",
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
    backgroundColor: `text`,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    cursor: "pointer",
    backgroundColor: `text`,
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
    heading: 1.15,
  },
  letterSpacings: {
    body: "-0.045em",
    heading: "-0.088em",
  },
  grids: {
    vertical: {},
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
      mb: 2,
    },

    heading: {
      variant: "text.default",
      lineHeight: "heading",
      letterSpacing: "heading",
      fontSize: 5,
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
      variant: "text.default",
      // fontFeatureSettings: `"liga", "dlig"`,
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
