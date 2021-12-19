import { useCaseWrapperContext } from "../components/Slide";

export const Slide2 = () => {
  let { value } = useCaseWrapperContext();

  return (
    <>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <p>Para</p>
    </>
  );
};
