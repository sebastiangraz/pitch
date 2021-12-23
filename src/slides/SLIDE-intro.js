/** @jsxImportSource theme-ui */

import intro from "../assets/intro.png";
import introvid from "../assets/intro.mp4";
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
import { useWindowSize } from "../components/useWindowSize";
import { useCaseWrapperContext } from "../components/Slide";

export const SlideIntro = () => {
  const { parentValues } = useCaseWrapperContext();
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
      <Padding>
        <Logo weight={70 - parentValues.progress * 30} />
        <Text variant="heading" mb={0}>
          sebastian graz
        </Text>
        <Text variant="heading" sx={{ color: "brand" }}>
          brand designer
        </Text>
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
              mt: 4,
            }}
            duration={2}
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
      </Padding>
    </>
  );
};
