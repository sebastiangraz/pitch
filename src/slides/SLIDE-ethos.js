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

export const SlideEthos = () => {
  return (
    <>
      <Padding constrain>
        <Reveal {...globalStyle.textRevealAnimation}>
          <Text variant="heading" mb={1} sx={{ color: "brand" }}>
            Ethos
          </Text>
          <Text variant="heading">
            <span>outcome </span>
            <span sx={svgStyle}>{vectors.arrowR} </span>
            <span>scrutinizing time</span>
          </Text>
          <Text mt={1} variant="heading">
            <span>frequent </span>
            <span sx={svgStyle}>{vectors.star}</span>
            <span> collaboration</span>
          </Text>
          <Text mt={1} variant="heading">
            <span>make </span>
            <span sx={svgStyle}>{vectors.x}</span>
            <span> ask questions later</span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
