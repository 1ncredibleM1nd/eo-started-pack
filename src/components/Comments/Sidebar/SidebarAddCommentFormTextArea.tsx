import { Input } from "antd";
import { styled } from "goober";
import { forwardRef } from "react";

export const SidebarAddCommentFormTextArea = styled(Input.TextArea, forwardRef)`
  border: none;
  box-shadow: none !important;
  padding: 0 10px;
  display: block;
  height: 100px !important;
  font-size: 14px;
  line-height: 16px;
  border-radius: 5px 5px 0 0 !important;
`;
