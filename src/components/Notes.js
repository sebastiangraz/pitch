/** @jsxImportSource theme-ui */
import { Text } from "@theme-ui/components";
import React from "react";
import { Padding } from "./Padding";
import io from "socket.io-client";

const socket = io("ws://localhost:8080");

const Notes = () => {
  const [note, getNote] = React.useState("test");

  React.useEffect(() => {
    socket.on("emit", (v) => {
      getNote(v);
    });
  }, []);

  return (
    <Padding>
      <Text sx={{ color: "brand" }} variant="heading">
        {note}
      </Text>
    </Padding>
  );
};

export default Notes;
