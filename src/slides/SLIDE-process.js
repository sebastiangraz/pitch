/** @jsxImportSource theme-ui */
import { Text, Grid } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";
import { useCaseWrapperContext } from "../components/Slide";
import diamond from "../assets/diamond.svg";
import { darken, alpha } from "@theme-ui/color";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "-0.05em",
    position: "relative",
    display: "inline",
  },
};

export const SlideProcess = () => {
  const { parentValues } = useCaseWrapperContext();
  return (
    <Padding>
      <Reveal delay={1}>
        <span
          sx={{
            svg: {
              width: "5.5em",
            },
          }}
        ></span>
      </Reveal>
      <Reveal {...globalStyle.textRevealAnimation}>
        {/* <Text
          mb={1}
          variant="heading"
          sx={{ color: "brand", display: "block" }}
        >
          <span sx={{ color: "text" }}>Data</span> · Design
        </Text> */}
        <Grid
          mt={8}
          sx={{ alignItems: "center", justifyItems: "center" }}
          columns={"auto 1fr auto"}
        >
          <Text m={0} variant="heading">
            <span>Discover</span>
          </Text>

          <Reveal
            sx={{
              height: "8em",
              width: "16em",
              position: "relative",
              maskImage: `url(${diamond})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              backgroundImage: (t) => `
              repeating-linear-gradient(to left,
                ${alpha("brand", 0.3)(t)} 0em, ${alpha(
                "brand",
                0.9
              )(t)} 5em, ${alpha("brand", 0.3)(t)}8em)`,
            }}
            childStyle={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            repeatParent
            repeatTypeLoop
            duration={4}
            ease="easeInOut"
            parentEffect={[
              { backgroundPosition: "0em" },
              { backgroundPosition: "8em" },
            ]}
          ></Reveal>

          <Text m={0} variant="heading">
            <span>Define</span>
          </Text>
        </Grid>
        {/* <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span>3 · </span>
          <span>Design conceptualization.</span>
        </Text>
        <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span>4 · </span>
          <span>Consolidate visuals.</span>
        </Text> */}
      </Reveal>
    </Padding>
  );
};
