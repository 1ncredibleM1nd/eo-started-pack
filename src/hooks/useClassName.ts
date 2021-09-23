import { cn, ClassNameList } from "@bem-react/classname";

export function mergeClassName(...classes: ClassNameList) {
  return classes.filter((className) => className).join(" ");
}

export function useClassName(blockClassName: string) {
  return {
    cn: cn(blockClassName),
    mergeClassName: mergeClassName,
  };
}
