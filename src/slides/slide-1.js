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
import { Logo } from "../components/Logo";
import { useCaseWrapperContext } from "../components/Slide";

export const Slide1 = () => {
  const { scrollY } = useViewportScroll();
  let { parentValues } = useCaseWrapperContext();

  const y = useSpring(
    useTransform(scrollY, () =>
      transform(parentValues.progress, [0, 1], [0, -600])
    ),
    {
      damping: 12,
      mass: 0.1,
    }
  );

  return (
    <>
      <Padding>
        <Logo />
        <Text variant="heading">sebastian graz</Text>
        <Text variant="heading">brand designer</Text>
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
          initialInView
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
