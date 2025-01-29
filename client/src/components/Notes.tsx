/** @jsxImportSource theme-ui */
import { Text, Button, Box, useColorMode, Flex } from "theme-ui";
import React from "react";
import { Timer } from "@/components/Timer";
import { slides } from "@/components/App";
import { scroll } from "@/theme";
import { shade } from "@theme-ui/color";
import { vectors } from "@/assets/vectors";
import { Logo } from "@/components/Logo";
import { useAppWrapperContext } from "@/components/App";
import { useSocket } from "@/socket";

export const buttonStyle = (colorMode: "light" | "dark") => {
  return {
    fontSize: "20px",
    bg: colorMode === "light" ? shade("bg", 0.2) : shade("bg", 0.7),
  };
};

const Notes = () => {
  // Get room from context
  const {
    data: { room: contextRoom },
    updateUrl,
  } = useAppWrapperContext();

  // Helper function to get room from context
  const getUrlRoom = React.useCallback(() => {
    return contextRoom || "";
  }, [contextRoom]);

  const [colorMode, setColorMode] = useColorMode<"light" | "dark">();
  const [note, setNote] = React.useState(slides[0].notes);
  const [page, setPage] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [isConnected, setIsConnected] = React.useState(false);
  const [room, setRoom] = React.useState(contextRoom || "");

  // Update notes when counter changes
  React.useEffect(() => {
    setNote(slides[counter].notes);
  }, [counter]);

  // Sync room with context when it changes
  React.useEffect(() => {
    if (contextRoom) {
      setRoom(contextRoom);
    }
  }, [contextRoom]);

  // Use refs to track the latest state values for socket callbacks
  const roomRef = React.useRef(room);
  const isConnectedRef = React.useRef(isConnected);
  const counterRef = React.useRef(counter);
  const colorModeRef = React.useRef(colorMode);

  // Update refs when states change
  React.useEffect(() => {
    roomRef.current = room;
    isConnectedRef.current = isConnected;
    counterRef.current = counter;
    colorModeRef.current = colorMode;
  }, [room, isConnected, counter, colorMode]);

  // Add state to track which room is controlling the index page
  const [controllingRoom, setControllingRoom] = React.useState<string | null>(
    null
  );

  // Update room control when context room changes
  React.useEffect(() => {
    const urlRoom = getUrlRoom();
    if (room && room === urlRoom) {
      setControllingRoom(room);
    }
  }, [room, getUrlRoom]);

  // Add state to track the active homepage room
  const [activeHomepageRoom, setActiveHomepageRoom] = React.useState<
    string | null
  >(null);

  // Use the socket context
  const {
    socket,
    joinRoom: socketJoinRoom,
    emitSlideChange,
    emitModeChange,
    emitHome,
    emitMessage,
    availableRooms,
  } = useSocket();

  // Update the socket event handlers
  React.useEffect(() => {
    const handleEmit = (v: { note: string; pagenr: number }) => {
      setNote(v.note);
      setPage(v.pagenr);
      setCounter(v.pagenr);
    };

    const handleUpdateSlide = (data: { direction: number }) => {
      setCounter(data.direction);
      setNote(slides[data.direction].notes);
    };

    const handleUpdateMode = (data: { mode: string }) => {
      setColorMode(data.mode === "light" ? "dark" : "light");
    };

    const handleRoomRemoved = (removedRoom: string) => {
      if (roomRef.current === removedRoom) {
        setRoom("");
        setIsConnected(false);
      }
    };

    const handleActiveHomepageRoom = (activeRoom: string | null) => {
      setActiveHomepageRoom(activeRoom);
    };

    // Register all event handlers
    socket.on("emit", handleEmit);
    socket.on("updateSlide", handleUpdateSlide);
    socket.on("updateMode", handleUpdateMode);
    socket.on("room_removed", handleRoomRemoved);
    socket.on("active_homepage_room", handleActiveHomepageRoom);

    // Cleanup
    return () => {
      socket.off("emit", handleEmit);
      socket.off("updateSlide", handleUpdateSlide);
      socket.off("updateMode", handleUpdateMode);
      socket.off("room_removed", handleRoomRemoved);
      socket.off("active_homepage_room", handleActiveHomepageRoom);
      setIsConnected(false);
    };
  }, [socket, setColorMode]);

  const joinRoom = React.useCallback(
    (roomName: string = room) => {
      if (roomName !== "" && availableRooms.includes(roomName)) {
        socketJoinRoom(roomName);
        setRoom(roomName);
        setIsConnected(true);

        // Update URL when joining a room
        if (updateUrl) {
          updateUrl(roomName);
        }

        const urlRoom = getUrlRoom();
        if (roomName === urlRoom) {
          setControllingRoom(roomName);
        }
      }
    },
    [availableRooms, room, socketJoinRoom, getUrlRoom, updateUrl]
  );

  // Update isControlEnabled to use activeHomepageRoom
  const isControlEnabled = React.useMemo(() => {
    const enabled = room === activeHomepageRoom && isConnected;
    return enabled;
  }, [room, activeHomepageRoom, isConnected]);

  // Add constant for total slides
  const TOTAL_SLIDES = slides.length;

  // Update the control functions
  const next = React.useCallback(() => {
    if (isConnectedRef.current && roomRef.current === activeHomepageRoom) {
      const newCounter =
        counterRef.current >= TOTAL_SLIDES - 1
          ? 0 // Loop back to first slide
          : counterRef.current + 1;
      setCounter(newCounter);
      emitSlideChange({ direction: newCounter, room: roomRef.current });
    }
  }, [emitSlideChange, activeHomepageRoom]);

  const previous = React.useCallback(() => {
    if (isConnectedRef.current && roomRef.current === activeHomepageRoom) {
      const newCounter =
        counterRef.current <= 0
          ? TOTAL_SLIDES - 1 // Loop to last slide
          : counterRef.current - 1;
      setCounter(newCounter);
      emitSlideChange({ direction: newCounter, room: roomRef.current });
    }
  }, [emitSlideChange, activeHomepageRoom]);

  const home = React.useCallback(() => {
    const urlRoom = getUrlRoom();
    if (isConnectedRef.current && roomRef.current === urlRoom) {
      setCounter(0);
      emitHome({ room: roomRef.current });
    }
  }, [emitHome, getUrlRoom]);

  const handleModeChange = React.useCallback(() => {
    const urlRoom = getUrlRoom();
    if (isConnectedRef.current && roomRef.current === urlRoom) {
      const newMode = colorModeRef.current === "light" ? "dark" : "light";
      setColorMode(newMode);
      emitModeChange({
        mode: colorModeRef.current,
        room: roomRef.current,
      });
    }
  }, [setColorMode, emitModeChange, getUrlRoom]);

  // Update the room list rendering to show green border only for active homepage room
  const renderRoomList = () => (
    <Box mt={3}>
      <Flex sx={{ gap: 2, flexWrap: "wrap" }}>
        {availableRooms.map((roomName) => (
          <Button
            key={roomName}
            sx={{
              ...buttonStyle(colorMode),
              display: "flex",
              alignItems: "center",
              gap: 2,
              opacity: room === roomName ? 0.7 : 1,
              border: room === roomName ? "2px solid #ff0000" : "none",
              position: "relative",
              "&::after":
                roomName === activeHomepageRoom
                  ? {
                      content: '""',
                      position: "absolute",
                      top: -1,
                      right: -1,
                      bottom: -1,
                      left: -1,
                      border: "2px solid #00ff00",
                      borderRadius: "inherit",
                      pointerEvents: "none",
                    }
                  : undefined,
            }}
            onClick={() => joinRoom(roomName)}
          >
            {roomName}
            <span
              sx={{
                cursor: "pointer",
                ml: 2,
                "&:hover": { opacity: 0.7 },
              }}
              onClick={(e) => {
                e.stopPropagation();
                socket.emit("remove_room", roomName);
              }}
            >
              ×
            </span>
          </Button>
        ))}
      </Flex>
    </Box>
  );

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
                    color:
                      i % 2
                        ? "text"
                        : "color-mix(in srgb, var(--theme-ui-colors-text), transparent 50%)",
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
                opacity: isControlEnabled ? 1 : 0.5,
                cursor: isControlEnabled ? "pointer" : "not-allowed",
              }}
              onClick={handleModeChange}
              disabled={!isControlEnabled}
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
                value={room}
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <span onClick={() => joinRoom()}>Join</span>
            </span>
          </Flex>

          {/* Room List */}
          {renderRoomList()}

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
                opacity: isControlEnabled ? 1 : 0.5,
                cursor: isControlEnabled ? "pointer" : "not-allowed",
              }}
              onClick={home}
              disabled={!isControlEnabled}
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
              sx={{
                ...buttonStyle(colorMode),
                opacity: !isControlEnabled ? 0.5 : 1,
                cursor: !isControlEnabled ? "not-allowed" : "pointer",
              }}
              onClick={previous}
              disabled={!isControlEnabled}
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
              {counter}
            </Text>
            <Button
              sx={{
                ...buttonStyle(colorMode),
                opacity: !isControlEnabled ? 0.5 : 1,
                cursor: !isControlEnabled ? "not-allowed" : "pointer",
              }}
              onClick={next}
              disabled={!isControlEnabled}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Notes;
