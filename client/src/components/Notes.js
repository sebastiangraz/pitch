/** @jsxImportSource theme-ui */
import { Text, Button, Box, useColorMode } from "theme-ui";
import React from "react";
import { Padding } from "./Padding";
import { Timer } from "./Timer";
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
  const [mode, setMode] = useColorMode();

  const [note, getNote] = React.useState(slides[0].notes);
  const [page, getPage] = React.useState(0);

  React.useEffect(() => {
    socket.on("emit", (v) => {
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
    <Padding
      sx={{
        height: "100%",
        overflow: "auto",
        width: "100%",
        position: "absolute",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "grid",
          alignContent: "space-between",
          alignItems: "flex-end",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <ul
          sx={{
            mb: 7,
            pl: 4,
            ml: [4, 0],
            "& li::marker": { content: `" · "` },
          }}
        >
          <Text
            m={0}
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
        <Button
          mb={4}
          sx={{ ...buttonStyle, justifySelf: "flex-start" }}
          onClick={(e) => {
            const next = mode === "dark" ? "light" : "dark";
            setMode(next);
          }}
        >
          Mode
        </Button>
        <Timer />
        <Box
          mt={7}
          sx={{
            pb: 4,
            gridTemplateColumns: "1fr auto 1fr",
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
            sx={{
              ...buttonStyle,
              color: "brand",
              width: 4,
              textAlign: "center",
            }}
          >
            {" "}
            {page}
          </Text>
          <Button sx={buttonStyle} onClick={next}>
            Next
          </Button>
        </Box>
      </Box>
    </Padding>
  );
};

export default Notes;
