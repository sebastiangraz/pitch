import { useCaseWrapperContext } from "../components/Slide";
import { Padding } from "../components/Padding";
import { Reveal } from "../components/Reveal";
import React from "react";

export const Slide6 = () => {
  let { parentValues } = useCaseWrapperContext();

  return (
    <>
      <Padding>
        <Reveal trigger={parentValues.progress > 0.5}>
          <h2>Reveal me</h2>
          <h1>Reveal me too</h1>
        </Reveal>
      </Padding>
    </>
  );
};
