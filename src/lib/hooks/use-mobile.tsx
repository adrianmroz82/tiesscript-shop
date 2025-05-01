import { useEffect, useState } from "react";

const MOBILE_MAX = 767;
const TABLET_MAX = 1024;

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width <= MOBILE_MAX,
        isTablet: width > MOBILE_MAX && width <= TABLET_MAX,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}
