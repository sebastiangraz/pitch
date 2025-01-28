/** @jsxImportSource theme-ui */
import { Text, Box } from "theme-ui";
import { Padding } from "../components/Padding";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";
import { vectors } from "../assets/vectors";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "0.05em",
    right: "-0.05em",
    position: "relative",
    display: "inline",
  },
};

export const SlidePricing = () => {
  return (
    <>
      <Padding>
        <Reveal
          childDelay={1}
          {...globalStyle.textRevealAnimation}
          sx={{ display: "grid", gridTemplateColumns: "auto auto", gap: 4 }}
        >
          <Text variant="heading">Pricing models</Text>
          <Box>
            <Text variant="heading">
              <span sx={svgStyle}>{vectors.polygon} </span>
              <span>fixed</span>
            </Text>
            <Text mt={1} variant="heading">
              <span sx={svgStyle}>{vectors.time} </span>
              <span>hourly</span>
            </Text>
            <Text mt={1} variant="heading">
              <span sx={svgStyle}>{vectors.dotArray} </span>
              <span>retainer</span>
            </Text>
          </Box>
        </Reveal>
      </Padding>
    </>
  );
};
