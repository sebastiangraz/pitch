import intro from "../assets/intro.png";
import { Padding } from "../components/Padding";

export const Slide1 = () => {
  return (
    <>
      <Padding>
        <h1>sebastian graz</h1>
        <h1>brand design</h1>
      </Padding>
      <div style={{ right: 0, top: 0, width: "70%", position: "absolute" }}>
        <img style={{ position: "absolute" }} src={intro} alt=""></img>
      </div>
    </>
  );
};
