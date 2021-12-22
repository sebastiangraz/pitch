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
export const Slide4 = () => {
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
          <Text
            variant="heading"
            mr={1}
            sx={{ color: "brand", display: "inline-block" }}
          >
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {" "}
              {vectors.donut}{" "}
            </span>
            <span>design philosophy</span>{" "}
          </Text>
          <Text variant="heading" sx={{ display: "inline" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {" "}
              {vectors.dotArray}{" "}
            </span>
            <span>
              exploration{" "}
              <Text
                variant="caps"
                sx={{ fontSize: "inherit", display: "inline" }}
              >
                &
              </Text>{" "}
              naivety is key for great designs
            </span>{" "}
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.circleArray}{" "}
            </span>
            <span>
              avoid trends, instead aim for designs that answer the brief
            </span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
