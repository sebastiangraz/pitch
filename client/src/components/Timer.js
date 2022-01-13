/** @jsxImportSource theme-ui */

import React, { useState } from "react";
import { Text, Button, Flex, Box } from "theme-ui";
import useToggle from "./hooks";
import { motion, AnimatePresence } from "framer-motion";

const buttonStyle = {
  background: "transparent",
  color: "brand",
  fontSize: "20px",
  "&:hover": {
    color: "text",
  },
};

export const Timer = () => {
  const [time, setTime] = useState(0);
  const [isOn, toggleIsOn] = useToggle();

  React.useEffect(() => {
    let interval = null;

    if (isOn === true) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isOn]);

  const handleReset = () => {
    if (isOn) {
      toggleIsOn(false);
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
          //   span: {
          //     color: "brand",
          //     ml: 1,
          //     mb: 0,
          //     display: "flex",
          //     alignItems: "center",
          //   },
        }}
      >
        <Button onClick={toggleIsOn} sx={{ ...buttonStyle, mr: 1 }}>
          <Text m={0}>
            <Box
              sx={{
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
              <span sx={{ width: "50px" }}>
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
              </span>
              <div sx={{ position: "relative", top: "-3px", mr: 1 }}>:</div>
              <span sx={{ width: "50px" }}>
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
              </span>
              <span
                sx={{
                  overflow: "hidden",
                  transition: "ease 1s opacity, ease 1s width",
                  width: time < 1000 ? "60px" : "0px",
                  opacity: time < 1000 ? 0.5 : 0,
                }}
              >
                <div
                  sx={{
                    position: "relative",
                    top: "-3px",
                    mr: 1,
                    display: "inline",
                  }}
                >
                  :
                </div>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
              </span>
            </Box>
          </Text>
        </Button>
        <Button sx={buttonStyle} onClick={handleReset}>
          Reset
        </Button>
      </Flex>
    </>
  );
};
