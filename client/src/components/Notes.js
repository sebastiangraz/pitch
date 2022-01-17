/** @jsxImportSource theme-ui */
import { Text, Button, Box, useColorMode } from "theme-ui";
import React from "react";
import { Padding } from "./Padding";
import { Timer } from "./Timer";
import io from "socket.io-client";
import { slides } from "./App";
import { settings } from "../settings";
import { shade } from "@theme-ui/color";
import { vectors } from "../assets/vectors";

const socket = io(
  settings.isLocal
    ? "ws://localhost:8080"
    : "https://brandserver.herokuapp.com",
  {
    transports: ["websocket"],
  }
);

export const buttonStyle = (colorMode) => {
  return {
    fontSize: "20px",
    bg: colorMode === "default" ? shade("bg", 0.2) : shade("bg", 0.7),
  };
};

const Notes = () => {
  const [colorMode, setColorMode] = useColorMode();
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

  const handleModeChange = () => {
    setColorMode(colorMode === "default" ? "dark" : "default");
    socket.emit("mode", colorMode);
  };

  return (
    <Padding
      sx={{
        background:
          colorMode === "default" ? shade("bg", 0.1) : shade("bg", 0.6),
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
              color: "text",
            }}
          >
            {note.split("·").map((e) => {
              return <li key={e}>{e}</li>;
            })}
          </Text>
        </ul>
        <Button
          mb={4}
          sx={{
            ...buttonStyle(colorMode),
            padding: 1,
            justifySelf: "flex-start",
          }}
          onClick={handleModeChange}
        >
          {colorMode === "default" ? vectors.moon : vectors.sun}
        </Button>
        <Timer colorMode={colorMode} />
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
            sx={buttonStyle(colorMode)}
            onClick={previous}
          >
            Prev
          </Button>
          <Text
            m={0}
            sx={{
              fontSize: "20px",
              color: "text",
              width: 4,
              textAlign: "center",
            }}
          >
            {" "}
            {page}
          </Text>
          <Button sx={buttonStyle(colorMode)} onClick={next}>
            Next
          </Button>
        </Box>
      </Box>
    </Padding>
  );
};

export default Notes;
