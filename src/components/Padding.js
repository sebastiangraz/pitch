export const Padding = ({ children, ...rest }) => {
  return (
    <div {...rest} style={{ padding: "6.5em" }}>
      {children}
    </div>
  );
};
