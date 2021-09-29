import React from "react";
import { observer } from "mobx-react-lite";
import { Icon } from "@/ui/Icon/Icon";
import { useClassName } from "@/hooks/useClassName";
import "./FilterButton.scss";

type TProps = {
  count: number;
  visible: boolean;
};

export const FilterButton = observer((props: TProps) => {
  const { count, visible } = props;
  const { cn } = useClassName("filter");
  return (
    <div className={cn("counter")}>
      <Icon
        className={cn("icon")}
        name={visible ? "icon_filter_close" : "icon_filter"}
        fill={count === 0 || visible ? "#a3a3a3" : "#3498db"}
      />
      {!visible && (
        <p className={cn("number")}>
          {count === 0 ? "" : count > 99 ? "99+" : count}
        </p>
      )}
    </div>
  );
});
