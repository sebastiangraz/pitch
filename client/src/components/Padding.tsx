/** @jsxImportSource theme-ui */
import { ThemeUIStyleObject } from "theme-ui";

interface PaddingProps {
  children: React.ReactNode;
  constrain?: boolean;
  sx?: ThemeUIStyleObject;
  rest?: any;
}

export const Padding = ({ children, constrain, sx, ...rest }: PaddingProps) => {
  return (
    <div
      {...rest}
      sx={{ padding: "6.5em", maxWidth: constrain ? "90em" : "none", ...sx }}
    >
      {children}
    </div>
  );
};
