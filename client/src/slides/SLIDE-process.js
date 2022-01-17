/** @jsxImportSource theme-ui */
import { Text, Grid } from "theme-ui";
import { Padding } from "../components/Padding";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";
import diamond from "../assets/diamond.svg";
import diamondFilled from "../assets/diamond-filled.svg";
import { alpha } from "@theme-ui/color";

export const SlideProcess = () => {
  return (
    <Padding>
      <Reveal {...globalStyle.textRevealAnimation} childDelay={3}>
        <Grid
          mt={6}
          sx={{ alignItems: "center", justifyItems: "center" }}
          columns={"repeat(3, 1fr)"}
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
                ${alpha("bg", 0.3)(t)} 0em, ${alpha("bg", 0.9)(t)} 5em, ${alpha(
                "bg",
                0.3
              )(t)}8em)`,
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
        <Grid
          mt={8}
          sx={{ alignItems: "center", justifyItems: "center" }}
          columns={"repeat(3, 1fr)"}
        >
          <Text m={0} variant="heading">
            <span>Design</span>
          </Text>

          <Reveal
            sx={{
              height: "8em",
              width: "16em",
              position: "relative",
              maskImage: `url(${diamondFilled})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              backgroundImage: (t) => `
              repeating-linear-gradient(to left,
                ${alpha("bg", 0.3)(t)} 0em, ${alpha("bg", 0.9)(t)} 6em, ${alpha(
                "bg",
                0.3
              )(t)} 16em)`,
            }}
            repeatParent
            repeatTypeLoop
            duration={8}
            ease="linear"
            parentEffect={[
              { backgroundPosition: "0em" },
              { backgroundPosition: "16em" },
            ]}
          ></Reveal>

          <Text m={0} variant="heading">
            <span>Deliver</span>
          </Text>
        </Grid>
      </Reveal>
    </Padding>
  );
};
