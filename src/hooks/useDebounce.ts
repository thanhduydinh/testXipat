import { useEffect } from "react";

function useDebounce(callback: () => any, delay?: number) {
  useEffect(() => {
    const timer = setTimeout(() => callback(), delay || 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
}

export default useDebounce;
