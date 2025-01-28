/** @jsxImportSource theme-ui */

import React, { useState } from "react";
import { Button, Flex, Box } from "theme-ui";
import useToggle from "./hooks";
import { buttonStyle } from "./Notes";

export const Timer = ({ colorMode }: { colorMode: "light" | "dark" }) => {
  const [time, setTime] = useState(0);
  const [isOn, toggleIsOn] = useToggle();

  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isOn === true) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOn]);

  const handleReset = () => {
    if (isOn) {
      toggleIsOn();
      setTime(0);
    } else {
      setTime(0);
    }
  };

  return (
    <>
      <Flex
        sx={{
          justifyItems: "center",
        }}
      >
        <Button sx={{ ...buttonStyle(colorMode), mr: 1 }}>
          <Box
            mr={2}
            onClick={toggleIsOn}
            sx={{
              fontVariantNumeric: "tabular-nums",
              alignItems: "flex-start",
              gap: 0,
              display: "grid",
              gridAutoFlow: "column",
              span: {
                textAlign: "left",
                m: 0,
              },
            }}
          >
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
            <div sx={{ position: "relative", top: "-2px" }}>:</div>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            <span
              sx={{
                overflow: "hidden",
                transition: "ease 1s opacity, ease 1s width",
                width: time < 1000 ? "32px" : "0px",
                opacity: time < 1000 ? 0.5 : 0,
              }}
            >
              <div
                sx={{
                  top: "-2px",
                  position: "relative",
                  display: "inline",
                }}
              >
                :
              </div>
              <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </span>
          </Box>

          <span sx={buttonStyle(colorMode)} onClick={handleReset}>
            Reset
          </span>
        </Button>
      </Flex>
    </>
  );
};
