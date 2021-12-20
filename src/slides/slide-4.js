import { useCaseWrapperContext } from "../components/Slide";
import { Padding } from "../components/Padding";
import { Reveal } from "../components/Reveal";
import React from "react";

export const Slide4 = () => {
  let { parentValues } = useCaseWrapperContext();
  console.log(parentValues.progress);
  return (
    <>
      <Padding>
        <Reveal trigger={parentValues.progress}>
          <p>Reveal me</p>
          <h1>Reveal me too</h1>
        </Reveal>
      </Padding>
    </>
  );
};
