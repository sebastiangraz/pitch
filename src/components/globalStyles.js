/** @jsxImportSource theme-ui */
import theme from "../theme";
import { saturate } from "@theme-ui/color";

export const globalStyle = {
  textRevealAnimation: {
    effect: [
      { color: saturate("brand", 0.7)(theme), opacity: 0, y: -6 },
      { color: "var(--theme-ui-colors-text)", opacity: 1, y: 0 },
    ],
    duration: 2,
  },
};
