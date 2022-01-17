/** @jsxImportSource theme-ui */
import { Text, Box } from "theme-ui";
import { Padding } from "../components/Padding";
import { globalStyle } from "../components/globalStyles";
import Reveal from "../components/Reveal";
import output from "../assets/output.png";

export const SlideOutput = () => {
  return (
    <>
      <Padding>
        <Reveal
          childDelay={1}
          {...globalStyle.textRevealAnimation}
          sx={{ display: "grid", gridTemplateColumns: "auto auto", gap: 4 }}
        >
          <img
            alt=""
            sx={{
              borderRadius: "1em",
              maxWidth: "36em",
              placeSelf: "flex-start",
            }}
            src={output}
          />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text variant="heading">Output</Text>
            <Reveal
              sx={{ mt: 5, "& > * span": { m: 1 } }}
              delay={1.5}
              childDelay={1.4}
            >
              <Text>figma design system</Text>
              <Text>brand guidelines</Text>
              <Text>color & asset generators</Text>
              <Text>evergreen assets</Text>
              <Text>development handoff</Text>
              <Text>brand documentation</Text>
            </Reveal>
          </Box>
        </Reveal>
      </Padding>
    </>
  );
};
