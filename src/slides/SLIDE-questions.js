/** @jsxImportSource theme-ui */
import { Text, Grid } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { defaultProps } from "../components/settings";
import { Reveal } from "../components/Reveal";
import { useCaseWrapperContext } from "../components/Slide";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "0.05em",
    position: "relative",
    display: "inline",
  },
};

export const SlideQuestions = () => {
  const { parentValues } = useCaseWrapperContext();
  return (
    <Padding>
      <Grid gap={4} columns={"auto 1fr"} repeat="fit">
        <Reveal {...defaultProps.textRevealAnimation}>
          <Text
            mt={1}
            variant="heading"
            sx={{ color: "brand", display: "inline-block" }}
          >
            <span>Questions</span>
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
            <span>Core identity challenge.</span>
          </Text>
        </Reveal>
      </Grid>
    </Padding>
  );
};
