/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";
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
    position: "relative" as const,
    display: "inline",
  },
};

export const SlideExploration = () => {
  return (
    <>
      <Padding constrain>
        <Reveal
          childDelay={1.4}
          {...globalStyle.textRevealAnimation}
          sx={{ display: "grid", gridTemplateColumns: "auto auto", gap: 4 }}
        >
          <video
            sx={{
              borderRadius: "1em",
              maxWidth: "26em",
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
              maxWidth: "26em",
              placeSelf: "flex-start",
            }}
            src={timeless}
            autoPlay
            muted
            loop
          />
          <Text variant="heading">
            <span>explorative </span> <br />
            <span sx={svgStyle}> {vectors.spikedCircle} </span>
            <span>naive mind</span>
            {/* explorative & naive mindset */}
          </Text>
          <Text variant="heading">
            <span>lasting design </span> <br />
            <span sx={svgStyle}> {vectors.time} </span>
            <span>outcome</span>
          </Text>
        </Reveal>
      </Padding>
    </>
  );
};
