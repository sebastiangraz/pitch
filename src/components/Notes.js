/** @jsxImportSource theme-ui */
import { Text } from "@theme-ui/components";
import React from "react";
import { Padding } from "./Padding";

const Notes = () => {
  const [note, getNote] = React.useState();

  React.useEffect(() => {
    getNote(localStorage.getItem("note"));
  }, []);

  React.useEffect(() => {
    window.addEventListener("storage", (e) => {
      getNote(e.newValue);
    });
  }, [note]);
  return (
    <Padding>
      <Text sx={{ color: "brand" }} variant="heading">
        {note}
      </Text>
    </Padding>
  );
};

export default Notes;
