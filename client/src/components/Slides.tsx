import React from "react";
import Slide from "@/components/Slide";
import { useWindowSize } from "@/components/hooks";
import { useViewportScroll } from "framer-motion";

const Slides = React.memo(({ children }: { children: React.ReactNode }) => {
  const count = React.Children.count(children);
  const windowSize = useWindowSize();
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<number[]>([]);
  const { scrollY } = useViewportScroll();
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const [value, setValue] = React.useState<number>(0);

  scrollY.onChange((e) => {
    // TODO: update to use motion/react but newer motion packages dont support useViewportScroll which is deprecated, but somehow more performant.
    setValue(e);
  });

  React.useEffect(() => {
    const val = position.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    }, 0);

    setActiveSlide(position.indexOf(val) + 1);
  }, [value, position]);

  React.useLayoutEffect(() => {
    let childPosition: number[] = [];
    const child = ref.current?.children;

    if (child) {
      Array.from(child).reduce((acc) => {
        childPosition.push(acc + windowSize.height);
        return acc + windowSize.height;
      }, 0);
    }

    setPosition(childPosition);
  }, [windowSize]);

  React.useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        window.scrollBy(0, windowSize.height);
      } else if (event.key === "ArrowLeft") {
        window.scrollBy(0, -windowSize.height);
      }
    };

    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [windowSize.height]);

  return (
    <div ref={ref}>
      {React.Children.map(children || null, (child, i) => {
        if (!React.isValidElement(child)) return null;
        return (
          <Slide
            index={i}
            childPosition={position}
            activeSlide={activeSlide === i}
            childCount={count}
          >
            {child}
          </Slide>
        );
      })}
    </div>
  );
});
export default Slides;
