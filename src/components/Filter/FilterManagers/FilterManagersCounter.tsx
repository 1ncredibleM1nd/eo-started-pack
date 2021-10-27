import React from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import { css } from "goober";
import { useStore } from "@/stores";

export const FilterManagersCounter = observer(() => {
  const { managersStore } = useStore();

  return (
    <span>
      Выбрано{" "}
      {managersStore.chosenManagersCount + (managersStore.noManagers ? 1 : 0)}{" "}
      из {managersStore.managersCount}
    </span>
  );
});
