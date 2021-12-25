/** @jsxImportSource theme-ui */
import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { defaultProps } from "../components/settings";
import { Reveal } from "../components/Reveal";

const svgStyle = {
  width: "0.6em",
  top: "0.05em",
  position: "relative",
  display: "inline",
};
export const SlidePhilosophy = () => {
  return (
    <>
      <Padding>
        <Reveal
          sx={{
            "&>*": {
              display: "inline",
            },
          }}
          {...defaultProps.textRevealAnimation}
        >
          <Text variant="heading" mb={1} sx={{ color: "brand" }}>
            Design philosophy
          </Text>
          <Text variant="heading">
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {" "}
              {vectors.dotArray}{" "}
            </span>
            <span>
              Exploration & naivety <br />
              is key for great designs.
            </span>{" "}
          </Text>
          <Text mt={1} variant="heading">
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.circleArray}{" "}
            </span>
            <span>
              Avoid trends, instead aim for designs that answer the brief.
            </span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
