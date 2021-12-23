/** @jsxImportSource theme-ui */

import intro from "../assets/intro.png";
import {
  motion,
  transform,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Text } from "@theme-ui/components";
import { Reveal } from "../components/Reveal";
import { Padding } from "../components/Padding";
import { useCaseWrapperContext } from "../components/Slide";
import { useWindowSize } from "../components/useWindowSize";

export const SlideCapchase = () => {
  const { parentValues } = useCaseWrapperContext();
  const { scrollY } = useViewportScroll();
  const { height } = useWindowSize();

  const y = useSpring(
    useTransform(scrollY, (e) =>
      transform(
        e,
        [parentValues.position - height, parentValues.position],
        [0, -600]
      )
    ),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  // console.log(y.current, parentValues.position);

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
          width: "60%",
          position: "absolute",
        }}
      >
        <Reveal
          ignoreParentFade
          ease={"linear"}
          effect={[{ y: 0 }, { y: -1800 }]}
          duration={18}
          repeat
        >
          <motion.img
            style={{ position: "absolute" }}
            src={intro}
            alt=""
          ></motion.img>
        </Reveal>
      </motion.div>
    </>
  );
};
