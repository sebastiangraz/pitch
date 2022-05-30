/** @jsxImportSource theme-ui */

import { Text } from "theme-ui";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { globalStyle } from "../components/globalStyles";
import { mix } from "@theme-ui/color";
import React from "react";

const skills = [
  { name: "Branding" },
  { name: "Design Systems" },
  { name: "Art Direction" },
  { name: "Prototyping", format: "mp4" },
  { name: "Frontend" },
  { name: "UX" },
  { name: "Design Ops" },
  { name: "Typefaces" },
  { name: "Animation", format: "mp4" },
  { name: "3D" },
  { name: "Icons" },
  { name: "Print" },
  { name: "Photography" },
];

export const SlideSkills = () => {
  const ext = (e) => (e !== undefined ? e.substr(e.lastIndexOf(".") + 1) : "");
  const [asset, setAsset] = React.useState();
  const isFormat = ext(asset);

  return (
    <Padding constrain>
      <Reveal
        {...globalStyle.textRevealAnimation}
        sx={{
          position: "relative",
          zIndex: 1000,
          "&:hover *:not(:hover)": {
            color: "rgba(0,0,0,0.06)",
            cursor: "pointer",
          },
          "& > *": {
            display: "inline-block",
          },
        }}
      >
        {skills.map((e, i) => {
          return (
            <Text
              onMouseEnter={() => {
                const fileName = e.name.toLowerCase().split(" ").join("-");
                const format = e.format ? e.format : "png";
                const requireFile = require(`../assets/skills/${fileName}.${format}`);
                setAsset(requireFile);
              }}
              onMouseLeave={() => {
                setAsset("");
              }}
              key={e + i}
              sx={{
                pr: 1,
                transition: "ease color 0.2s",
                "&:hover": {
                  color: "#000",
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
              {e.name} ·{" "}
            </Text>
          );
        })}
      </Reveal>
      <div
        sx={{
          pointerEvents: "none",
          position: "absolute",
          top: "2em",
          left: "2em",
          width: "calc(100% - 4em)",
          height: "calc(100% - 4em)",
          objectFit: "contain",
          objectPosition: "top left",
        }}
      >
        {isFormat === "mp4" ? (
          <Reveal>
            <video
              src={asset}
              sx={{
                borderRadius: "30px",
                overflow: "hidden",
                height: "100%",
                margin: "0 auto",
              }}
              autoPlay
              muted
              loop
            />
          </Reveal>
        ) : (
          asset && (
            <img
              sx={{
                borderRadius: 2,
                height: "100%",
                overflow: "hidden",
              }}
              src={asset}
              alt={asset}
            />
          )
        )}
      </div>
    </Padding>
  );
};
