import { css } from "goober";
import { observer } from "mobx-react-lite";
import { SVGProps } from "react";
import { classnames } from "@/utils/styles";

enum IconSize {
  xs = 14,
  sm = 18,
  md = 24,
  lg = 30,
  xl = 36,
}

export type TIconSize = keyof typeof IconSize;

export type TIconProps = {
  name: string;
  size?: TIconSize;
  interactive?: boolean;
} & SVGProps<SVGSVGElement>;

export const Icon = observer(
  ({
    name,
    fill,
    size = "sm",
    interactive = false,
    ...svgProps
  }: TIconProps) => {
    const iconSize = IconSize[size];

    return (
      <svg
        {...svgProps}
        className={classnames(
          css`
            width: ${iconSize}px;
            height: ${iconSize}px;
          `,
          interactive &&
            css`
              cursor: pointer;
            `,
          svgProps.className
        )}
      >
        <use href={`#${name}`} fill={fill} />
      </svg>
    );
  }
);
