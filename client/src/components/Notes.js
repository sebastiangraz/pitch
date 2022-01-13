/** @jsxImportSource theme-ui */
import { Text, Button, Box } from "theme-ui";
import React from "react";
import { Padding } from "./Padding";
import io from "socket.io-client";

const socket = io("https://brandserver.herokuapp.com/", {
  transports: ["websocket"],
});

// Local

// const socket = io("ws://localhost:8080", {
//   transports: ["websocket"],
// });

const Notes = () => {
  const [note, getNote] = React.useState("");
  const [page, getPage] = React.useState(0);

  React.useEffect(() => {
    socket.on("emit", (v) => {
      console.log(v);
      getNote(v.note);
      getPage(v.pagenr);
    });
  }, []);

  const next = () => {
    return socket.emit("slide", { direction: true });
  };

  const previous = () => {
    return socket.emit("slide", { direction: false });
  };
  return (
    <Padding>
      <Box
        mb={5}
        sx={{
          gridTemplateColumns: "auto auto auto",
          alignItems: "center",
          gap: 4,
          display: "inline-grid",
        }}
      >
        <Button onClick={previous}>Prev</Button>
        <Text m={0} sx={{ color: "brand", width: 3, textAlign: "center" }}>
          {" "}
          {page}
        </Text>
        <Button onClick={next}>Next</Button>
      </Box>

      <ul
        sx={{
          p: 0,
          listStylePosition: "inside",
          "& li::marker": { content: `" · "` },
        }}
      >
        <Text sx={{ color: "brand" }} variant="heading">
          {note.split("·").map((e) => {
            return <li key={e}>{e}</li>;
          })}
        </Text>
      </ul>
    </Padding>
  );
};

export default Notes;
