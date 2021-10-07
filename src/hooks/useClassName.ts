import { cn } from "@bem-react/classname";

export function mergeClassName(
  ...classes: Array<string | boolean | undefined>
) {
  return classes.filter((className) => className).join(" ");
}

export function useClassName(blockClassName: string) {
  return {
    cn: cn(blockClassName),
    mergeClassName: mergeClassName,
  };
}
