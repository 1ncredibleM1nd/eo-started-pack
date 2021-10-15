import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css, styled } from "goober";
import { Button, Dropdown, Input, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { SidebarTemplateAnswerAddTemplate } from "@/components/Sidebar/SidebarTemplateAnswerAddTemplate";
import { SidebarTemplateAnswerAddGroup } from "@/components/Sidebar/SidebarTemplateAnswerAddGroup";

export const SidebarTemplateAnswer = observer(() => {
  return (
    <div>
      <SidebarTemplateAnswerAddTemplate />
      <SidebarTemplateAnswerAddGroup />
    </div>
  );
});
