import { css, styled } from "goober";
import React from "react";
import { observer } from "mobx-react-lite";
import { Manager } from "@/stores/model/Manager";
import AvatarThumb from "@/components/AvatarThumb";

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
      <AvatarThumb
        size={18}
        img={manager.avatar}
        round={true}
        textSizeRatio={1.75}
        name={manager.username}
        textLength={2}
      />
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
