/** @jsxImportSource theme-ui */

import { Text } from "@theme-ui/components";
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
  "Photography",
  "Print",
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
                    "brand",
                    "text",
                    Math.min((i * skills.length) / 100, 1)
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
