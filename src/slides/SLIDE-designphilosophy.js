/** @jsxImportSource theme-ui */
import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "-0.05em",
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
            Philosophy
          </Text>
          <Text variant="heading">
            <span sx={svgStyle}> {vectors.dotArray} </span>
            <span>
              Exploration & naivety <br />
              is key for great designs.
            </span>{" "}
          </Text>
          <Text mt={1} variant="heading">
            <span sx={svgStyle}>{vectors.polygon} </span>
            <span>
              Avoid trends, instead aim for designs that answer the brief.
            </span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
