import { observer } from "mobx-react-lite";
import { Radio, RadioChangeEvent, Space } from "antd";
import { css, styled } from "goober";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import React from "react";
import { useStore } from "@/stores";
import { ManagerView } from "@/components/Sidebar/SidebarManagerSelector/ManagerView";

type TProps = {
  onChangeManager(value: any): void;
};

export const ManagerSelector = observer((props: TProps) => {
  const { managersStore, contactStore } = useStore();
  const activeContact = contactStore.activeContact;
  const onChange = (e: RadioChangeEvent) => {
    props.onChangeManager(e.target.value);
  };
  const noManager = {
    id: null,
    username: "Без менеджера",
    avatar: null,
  };

  return (
    <Radio.Group
      className={css`
        padding-top: 10px;
        margin-left: 15px;
        width: auto;
        padding-bottom: 10px !important;
        max-height: 450px;
        overflow: auto;
      `}
      onChange={onChange}
      value={
        activeContact?.manager_id
          ? managersStore.getById(activeContact?.manager_id)
          : "БМ"
      }
    >
      <Space direction="vertical">
        <Radio key={null} value="БМ">
          <ManagerView manager={noManager} />
        </Radio>
        {managersStore.managerList.map((manager) => {
          return (
            <Radio
              className={css`
                display: flex;
                align-items: center;
              `}
              value={manager}
              key={manager.id}
            >
              <ManagerView manager={manager} />
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
});
