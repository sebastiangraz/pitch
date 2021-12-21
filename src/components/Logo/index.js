/** @jsxImportSource theme-ui */

import { m } from "framer-motion";

export const Logo = ({ weight, ...rest }) => {
  return (
    <m.div {...rest} sx={{ display: "inline-flex", position: "relative" }}>
      <h1
        className="logo"
        sx={{
          // hax iOS14 clips variable fonts
          minWidth: 100,
          // endhax
          fontVariationSettings: `"wght" ${weight ? weight : 60}`,
          display: "inline-block",
          fontFamily: "G",
          fontSize: "16em",
          lineHeight: 0.5,
          userSelect: "none",
          textRendering: "optimizeLegibility",
          fontWeight: "normal",
          margin: 0,
        }}
      >
        G
      </h1>
    </m.div>
  );
};
