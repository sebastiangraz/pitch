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

export const SlideEthos = () => {
  return (
    <>
      <Padding>
        <Reveal {...globalStyle.textRevealAnimation}>
          <Text variant="heading" mb={1} sx={{ color: "brand" }}>
            Ethos
          </Text>
          <Text variant="heading">
            <span sx={svgStyle}>{vectors.star} </span>
            <span>
              Estimating effort is difficult. Outcome over scrutinizing hours.
            </span>{" "}
          </Text>
          <Text mt={1} variant="heading">
            <span sx={svgStyle}>{vectors.time} </span>
            <span>Meaningful & frequent collaboration for better results.</span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
