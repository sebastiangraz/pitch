/** @jsxImportSource theme-ui */

import pg from "@/assets/prototypingguide.png";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { Text } from "theme-ui";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { useCaseWrapperContext } from "../components/Slide";
import { useWindowSize } from "../components/hooks";
import { keyframes } from "@emotion/react";

const slideMotion = keyframes`
    0%   {  transform: translateY(10em);  }
    100%   { transform: translateY(-80em); }
    `;

const slideOpacity = keyframes`
    0%   {  opacity: 0;  }
    10%   { opacity: 1; }
    90%   { opacity: 1; }
    100%   { opacity: 0; }
    `;

export const SlideCasePrototypingGuide = () => {
  const { parentValues } = useCaseWrapperContext();
  const { scrollY } = useScroll();
  const { height } = useWindowSize();

  const y = useSpring(
    useTransform(
      scrollY,
      [parentValues.position - height, parentValues.position],
      ["0em", -1000]
    ),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <>
      <Padding sx={{ width: "36em" }}>
        <Reveal
          effect={[
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0 },
          ]}
        >
          <Text mb={0} sx={{ fontVariantCaps: "all-small-caps" }}>
            case study
          </Text>
          <Text sx={{ color: "bg", fontVariantCaps: "all-small-caps" }}>
            Prototyping Guide
          </Text>
          <Text sx={{ fontVariantCaps: "all-small-caps" }} mb={0}>
            Duration
          </Text>
          <Text sx={{ color: "bg" }}>1 month</Text>
          <Text sx={{ fontVariantCaps: "all-small-caps" }} mb={0}>
            Challenge
          </Text>
          <Text sx={{ color: "bg" }}>
            A project to encourage design leaders to invest their teams into in
            high-fi prototyping.
          </Text>
        </Reveal>
      </Padding>

      <motion.div
        initial={{ y: 0 }}
        style={{
          y: y,
          right: 0,
          top: 0,
          width: "70%",
          position: "absolute",
        }}
      >
        <Reveal>
          <motion.img
            sx={{
              animationName: `${slideMotion}, ${slideOpacity}`,
              animationDuration: "16s",
              animationFillMode: "both",
              animationDirection: "normal",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
            src={pg}
            alt=""
          ></motion.img>
        </Reveal>
      </motion.div>
    </>
  );
};
