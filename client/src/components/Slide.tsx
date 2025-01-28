/** @jsxImportSource theme-ui */

import React from "react";
import theme from "@/theme";

import {
  useSpring,
  transform,
  motion,
  useTransform,
  useScroll,
} from "framer-motion";

import { tint, shade } from "@theme-ui/color";
import { useResponsiveValue } from "@theme-ui/match-media";
import { Text, useThemeUI, Flex } from "theme-ui";
import { useAppWrapperContext } from "./App";
import { Padding } from "./Padding";
import { settings } from "../settings";
import io from "socket.io-client";
import { useDebounce } from "use-debounce";
import { Theme as ThemeUITheme } from "theme-ui";

const socket = io(
  settings.isLocal ? "ws://localhost:8080" : "https://pitch-f7gm.onrender.com",
  {
    transports: ["websocket"],
  }
);

export const useCaseWrapperContext = () => {
  const context = React.useContext(CaseWrapperContext);
  if (!context) throw new Error("Must be used within CaseWrapperContext");
  return context;
};

interface CaseWrapperContextType {
  parentValues: {
    position: number;
    isPrinting: boolean;
  };
}

const CaseWrapperContext = React.createContext<CaseWrapperContextType | null>(
  null
);

interface SlideProps {
  index: number;
  childPosition: number[];
  childCount: number;
  activeSlide: boolean;
  children: React.ReactElement;
}

const Slide = React.memo(
  ({ index, childPosition, childCount, activeSlide, children }: SlideProps) => {
    const position = React.useMemo<number>(
      () => childPosition[index] || 0,
      [childPosition, index]
    );
    const context = useThemeUI();
    const { data } = useAppWrapperContext();

    const positionN = childPosition[index + 1] || 0;
    const { scrollY } = useScroll();
    const [progress, setProgress] = React.useState(false);
    const [isPrinting, setIsPrinting] = React.useState(false);
    const { innerWidth, innerHeight } = window;
    const stagger = useResponsiveValue([8, 12, 16, 20]) || 0;
    const horizontal =
      useResponsiveValue([false, settings.horizontal]) || false;
    const [debouncedActiveSlide] = useDebounce(activeSlide, 500);

    const updatePos = (v: number) => {
      return transform(
        v - position + innerHeight * 2,
        [0, innerHeight],
        [
          0,
          horizontal
            ? -innerWidth + index * stagger + 5
            : -innerHeight + index * stagger + 5,
        ]
      );
    };

    React.useEffect(() => {
      const unsubscribeProgress = scrollY.on("change", (value) => {
        const calc = (multi: boolean) => {
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

    const colorModeBgValue =
      context.colorMode === "light"
        ? [
            tint(
              "bg",
              0.7 + index * (30 / childCount) * 0.01
            )(theme as ThemeUITheme),
            tint(
              "bg",
              0.1 + index * (90 / childCount) * 0.01
            )(theme as ThemeUITheme),
          ]
        : [
            shade(
              context?.theme?.rawColors?.bg,
              0.5 - index * (50 / childCount) * 0.01
            )(theme as ThemeUITheme),
            shade(
              context?.theme?.rawColors?.bg,
              0.55 - index * (45 / childCount) * 0.01
            )(theme as ThemeUITheme),
          ];

    const updateBg = (v: number) => {
      return transform(
        v - positionN + innerHeight * 2,
        [0, innerHeight],
        colorModeBgValue
      );
    };

    const updateScale = (v: number) => {
      return transform(
        v - positionN + innerHeight * 2,
        [0, innerHeight],
        [1, 0.98]
      );
    };

    const motionSettings = {
      damping: 16,
      mass: 0.5,
    };

    const scaleVal = useTransform(scrollY, (v) => updateScale(v));
    const bg = useTransform(scrollY, (v) => updateBg(v));
    const scale = useResponsiveValue([null, scaleVal]) || scaleVal;

    const y = useSpring(
      useTransform(scrollY, (v) => updatePos(v)),
      motionSettings
    );

    const scrollTo = () => {
      window.scrollTo(0, position - innerHeight);
    };

    React.useEffect(() => {
      window.addEventListener("beforeprint", () => {
        setIsPrinting(true);
      });
      window.addEventListener("afterprint", () => {
        setIsPrinting(false);
      });
    }, []);

    React.useLayoutEffect(() => {
      const payload = {
        note: children?.props?.notes,
        pagenr: index,
        room: data.room,
      };
      debouncedActiveSlide &&
        socket.emit("message", {
          payload: payload,
          room: data.room,
        });
    }, [debouncedActiveSlide, children?.props?.notes, index, data.room]);

    React.useEffect(() => {
      socket.emit("join_room", data.room);
    }, [data.room]);

    React.useEffect(() => {
      socket.on("goHome", () => {
        window.scrollTo(0, 0);
      });
      socket.on("updateSlide", (e) => {
        window.scrollTo(0, e.direction * innerHeight);
      });
    }, [innerHeight]);

    return (
      <CaseWrapperContext.Provider
        value={{ parentValues: { position: position, isPrinting: isPrinting } }}
      >
        <motion.div
          className="slideContainer"
          onClick={scrollTo}
          style={{
            zIndex: index,
            position: "fixed",
            borderRadius: "32px",
            overflow: "hidden",
            display: "flex",
            alignItems: "start",
            backgroundColor: bg,
            transition: "background 1s ease",
            ...(horizontal
              ? {
                  width: `calc(100vw - ${index * stagger + 10}px)`,
                  height: `calc(100vh - 10px)`,
                  ...(isPrinting ? { x: 0 } : { x: y }),
                  left: "100vw",
                  top: "5px",
                }
              : {
                  width: "calc(100vw - 10px)",
                  height: `calc(100vh - ${index * stagger + 10}px)`,
                  ...(isPrinting ? { y: 0 } : { y: y }),
                  left: "5px",
                  top: "100vh",
                }),
          }}
        >
          <motion.div
            className="slideContent"
            style={{
              scale,
              display: progress ? "none" : "block",
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
                    horizontal ? 0 : index * stagger + 10
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
                  <Text sx={{ fontSize: 2 }}>{children.props.title}</Text>
                  <Flex>
                    <Text sx={{ fontSize: 2, mr: "0.5em" }}>
                      {index < 10 && "0"}
                      {index}
                    </Text>
                    {data.room && (
                      <span
                        sx={{ textTransform: "capitalize" }}
                      >{` · ${data.room}`}</span>
                    )}
                  </Flex>
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
