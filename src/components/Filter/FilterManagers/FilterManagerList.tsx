import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Checkbox, Space } from "antd";
import { ManagerView } from "@/components/Sidebar/SidebarManagerSelector/ManagerView";
import { useStore } from "@/stores";
import { css } from "goober";

type TProps = {
  onCheck: (id: number, state: boolean) => void;
};

export const FilterManagerList = observer(({ onCheck }: TProps) => {
  const { managersStore } = useStore();
  return (
    <Space
      className={css`
        padding-left: 15px;
        padding-top: 10px;
        margin-bottom: 10px;
        padding-bottom: 10px;
        max-height: 400px;
        overflow: auto;
      `}
      direction="vertical"
    >
      <Checkbox onChange={(ev) => onCheck(-1, ev.target.checked)}>
        Без менеджера
      </Checkbox>
      {managersStore.managerList.map((manager) => {
        return (
          <Checkbox
            key={manager.id}
            className={css`
              display: flex;
              align-items: center;
              top: 0;

              .ant-checkbox {
                top: 0;
              }
            `}
            onChange={(ev) => onCheck(manager.id, ev.target.checked)}
          >
            <ManagerView manager={manager} />
          </Checkbox>
        );
      })}
    </Space>
  );
});
