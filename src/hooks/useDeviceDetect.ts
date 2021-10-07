const getDeviceDetect = (userAgent: string) => {
  const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i));
  const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isMobile = (): boolean => Boolean(isAndroid() || isIos());
  const isDesktop = (): boolean => Boolean(!isMobile());

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
  };
};

export const useDeviceDetect = () => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  return getDeviceDetect(userAgent);
};
