/** @jsxImportSource theme-ui */

import introvid from "../assets/intro.mp4";
import {
  motion,
  transform,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Text, Flex, Box } from "@theme-ui/components";
import { Reveal } from "../components/Reveal";
import { Padding } from "../components/Padding";
import { Logo } from "../components/Logo";
import { useWindowSize } from "../components/useWindowSize";

export const SlideIntro = () => {
  const { scrollY } = useViewportScroll();
  const { height } = useWindowSize();

  const y = useSpring(
    useTransform(scrollY, (e) => transform(e, [0, height], [0, -56])),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <>
      <Padding sx={{ height: "100vh" }}>
        <Flex
          sx={{
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Logo
              component={
                <Reveal
                  duration={3}
                  parentEffect={[
                    { scale: 1.2, opacity: 0 },
                    { scale: 1, opacity: 1 },
                  ]}
                  effect={[
                    { fontVariationSettings: `"wght" 5` },
                    { fontVariationSettings: `"wght" 64` },
                  ]}
                >
                  <h1
                    className="logo"
                    sx={{
                      // hax iOS14 clips variable fonts
                      minWidth: 100,
                      // endhax
                      display: "inline-block",
                      fontFamily: "G",
                      fontSize: "14em",
                      lineHeight: 0.5,
                      userSelect: "none",
                      textRendering: "optimizeLegibility",
                      fontWeight: "normal",
                      margin: 0,
                    }}
                  >
                    G
                  </h1>
                </Reveal>
              }
            />
            <Reveal delay={1.2}>
              <Text variant="heading" mb={0}>
                sebastian graz
              </Text>
              <Text variant="heading" sx={{ color: "brand" }}>
                brand designer
              </Text>
            </Reveal>
          </Box>
          <motion.div
            initial={{ x: 0 }}
            style={{
              x: y,
              right: 0,
            }}
          >
            <Reveal
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
              }}
            >
              <video
                sx={{
                  borderRadius: "1em",
                  maxWidth: "45em",
                  placeSelf: "flex-end",
                }}
                src={introvid}
                autoPlay
                muted
                loop
              />
            </Reveal>
          </motion.div>
        </Flex>
      </Padding>
    </>
  );
};
