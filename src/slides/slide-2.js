import { useCaseWrapperContext } from "../components/Slide";
import { Padding } from "../components/Padding";
export const Slide2 = () => {
  let { value } = useCaseWrapperContext();

  return (
    <>
      <Padding>
        <h1>About</h1>
      </Padding>
    </>
  );
};
