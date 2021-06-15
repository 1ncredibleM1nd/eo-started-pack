import { useEffect, useState } from "react";

const getOrientation = () =>
  window.innerHeight / window.innerWidth > 1 ? "portrait" : "landscape";

export function useOrientation() {
  const [orientation, setOrientation] = useState(getOrientation);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setOrientation(getOrientation);
    });

    window.addEventListener("orientationchange", () => {
      setOrientation(getOrientation);
    });
  }, []);

  return orientation;
}
