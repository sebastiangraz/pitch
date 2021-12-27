/** @jsxImportSource theme-ui */

import capchase from "../assets/capchase.png";
import {
  motion,
  transform,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Text } from "@theme-ui/components";
import Reveal from "../components/Reveal";
import { Padding } from "../components/Padding";
import { useCaseWrapperContext } from "../components/Slide";
import { useWindowSize } from "../components/useWindowSize";

export const SlideCapchase = () => {
  const { parentValues } = useCaseWrapperContext();
  const { scrollY } = useViewportScroll();
  const { height } = useWindowSize();

  const y = useSpring(
    useTransform(
      scrollY,
      [parentValues.position - height, parentValues.position],
      [0, -600]
    ),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <>
      <Padding sx={{ width: "40em" }}>
        <Text mb={0} sx={{ fontVariantCaps: "all-small-caps" }}>
          case study
        </Text>
        <Text sx={{ color: "brand", fontVariantCaps: "all-small-caps" }}>
          Capchase
        </Text>
        <Text sx={{ fontVariantCaps: "all-small-caps" }} mb={0}>
          Duration
        </Text>
        <Text sx={{ color: "brand" }}>4 months + retainer</Text>
        <Text sx={{ fontVariantCaps: "all-small-caps" }} mb={0}>
          Challenge
        </Text>
        <Text sx={{ color: "brand" }}>
          Position{" "}
          <span sx={{ fontVariantCaps: "all-small-caps" }}>Capchase</span> as a
          leader in non-dilutable financing. Look & feel like a business partner
          not a business tool.
        </Text>
      </Padding>

      <motion.div
        initial={{ y: 0 }}
        style={{
          y: y,
          right: 0,
          top: 0,
          width: "60%",
          position: "absolute",
        }}
      >
        <Reveal
          ignoreParentFade
          ease={[0.2, 0, 0.17, 0.2]}
          effect={[{ y: 100 }, { y: -500 }]}
          duration={10}
          repeat
        >
          <motion.img
            style={{ position: "absolute" }}
            src={capchase}
            alt=""
          ></motion.img>
        </Reveal>
      </motion.div>
    </>
  );
};
