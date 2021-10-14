import { css, styled } from "goober";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import React from "react";
import { observer } from "mobx-react-lite";
import { Manager } from "@/stores/model/Manager";

type TProps = {
  manager: Manager;
};

const ManagerWrapper = styled("div")`
  display: flex;
  align-items: center;
`;

export const ManagerView = observer((props: TProps) => {
  const { manager } = props;
  return (
    <ManagerWrapper
      className={css`
        display: flex;
        align-items: center;
      `}
    >
      <UserAvatar size={18} user={manager} round={true} textSizeRatio={1.75} />
      <span
        className={css`
          margin-left: 5px;
        `}
      >
        {manager.username}
      </span>
    </ManagerWrapper>
  );
});
