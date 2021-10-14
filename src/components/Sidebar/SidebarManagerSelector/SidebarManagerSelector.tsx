import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Popover, Button, Radio, Space } from "antd";
import "./SidebarManagerSelector.scss";
import ManagerSelector from "@/components/Sidebar/SidebarManagerSelector/ManagerList";
import { useStore } from "@/stores";
import { ManagerView } from "@/components/Sidebar/SidebarManagerSelector/ManagerView";

export const SidebarManagerSelector = observer(() => {
  const { contactStore, managersStore } = useStore();
  const [popoverVisible, setPopOverVisible] = useState(false);
  const managerId = contactStore.activeContact?.manager_id;
  const onChangeManager = async (value: { id: number; username: string }) => {
    await contactStore.changeManager(value.id);
    setPopOverVisible(!popoverVisible);
  };

  return (
    <div
      className={css`
        max-width: 200px;
        padding-top: 20px;
      `}
    >
      <h2
        className={css`
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 5px;
        `}
      >
        Менеджер
      </h2>
      <Popover
        placement={"left"}
        content={<ManagerSelector onChangeManager={onChangeManager} />}
        title="Менеджер"
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={setPopOverVisible}
      >
        <Button
          className={css`
            background: none;
            border: none;
            text-align: left;
            padding-left: 0;
          `}
          type="link"
        >
          {managerId ? (
            <ManagerView manager={managersStore.getById(managerId)} />
          ) : (
            "Назначить менеджера"
          )}
        </Button>
      </Popover>
    </div>
  );
});
