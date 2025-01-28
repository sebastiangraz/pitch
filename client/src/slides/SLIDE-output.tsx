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
            <Text variant="heading">
              Final
              <br />
              Output
              <br />
              Examples
            </Text>
            <Reveal
              sx={{ mt: 5, "& > * span": { m: 1 } }}
              delay={1.5}
              childDelay={1.4}
            >
              <Text>Figma design system</Text>
              <Text>Brand guidelines</Text>
              <Text>Color & asset generators</Text>
              <Text>Evergreen assets</Text>
              <Text>Development handoff</Text>
              <Text>Brand documentation</Text>
            </Reveal>
          </Box>
        </Reveal>
      </Padding>
    </>
  );
};
