/** @jsxImportSource theme-ui */

import theme from "../theme";
import introvid from "@/assets/intro.mp4";
import { globalStyle } from "@/components/globalStyles";
import { saturate } from "@theme-ui/color";

import {
  motion,
  transform,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { Text, Flex, Box, Theme } from "theme-ui";
import Reveal from "../components/Reveal";
import { Padding } from "../components/Padding";
import { Logo } from "../components/Logo";
import { useWindowSize } from "../components/hooks";

export const SlideIntro = () => {
  const { scrollY } = useScroll();
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
                  effect={[
                    {
                      color: saturate("bg", 0.7)(theme as Theme<{}>),
                      opacity: 0,
                      scale: 1.2,
                      fontVariationSettings: `"wght" 5`,
                    },
                    {
                      color: "var(--theme-ui-colors-text)",
                      opacity: 1,
                      scale: 1,
                      fontVariationSettings: `"wght" 64`,
                    },
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
          </Box>

          <Reveal
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <Reveal
              sx={{ maxWidth: "32em" }}
              childStyle={{ display: "inline" }}
              {...globalStyle.textRevealAnimation}
            >
              <Text
                variant="lead"
                sx={{
                  display: "inline",
                }}
              >
                My name is{" "}
              </Text>
              <Text
                variant="lead"
                sx={{
                  display: "inline",
                  fontVariantCaps: "all-small-caps",
                }}
              >
                sebastian graz
              </Text>
              <Text
                variant="lead"
                sx={{
                  display: "inline",
                }}
              >
                . I run a branding studio, creating designs that are easy to use
                and beautiful.
              </Text>
            </Reveal>
            <motion.div
              initial={{ x: 0 }}
              style={{
                x: y,
                right: 0,
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
            </motion.div>
          </Reveal>
        </Flex>
      </Padding>
    </>
  );
};
