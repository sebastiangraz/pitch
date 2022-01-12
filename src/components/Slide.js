/** @jsxImportSource theme-ui */

import React from "react";
import theme from "../theme";

import {
  useSpring,
  transform,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";

import { tint } from "@theme-ui/color";
import { useResponsiveValue } from "@theme-ui/match-media";
import { Text } from "theme-ui";
import { Padding } from "./Padding";
import { settings } from "../settings";
import io from "socket.io-client";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

export const useCaseWrapperContext = () => React.useContext(CaseWrapperContext);
const CaseWrapperContext = React.createContext(null);

const Slide = React.memo(
  ({ index, childPosition, childCount, activeSlide, children }) => {
    const position = React.useMemo(
      () => childPosition[index] || [],
      [childPosition, index]
    );

    const positionN = childPosition[index + 1] || [];
    const { scrollY } = useViewportScroll();
    const [progress, setProgress] = React.useState(false);
    const { innerWidth, innerHeight } = window;
    const stagger = useResponsiveValue([8, 12, 16, 20]);

    const updatePos = (v) => {
      return transform(
        v - position + innerHeight * 2,
        [0, innerHeight],
        [
          0,
          settings.horizontal
            ? -innerWidth + index * stagger + 5
            : -innerHeight + index * stagger + 5,
        ]
      );
    };

    React.useEffect(() => {
      const unsubscribeProgress = scrollY.onChange((value) => {
        const calc = (multi) => {
          return transform(
            multi
              ? value - position + innerHeight * 2
              : value - position + innerHeight,
            [0, innerHeight],
            [0, 1]
          );
        };

        setProgress(calc(false) > 0.99 ? true : false);
      });

      return () => {
        unsubscribeProgress();
      };
    }, [innerHeight, position, scrollY]);

    const updateBg = (v) => {
      return transform(
        v - positionN + innerHeight * 2,
        [0, innerHeight],
        [
          tint("brand", 0.7 + index * (30 / childCount) * 0.01)(theme),
          tint("brand", 0.1 + index * (90 / childCount) * 0.01)(theme),
        ]
      );
    };

    const updateScale = (v) => {
      return transform(
        v - positionN + innerHeight * 2,
        [0, innerHeight],
        [1, 0.98]
      );
    };

    const scale = useTransform(scrollY, (v) => updateScale(v), {
      damping: 12,
      mass: 0.1,
    });

    const bg = useTransform(scrollY, (v) => updateBg(v), {
      damping: 12,
      mass: 0.1,
    });

    const y = useSpring(
      useTransform(scrollY, (v) => updatePos(v)),
      {
        damping: 12,
        mass: 0.1,
      }
    );

    const scrollTo = () => {
      window.scrollTo(0, position - innerHeight);
    };

    React.useLayoutEffect(() => {
      activeSlide && socket.emit("message", children.props.notes);
      activeSlide && localStorage.setItem("note", children.props.notes);
    }, [children.props.notes, activeSlide]);

    return (
      <CaseWrapperContext.Provider
        value={{ parentValues: { position: position } }}
      >
        <motion.div
          viewport={{ once: false }}
          onClick={scrollTo}
          style={{
            zIndex: index,
            position: "fixed",
            borderRadius: "32px",
            overflow: "hidden",
            display: "flex",
            alignItems: "start",
            backgroundColor: bg,
            ...(settings.horizontal
              ? {
                  width: `calc(100vw - ${index * stagger + 10}px)`,
                  height: `calc(100vh - 10px)`,
                  x: y,
                  left: "100vw",
                  top: "5px",
                }
              : {
                  width: "calc(100vw - 10px)",
                  height: `calc(100vh - ${index * stagger + 10}px)`,
                  y: y,
                  left: "5px",
                  top: "100vh",
                }),
          }}
        >
          <motion.div
            className="slideContent"
            style={{
              scale,
              visibility: progress ? "hidden" : "visible",
              transformOrigin: "left",
              height: "56.25em",
              width: "100%",
              position: "relative",
            }}
          >
            {index !== 0 && (
              <div
                sx={{
                  top: `calc(100vh - 14em - ${
                    settings.horizontal ? 0 : index * stagger + 10
                  }px)`,
                  width: "100%",
                  height: "14em",
                  position: "absolute",
                }}
              >
                <Padding
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text sx={{ fontSize: 2 }}>0{index}</Text>
                  <Text sx={{ fontSize: 2, mr: "0.5em" }}>
                    Brand Design · 2022
                  </Text>
                </Padding>
              </div>
            )}

            {children}
          </motion.div>
        </motion.div>
      </CaseWrapperContext.Provider>
    );
  }
);
export default Slide;
