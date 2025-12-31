import { useEffect } from "react";
import { useLocation } from "react-router";
import { lenisInstance } from "../../providers/LenisProvider";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, {
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;