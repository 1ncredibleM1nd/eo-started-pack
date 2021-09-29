import "./Icon.scss";
import { observer } from "mobx-react-lite";
import { SVGProps } from "react";
import { useClassName } from "@/hooks/useClassName";

type TIconSize = "sm" | "md" | "lg" | "xl";

export type TIconProps = {
  name: string;
  size?: TIconSize;
} & SVGProps<SVGSVGElement>;

export const Icon = observer(
  ({ name, fill, size = "sm", ...svgProps }: TIconProps) => {
    const { cn, mergeClassName } = useClassName("icon");

    return (
      <svg
        {...svgProps}
        className={mergeClassName(cn({ size }), svgProps.className)}
      >
        <use href={`#${name}`} fill={fill} />
      </svg>
    );
  }
);
