/** @jsxImportSource theme-ui */
import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "0.05em",
    right: "-0.05em",
    position: "relative",
    display: "inline",
  },
};

export const SlidePhilosophy = () => {
  return (
    <>
      <Padding constrain>
        <Reveal {...globalStyle.textRevealAnimation}>
          <Text variant="heading" mb={1} sx={{ color: "brand" }}>
            Design
          </Text>
          <Text variant="heading">
            <span>exploration</span>
            <span sx={svgStyle}> {vectors.spikedCircle} </span>
            <span>naivety</span>
          </Text>
          <Text mt={1} variant="heading">
            <span>trendless</span>
            <span sx={svgStyle}> {vectors.spikedCircle} </span>
            <span>on brief</span>
          </Text>
          <Text mt={1} variant="heading">
            <span>familiarity</span>
            <span sx={svgStyle}> {vectors.spikedCircle} </span>
            <span>novelty</span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
