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
export const SlideEthos = () => {
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
            Work ethos
          </Text>
          <Text variant="heading">
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.star}{" "}
            </span>
            <span>
              Estimating effort is difficult. Outcome over scrutinizing hours.
            </span>{" "}
          </Text>
          <Text mt={1} variant="heading">
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.time}{" "}
            </span>
            <span>Meaningful & frequent collaboration for better results.</span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};