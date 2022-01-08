/** @jsxImportSource theme-ui */
import { Text, Grid } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";
import logoprocess from "../assets/logoprocess.mp4";
import timeless from "../assets/timeless.mp4";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "0.05em",
    right: "-0.05em",
    position: "relative",
    display: "inline",
  },
};

export const SlideExploration = () => {
  return (
    <>
      <Padding constrain>
        <Reveal {...globalStyle.textRevealAnimation}>
          <Grid gap={4} columns={2}>
            <video
              sx={{
                borderRadius: "1em",
                maxWidth: "27em",
                placeSelf: "flex-start",
              }}
              src={logoprocess}
              autoPlay
              muted
              loop
            />
            <video
              sx={{
                borderRadius: "1em",
                maxWidth: "27em",
                placeSelf: "flex-start",
              }}
              src={timeless}
              autoPlay
              muted
              loop
            />
            <Text variant="heading">explorative & naive mindset</Text>
            <Text variant="heading">
              lasting design
              <br /> + outcome
            </Text>
          </Grid>
        </Reveal>
      </Padding>
    </>
  );
};
