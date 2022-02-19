/** @jsxImportSource theme-ui */

import { Text } from "theme-ui";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { globalStyle } from "../components/globalStyles";
import { mix } from "@theme-ui/color";
import React from "react";

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
  const [image, setImage] = React.useState();
  return (
    <Padding constrain>
      <Reveal
        {...globalStyle.textRevealAnimation}
        sx={{
          position: "relative",
          zIndex: 1000,
          "&:hover *:not(:hover)": {
            color: "rgba(0,0,0,0)",
            cursor: "pointer",
          },
          "& > *": {
            display: "inline-block",
            mr: 2,
            mb: 1,
          },
        }}
      >
        {skills.map((e, i) => {
          return (
            <>
              <Text
                onMouseEnter={() => {
                  const fileName = e.toLowerCase().split(" ").join("-");
                  const requireFile = require(`../assets/skills/${fileName}.png`);
                  setImage(requireFile);
                }}
                onMouseLeave={() => {
                  setImage("");
                }}
                key={e}
                sx={{
                  transition: "ease color 0.2s",
                  "&:hover": {
                    color: "#fff",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1000,
                  },
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
            </>
          );
        })}
      </Reveal>
      {image && (
        <img
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: "2em",
            left: "2em",
            width: "calc(100% - 4em)",
            height: "calc(100% - 4em)",
            objectFit: "contain",
          }}
          src={image}
          alt={image}
        />
      )}
    </Padding>
  );
};
