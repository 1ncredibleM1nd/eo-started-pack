import { styled } from "goober";
import { Button } from "antd";

export const SidebarAddCommentFormButtonCreate = styled(Button)`
  padding: 3px 10px;
  margin-right: 10px;
  height: auto;
  font-size: 12px;
  line-height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: #fff;
  background-color: #3498db;
  border: 1px solid #3498db !important;
  transition: 0.3s;

  &.ant-btn[disabled] {
    color: rgba(0, 0, 0, 0.25) !important;
  }

  &:focus {
    background-color: #3498db;
    color: #fff;
  }

  &:hover {
    color: #3498db;
    background-color: #fff;
    transition: 0.3s;
  }
`;
