/** @jsxImportSource theme-ui */

import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { defaultProps } from "../components/settings";
import { mix } from "@theme-ui/color";

const skills = [
  "Design Systems",
  "Art Direction",
  "Prototyping",
  "Front-end",
  "Branding",
  "UX",
  "Design Operations",
  "Typeface Drawing",
  "Photography",
  "Animation",
  "Print",
  "3D",
];

export const SlideSkills = () => {
  return (
    <Padding>
      <Reveal
        {...defaultProps.textRevealAnimation}
        sx={{
          "&>*": {
            display: "inline-block",
            mr: 2,
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
