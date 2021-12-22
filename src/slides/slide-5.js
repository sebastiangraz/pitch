/** @jsxImportSource theme-ui */
import { Text, Grid } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { defaultProps } from "../components/settings";
import { Reveal } from "../components/Reveal";
import { useCaseWrapperContext } from "../components/Slide";

const svgStyle = {
  width: "0.6em",
  top: "0.05em",
  position: "relative",
  display: "inline",
};

export const Slide5 = () => {
  const { parentValues } = useCaseWrapperContext();
  console.log(parentValues.progress);
  return (
    <Padding>
      <Grid gap={4} repeat="fill">
        <Reveal>
          <span
            sx={{
              svg: {
                width: 6,
              },
            }}
          >
            <svg
              viewBox="0 0 299 612"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3447 171.845C6.69103 164.191 2.86425 160.364 1.36263 155.978C-0.0750799 151.779 -0.0750797 147.221 1.36263 143.022C2.86425 138.636 6.69103 134.809 14.3447 127.155L127.156 14.3445C134.809 6.69093 138.636 2.86413 143.022 1.36253C147.221 -0.0751969 151.779 -0.0751964 155.978 1.36253C160.364 2.86413 164.191 6.69093 171.845 14.3445L284.656 127.155C292.309 134.809 296.136 138.636 297.638 143.022C299.075 147.221 299.075 151.779 297.638 155.978C296.136 160.364 292.309 164.191 284.655 171.845L172.845 283.655C165.191 291.309 161.364 295.136 159.863 299.522C158.425 303.721 158.425 308.279 159.863 312.478C161.364 316.864 165.191 320.691 172.845 328.345L284.655 440.155C292.309 447.809 296.136 451.636 297.638 456.022C299.075 460.221 299.075 464.779 297.638 468.978C296.136 473.364 292.309 477.191 284.656 484.845L171.845 597.655C164.191 605.309 160.364 609.136 155.978 610.637C151.779 612.075 147.221 612.075 143.022 610.637C138.636 609.136 134.809 605.309 127.156 597.655L14.3446 484.845C6.69102 477.191 2.86424 473.364 1.36262 468.978C-0.0750935 464.779 -0.0750933 460.221 1.36262 456.022C2.86424 451.636 6.69105 447.809 14.3446 440.155L126.156 328.345L126.156 328.344C133.809 320.691 137.636 316.864 139.138 312.478C140.575 308.279 140.575 303.721 139.138 299.522C137.636 295.136 133.809 291.309 126.155 283.655L14.3447 171.845ZM165 60C165 68.2843 158.284 75 150 75C141.716 75 135 68.2843 135 60C135 51.7157 141.716 45 150 45C158.284 45 165 51.7157 165 60ZM150 567C158.284 567 165 560.284 165 552C165 543.716 158.284 537 150 537C141.716 537 135 543.716 135 552C135 560.284 141.716 567 150 567ZM165 237C165 245.284 158.284 252 150 252C141.716 252 135 245.284 135 237C135 228.716 141.716 222 150 222C158.284 222 165 228.716 165 237ZM150 390C158.284 390 165 383.284 165 375C165 366.716 158.284 360 150 360C141.716 360 135 366.716 135 375C135 383.284 141.716 390 150 390Z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="150"
                  y1="-75"
                  x2="150"
                  y2={600 + parentValues.progress * 800}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--theme-ui-colors-text)" />
                  <stop
                    offset={parentValues.progress}
                    stopColor="var(--theme-ui-colors-brand)"
                    stopOpacity="0.78"
                  />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </Reveal>
        <Reveal {...defaultProps.textRevealAnimation}>
          <Text
            mt={1}
            variant="heading"
            sx={{ color: "brand", display: "inline-block" }}
          >
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.donut}{" "}
            </span>
            <span>process</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.donut}{" "}
            </span>
            <span>gathering context and data</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.donut}{" "}
            </span>
            <span>outlining brand strategy</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.donut}{" "}
            </span>
            <span>design conceptualization</span>
          </Text>
          <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
            <span
              sx={{
                svg: svgStyle,
              }}
            >
              {vectors.donut}{" "}
            </span>
            <span>consolidate visuals</span>
          </Text>
        </Reveal>
      </Grid>
    </Padding>
  );
};
