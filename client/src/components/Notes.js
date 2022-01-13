/** @jsxImportSource theme-ui */
import { Text, Button, Box } from "theme-ui";
import React from "react";
import { Padding } from "./Padding";
import io from "socket.io-client";
import { slides } from "./App";
const socket = io("https://brandserver.herokuapp.com/", {
  transports: ["websocket"],
});

// Local

// const socket = io("ws://localhost:8080", {
//   transports: ["websocket"],
// });

const buttonStyle = {
  fontSize: "20px",
};

const Notes = () => {
  const [note, getNote] = React.useState(slides[0].notes);
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
        mb={7}
        sx={{
          gridTemplateColumns: "auto auto auto",
          alignItems: "center",
          gap: 4,
          display: "inline-grid",
        }}
      >
        <Button
          disabled={page === 0 ? true : false}
          sx={buttonStyle}
          onClick={previous}
        >
          Prev
        </Button>
        <Text
          m={0}
          sx={{ ...buttonStyle, color: "brand", width: 3, textAlign: "center" }}
        >
          {" "}
          {page}
        </Text>
        <Button sx={buttonStyle} onClick={next}>
          Next
        </Button>
      </Box>

      <ul
        sx={{
          pl: 4,
          ml: [4, 0],
          "& li::marker": { content: `" · "` },
        }}
      >
        <Text
          sx={{
            fontSize: ["28px", 6],
            color: "brand",
          }}
        >
          {note.split("·").map((e) => {
            return <li key={e}>{e}</li>;
          })}
        </Text>
      </ul>
    </Padding>
  );
};

export default Notes;
