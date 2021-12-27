/** @jsxImportSource theme-ui */

import { m } from "framer-motion";

export const Logo = ({ component, weight, children, ...rest }) => {
  return (
    <m.div {...rest} sx={{ display: "inline-flex", position: "relative" }}>
      {component ? component : children}
    </m.div>
  );
};
