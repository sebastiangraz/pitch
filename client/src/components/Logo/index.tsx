/** @jsxImportSource theme-ui */

import { m } from "framer-motion";

interface LogoProps {
  component?: React.ReactNode;
  weight?: number;
  children?: React.ReactNode;
  rest?: any;
}

export const Logo = ({ component, weight, children, ...rest }: LogoProps) => {
  return (
    <m.div {...rest} sx={{ display: "inline-flex", position: "relative" }}>
      {component ? component : children}
    </m.div>
  );
};
