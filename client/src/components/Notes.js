/** @jsxImportSource theme-ui */
import { Text, Button, Box, useColorMode, Flex } from "theme-ui";
import React from "react";

import { Timer } from "./Timer";
import io from "socket.io-client";
import { slides } from "./App";
import { settings } from "../settings";
import { scroll } from "../theme";
import { shade, transparentize } from "@theme-ui/color";
import { vectors } from "../assets/vectors";
import { Logo } from "./Logo";

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
    bg: colorMode === "light" ? shade("bg", 0.2) : shade("bg", 0.7),
  };
};

const Notes = () => {
  const [colorMode, setColorMode] = useColorMode("light");
  const [note, getNote] = React.useState(slides[0].notes);
  const [page, getPage] = React.useState(0);
  const [room, setRoom] = React.useState("");
  const [counter, setCounter] = React.useState(0);

  let pageStore = page;

  const next = () => {
    setCounter(pageStore + 1);
  };

  const previous = () => {
    setCounter(pageStore - 1);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // React.useEffect(() => {
  //   socket.emit("join_room", (room) => {
  //     console.log("useEff room", room);
  //     setRoomNumber(room);
  //   });
  // }, []);

  React.useEffect(() => {
    socket.emit("slide", { direction: counter, room });
  }, [counter, room]);

  React.useEffect(() => {
    socket.on("emit", (v) => {
      getNote(v.note);
      getPage(v.pagenr);
    });
  }, []);

  const home = () => {
    setCounter(0);
    socket.emit("home", 0);
  };

  const handleModeChange = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
    socket.emit("mode", colorMode);
  };

  return (
    <Box
      sx={{
        borderRadius: "30px",
        m: "5px",

        background: colorMode === "light" ? shade("bg", 0.1) : shade("bg", 0.6),
        height: "calc(100% - 10px)",
        width: "calc(100vw - 10px)",
        overflow: "auto",
        position: "absolute",
        ...scroll,
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ul
          sx={{
            height: "100%",
            m: 0,
            p: 0,
            position: "relative",
            listStyle: "none",
            "li::before": {
              content: `" · "`,
              position: "absolute",
              marginLeft: "-14px",
            },
          }}
        >
          <Text
            m={0}
            sx={{
              p: "32px",
              fontSize: ["22px"],
              color: "text",
            }}
          >
            {note.split("·").map((e, i) => {
              return (
                <li
                  sx={{
                    mb: 1,
                    color: i % 2 ? transparentize("text", 0.5) : "text",
                  }}
                  key={e}
                >
                  {e}
                </li>
              );
            })}
          </Text>
        </ul>
        <Box
          sx={{
            position: "sticky",
            bottom: "0px",
            p: "32px",
            background:
              colorMode === "light" ? shade("bg", 0.1) : shade("bg", 0.6),
          }}
        >
          <Flex sx={{ flexWrap: "wrap", gap: "1rem" }}>
            <Button
              sx={{
                ...buttonStyle(colorMode),
                padding: 1,
                justifySelf: "flex-start",
                svg: {
                  width: 2,
                },
              }}
              onClick={handleModeChange}
            >
              {colorMode === "light" ? vectors.moon : vectors.sun}
            </Button>
            <Timer colorMode={colorMode} />
            <span
              sx={{
                ...buttonStyle(colorMode),
                display: "flex",
                alignItems: "center",
                borderRadius: "99em",
                padding: "0em 1em",
                minHeight: "40px",
              }}
            >
              <input
                sx={{ all: "unset", width: "100%" }}
                placeholder="Room"
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <span onClick={joinRoom}>Join</span>
            </span>
          </Flex>
          <Box
            mt={"16px"}
            sx={{
              width: "100%",
              gridTemplateColumns: "auto 1fr auto 1fr",
              alignItems: "center",
              gap: 4,
              display: "inline-grid",
            }}
          >
            <Button
              sx={{
                ...buttonStyle(colorMode),
                padding: 1,
                justifySelf: "flex-start",
                svg: {
                  width: 2,
                },
              }}
              onClick={home}
            >
              <Logo
                component={
                  <h1
                    className="logo"
                    sx={{
                      // hax iOS14 clips variable fonts
                      minWidth: 1,
                      // endhax
                      display: "inline-block",
                      fontFamily: "G",
                      fontVariationSettings: `"wght" 45`,
                      fontSize: "3em",
                      textAlign: "center",
                      lineHeight: 1,
                      userSelect: "none",
                      textRendering: "optimizeLegibility",
                      fontWeight: "normal",
                      margin: 0,
                      letterSpacing: 0,
                    }}
                  >
                    G
                  </h1>
                }
              />
            </Button>

            <Button
              disabled={page <= 0 ? true : false}
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
              {page}
            </Text>
            <Button sx={buttonStyle(colorMode)} onClick={next}>
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Notes;
