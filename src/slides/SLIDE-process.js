/** @jsxImportSource theme-ui */
import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { vectors } from "../assets/vectors";
import { defaultProps } from "../components/settings";
import Reveal from "../components/Reveal";
import { useCaseWrapperContext } from "../components/Slide";

const svgStyle = {
  svg: {
    width: "0.6em",
    top: "-0.05em",
    position: "relative",
    display: "inline",
  },
};

export const SlideProcess = () => {
  const { parentValues } = useCaseWrapperContext();
  return (
    <Padding>
      <Reveal delay={1}>
        <span
          sx={{
            svg: {
              width: "5.5em",
            },
          }}
        ></span>
      </Reveal>
      <Reveal {...defaultProps.textRevealAnimation}>
        <Text
          mb={1}
          variant="heading"
          sx={{ color: "brand", display: "block" }}
        >
          Process
          <span
            sx={{
              ...svgStyle,
              svg: { width: "1.4em", ml: 1, display: "inline" },
            }}
          >
            <svg
              viewBox="0 0 613 299"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M172.344 284.871C164.691 292.525 160.864 296.352 156.478 297.853C152.279 299.291 147.721 299.291 143.522 297.853C139.136 296.352 135.309 292.525 127.655 284.871L14.8445 172.06C7.19087 164.407 3.36407 160.58 1.86247 156.194C0.424749 151.995 0.424749 147.437 1.86247 143.237C3.36407 138.852 7.19087 135.025 14.8445 127.371L127.655 14.5603C135.309 6.9067 139.136 3.07989 143.522 1.57829C147.721 0.140569 152.279 0.140569 156.478 1.57829C160.864 3.07989 164.691 6.9067 172.344 14.5603L284.155 126.371C291.809 134.025 295.636 137.852 300.022 139.353C304.221 140.791 308.779 140.791 312.978 139.353C317.364 137.852 321.191 134.025 328.844 126.371L440.655 14.5603C448.309 6.9067 452.136 3.07989 456.522 1.57829C460.721 0.140569 465.279 0.140569 469.478 1.57829C473.864 3.07989 477.691 6.90669 485.344 14.5603L598.155 127.371C605.809 135.025 609.636 138.852 611.137 143.237C612.575 147.437 612.575 151.995 611.137 156.194C609.636 160.58 605.809 164.407 598.155 172.06L485.344 284.871C477.691 292.525 473.864 296.352 469.478 297.853C465.279 299.291 460.721 299.291 456.522 297.853C452.136 296.352 448.309 292.525 440.655 284.871L328.844 173.06L328.844 173.06C321.191 165.407 317.364 161.58 312.978 160.078C308.779 158.641 304.221 158.641 300.022 160.078C295.636 161.58 291.809 165.407 284.155 173.06L172.344 284.871ZM60.4999 134.216C68.7842 134.216 75.4999 140.932 75.4999 149.216C75.4999 157.5 68.7842 164.216 60.4999 164.216C52.2157 164.216 45.4999 157.5 45.4999 149.216C45.4999 140.932 52.2157 134.216 60.4999 134.216ZM567.5 149.216C567.5 140.932 560.784 134.216 552.5 134.216C544.216 134.216 537.5 140.932 537.5 149.216C537.5 157.5 544.216 164.216 552.5 164.216C560.784 164.216 567.5 157.5 567.5 149.216ZM237.5 134.216C245.784 134.216 252.5 140.932 252.5 149.216C252.5 157.5 245.784 164.216 237.5 164.216C229.216 164.216 222.5 157.5 222.5 149.216C222.5 140.932 229.216 134.216 237.5 134.216ZM390.5 149.216C390.5 140.932 383.784 134.216 375.5 134.216C367.216 134.216 360.5 140.932 360.5 149.216C360.5 157.5 367.216 164.216 375.5 164.216C383.784 164.216 390.5 157.5 390.5 149.216Z"
                fill="url(#paint0_linear_32_3024)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_32_3024"
                  x1={400}
                  y1="400"
                  x2={1200}
                  y2="400"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--theme-ui-colors-brand)" />
                  <stop
                    offset="0.59885"
                    stopColor="var(--theme-ui-colors-text)"
                  />
                </linearGradient>
              </defs>
            </svg>{" "}
          </span>
        </Text>
        <Text variant="heading" sx={{ display: "inline-block" }}>
          <span sx={svgStyle}>{vectors.donut} </span>
          <span>Gathering context & data.</span>
        </Text>
        <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span sx={svgStyle}>{vectors.donut} </span>
          <span>Outlining brand strategy.</span>
        </Text>
        <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span sx={svgStyle}>{vectors.donut} </span>
          <span>Design conceptualization.</span>
        </Text>
        <Text mt={1} variant="heading" sx={{ display: "inline-block" }}>
          <span sx={svgStyle}>{vectors.donut} </span>
          <span>Consolidate visuals.</span>
        </Text>
      </Reveal>
    </Padding>
  );
};
