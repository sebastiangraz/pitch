export const Padding = ({ children, constrain, ...rest }) => {
  return (
    <div
      {...rest}
      style={{ padding: "6.5em", maxWidth: constrain ? "94em" : "none" }}
    >
      {children}
    </div>
  );
};
