/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";
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
        <Reveal childDelay={2} {...globalStyle.textRevealAnimation}>
          <Text variant="heading" mb={1} sx={{ color: "bg" }}>
            Ethos
          </Text>
          <Text variant="heading">
            <span>flexible </span>
            <span sx={svgStyle}>{vectors.dotArray} </span>
            <span>revisions</span>
          </Text>
          <Text mt={1} variant="heading">
            <span>frequent </span>
            <span sx={svgStyle}>{vectors.star}</span>
            <span> collaboration</span>
          </Text>
          <Text mt={1} variant="heading">
            <span> perfect </span>
            <span sx={svgStyle}>{vectors.arrowR}</span>
            <span>done </span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
