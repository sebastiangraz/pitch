export const Padding = ({ children, constrain, ...rest }) => {
  return (
    <div
      {...rest}
      style={{ padding: "6.5em", maxWidth: constrain ? "90em" : "none" }}
    >
      {children}
    </div>
  );
};
