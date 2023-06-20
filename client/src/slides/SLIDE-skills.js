/** @jsxImportSource theme-ui */

import { Text, Box } from "theme-ui";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { globalStyle } from "../components/globalStyles";
import { mix, transparentize } from "@theme-ui/color";
import React from "react";

const skills = [
  { name: "Branding" },
  { name: "Systems" },
  { name: "Strategy" },
  { name: "Iconography" },
  { name: "3D" },
  { name: "Illustrations" },
  { name: "Animation" },
  { name: "Print" },
];

export const SlideSkills = () => {
  const ext = (e) =>
    e !== null && e !== undefined ? e.substr(e.lastIndexOf(".") + 1) : "";

  const [asset, setAsset] = React.useState();
  const isFormat = ext(asset);

  return (
    <Padding sx={{ height: "100%" }}>
      <Reveal
        {...globalStyle.textRevealAnimation}
        sx={{
          position: "relative",
          // zIndex: 1000,
          // "&:hover *:not(:hover)": {
          //   color: "rgba(0,0,0,0.06)",
          //   cursor: "pointer",
          // },
          display: "flex",
          flexWrap: "wrap",
          height: "calc(100% - 5em)",
          gap: 2,
          "& > *": {
            // bg: "#DEE2DE",
            // p: 4,

            height: "50%",
            width: "calc(100% / 3 - 1em)",
            display: "inline-block",
            //first three
            "&:not(:nth-of-type(-n+3))": {
              width: "calc(100% / 4 - 1em)",
            },
            // //last two
            // "&:nth-last-of-type(-n+2)": {
            //   width: "calc(100% / 8 - 1em)",
            // },
          },
        }}
      >
        {skills.slice(0, -2).map((e, i) => {
          let image;
          const fileName = e?.name?.toLowerCase().split(" ").join("-");
          const format = e.format ? e.format : "png";

          try {
            image = require(`../assets/skills/${fileName}.${format}`) || {};
          } catch (error) {
            image = null;
          }

          return (
            <Box
              sx={{
                // bg: (t) => transparentize("text", 0.96)(t),
                p: 4,
                borderRadius: ".5em",
                display: "grid",
                gridTemplateRows: "1fr auto",
                alignItems: "end",
                height: "100%",
                // distribute vertically
                justifyContent: "space-between",
                // bg: "#DEE2DE",
                bg: (t) =>
                  transparentize(
                    "bg",
                    (i + 13) * (100 / skills.length) * 0.004
                  )(t),
                color: (t) =>
                  `${mix(
                    "bg",
                    "text",
                    0.01 + i * (100 / skills.length) * 0.01
                  )(t)}`,
              }}
              key={`${e.name}-${i}`}
            >
              <img
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={image}
                alt={e.name}
              />
              <Text
                mb={0}
                sx={{ fontVariantCaps: "all-small-caps", fontSize: 2 }}
              >
                {e.name}
              </Text>
            </Box>
          );
        })}
        <div
          sx={{
            gap: 2,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            height: "100%",
            width: "100%",

            "& > *": {
              position: "relative",
              // bg: "#DEE2DE",
              // p: 4,
              flex: 1,
              width: "100%",
              borderRadius: ".5em",
              // height: "100%",
              // width: "calc(100% / 3 - 1em)",
            },
          }}
        >
          {skills.slice(-2).map((e, i) => {
            let image;
            const fileName = e?.name?.toLowerCase().split(" ").join("-");
            const format = e.format ? e.format : "png";

            try {
              image = require(`../assets/skills/${fileName}.${format}`) || {};
            } catch (error) {
              image = null;
            }

            return (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "1fr auto",
                  alignItems: "end",
                  height: "100%",
                  // distribute vertically
                  justifyContent: "space-between",
                  // bg: "#DEE2DE",
                  p: 4,
                  overflow: "hidden",
                  bg: (t) => transparentize("text", 0.96)(t),
                  color: (t) => `
                      ${mix(
                        "bg",
                        "text",
                        0.01 + i * (100 / skills.length) * 0.01
                      )(t)}
                  `,
                }}
                key={`${e.name}-${i}`}
              >
                <img
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={image}
                  alt={e.name}
                />
                <Text
                  mb={0}
                  sx={{ fontVariantCaps: "all-small-caps", fontSize: 2 }}
                >
                  {e.name}
                </Text>
              </Box>
            );
          })}
        </div>
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
