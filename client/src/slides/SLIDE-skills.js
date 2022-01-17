/** @jsxImportSource theme-ui */

import { Text } from "theme-ui";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { globalStyle } from "../components/globalStyles";
import { mix } from "@theme-ui/color";

const skills = [
  "Branding",
  "Design Systems",
  "Art Direction",
  "Prototyping",
  "Frontend",
  "UX",
  "Design Ops",
  "Typefaces",
  "Animation",
  "3D",
  "Icons",
  "Print",
  "Photography",
];

export const SlideSkills = () => {
  return (
    <Padding constrain>
      <Reveal
        {...globalStyle.textRevealAnimation}
        sx={{
          "&>*": {
            display: "inline-block",
            mr: 2,
            mb: 1,
          },
        }}
      >
        {skills.map((e, i) => {
          return (
            <Text
              key={e}
              sx={{
                color: (t) => `
                  ${mix(
                    "bg",
                    "text",
                    0.01 + i * (100 / skills.length) * 0.01
                  )(t)}
              `,
              }}
              variant="heading"
            >
              {e} ·{" "}
            </Text>
          );
        })}
      </Reveal>
    </Padding>
  );
};
