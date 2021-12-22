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
export const Slide3 = () => {
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
            <span>work ethos</span>{" "}
          </Text>
          <Text variant="heading" sx={{ display: "inline" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {" "}
              {vectors.star}{" "}
            </span>
            <span>
              estimating effort is difficult—so results are prioritzed over
              scrutinizing hours.
            </span>{" "}
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.time}{" "}
            </span>
            <span>
              I go the extra mile to deliver on time while keeping a high
              standard.
            </span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
