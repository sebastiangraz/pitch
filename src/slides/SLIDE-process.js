/** @jsxImportSource theme-ui */
import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";
import { useCaseWrapperContext } from "../components/Slide";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "-0.05em",
    position: "relative",
    display: "inline",
  },
};

export const SlideProcess = () => {
  const { parentValues } = useCaseWrapperContext();
  return (
    <Padding>
      <Reveal delay={1}>
        <span
          sx={{
            svg: {
              width: "5.5em",
            },
          }}
        ></span>
      </Reveal>
      <Reveal {...globalStyle.textRevealAnimation}>
        <Text
          mb={1}
          variant="heading"
          sx={{ color: "brand", display: "block" }}
        >
          Process
        </Text>
        <Text variant="heading" sx={{ display: "inline-block" }}>
          <span>1 · </span>
          <span>Gathering context & data.</span>
        </Text>
        <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span>2 · </span>
          <span>Outlining brand strategy.</span>
        </Text>
        <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span>3 · </span>
          <span>Design conceptualization.</span>
        </Text>
        <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span>4 · </span>
          <span>Consolidate visuals.</span>
        </Text>
      </Reveal>
    </Padding>
  );
};
