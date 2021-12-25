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

export const SlideTodo = () => {
  const { parentValues } = useCaseWrapperContext();
  return (
    <Padding>
      <Grid gap={4} columns={"auto 1fr"} repeat="fit">
        <Reveal delay={1}>
          <span
            sx={{
              svg: {
                mt: "3.5em",
                width: "5.5em",
              },
            }}
          >
            {/* <svg
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
            </svg> */}
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
                svg: { ...svgStyle, width: "1.4em" },
              }}
            >
              <svg
                viewBox="0 0 613 299"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M172.344 284.871C164.691 292.525 160.864 296.352 156.478 297.853C152.279 299.291 147.721 299.291 143.522 297.853C139.136 296.352 135.309 292.525 127.655 284.871L14.8445 172.06C7.19087 164.407 3.36407 160.58 1.86247 156.194C0.424749 151.995 0.424749 147.437 1.86247 143.237C3.36407 138.852 7.19087 135.025 14.8445 127.371L127.655 14.5603C135.309 6.9067 139.136 3.07989 143.522 1.57829C147.721 0.140569 152.279 0.140569 156.478 1.57829C160.864 3.07989 164.691 6.9067 172.344 14.5603L284.155 126.371C291.809 134.025 295.636 137.852 300.022 139.353C304.221 140.791 308.779 140.791 312.978 139.353C317.364 137.852 321.191 134.025 328.844 126.371L440.655 14.5603C448.309 6.9067 452.136 3.07989 456.522 1.57829C460.721 0.140569 465.279 0.140569 469.478 1.57829C473.864 3.07989 477.691 6.90669 485.344 14.5603L598.155 127.371C605.809 135.025 609.636 138.852 611.137 143.237C612.575 147.437 612.575 151.995 611.137 156.194C609.636 160.58 605.809 164.407 598.155 172.06L485.344 284.871C477.691 292.525 473.864 296.352 469.478 297.853C465.279 299.291 460.721 299.291 456.522 297.853C452.136 296.352 448.309 292.525 440.655 284.871L328.844 173.06L328.844 173.06C321.191 165.407 317.364 161.58 312.978 160.078C308.779 158.641 304.221 158.641 300.022 160.078C295.636 161.58 291.809 165.407 284.155 173.06L172.344 284.871ZM60.4999 134.216C68.7842 134.216 75.4999 140.932 75.4999 149.216C75.4999 157.5 68.7842 164.216 60.4999 164.216C52.2157 164.216 45.4999 157.5 45.4999 149.216C45.4999 140.932 52.2157 134.216 60.4999 134.216ZM567.5 149.216C567.5 140.932 560.784 134.216 552.5 134.216C544.216 134.216 537.5 140.932 537.5 149.216C537.5 157.5 544.216 164.216 552.5 164.216C560.784 164.216 567.5 157.5 567.5 149.216ZM237.5 134.216C245.784 134.216 252.5 140.932 252.5 149.216C252.5 157.5 245.784 164.216 237.5 164.216C229.216 164.216 222.5 157.5 222.5 149.216C222.5 140.932 229.216 134.216 237.5 134.216ZM390.5 149.216C390.5 140.932 383.784 134.216 375.5 134.216C367.216 134.216 360.5 140.932 360.5 149.216C360.5 157.5 367.216 164.216 375.5 164.216C383.784 164.216 390.5 157.5 390.5 149.216Z"
                  fill="url(#paint0_linear_32_3024)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_32_3024"
                    x1="-74.5001"
                    y1="149.216"
                    x2={600 + parentValues.progress * 800}
                    y2="149.216"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="var(--theme-ui-colors-brand)" />
                    <stop
                      offset="0.59885"
                      stop-color="red"
                      stop-opacity="0.78"
                    />
                  </linearGradient>
                </defs>
              </svg>{" "}
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
            <span>gathering context & data</span>
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