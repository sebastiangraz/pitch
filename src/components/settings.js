/** @jsxImportSource theme-ui */

export const settings = {
  horizontal: true,
};

export const defaultProps = {
  textRevealAnimation: {
    effect: [
      { color: "var(--theme-ui-colors-brand)", opacity: 0 },
      { color: "var(--theme-ui-colors-text)", opacity: 1 },
    ],
    delay: 0.5,
  },
};
