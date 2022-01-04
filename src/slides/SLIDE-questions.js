/** @jsxImportSource theme-ui */
import { Text, Grid } from "@theme-ui/components";
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

export const SlideQuestions = () => {
  return (
    <Padding constrain>
      <Grid gap={4} columns={"auto 1fr"} repeat="fit">
        <Reveal {...globalStyle.textRevealAnimation}>
          <Text
            mt={1}
            variant="heading"
            sx={{ color: "brand", display: "inline-block" }}
          >
            <span>Discover</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span sx={svgStyle}>{vectors.donut} </span>
            <span>Mission statement.</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span sx={svgStyle}>{vectors.donut} </span>
            <span>Current non-brand goals.</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span sx={svgStyle}>{vectors.donut} </span>
            <span>Market segment.</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span sx={svgStyle}>{vectors.donut} </span>
            <span>Core identity questions.</span>
          </Text>
        </Reveal>
      </Grid>
    </Padding>
  );
};
