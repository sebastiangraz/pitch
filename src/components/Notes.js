/** @jsxImportSource theme-ui */

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
      <h1>{note}</h1>
    </Padding>
  );
};

export default Notes;
