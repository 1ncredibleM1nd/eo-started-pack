import { useStore } from "@/stores";
import { classnames } from "@/utils/styles";
import { css } from "goober";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

type TFilterButtonProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

const FilterButton = observer(
  ({ children, active, onClick }: TFilterButtonProps) => {
    return (
      <div
        className={classnames(
          css`
            position: relative;
            color: ${active ? "#3498DB" : "black"};
            cursor: pointer;
            padding: 0 10px;
            font-size: 16px;

            &:hover,
            &:focus {
              background: transparent;
            }

            &.ant-btn[disabled] {
              color: inherit;
              opacity: 0.5;
            }
          `,
          active &&
            css`
              &::after {
                position: absolute;
                left: 50%;
                bottom: -6px;
                content: "";
                background: #3498db;
                height: 2px;
                width: 100%;
                transform: translateX(-50%);
              }
            `
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

export const FilterDialogStatus = observer(() => {
  const { contactStore } = useStore();

  return (
    <div
      className={css`
        display: flex;
        margin-bottom: 6px;
        padding-bottom: 6px;
        border-bottom: 1px solid #f4f5f6;
      `}
    >
      <FilterButton
        onClick={() => contactStore.setDialogStatus("")}
        active={contactStore.dialogStatus === ""}
      >
        Все
      </FilterButton>
      <FilterButton
        onClick={() => contactStore.setDialogStatus("unread")}
        active={contactStore.dialogStatus === "unread"}
      >
        Непрочитанные
      </FilterButton>
      <FilterButton
        onClick={() => contactStore.setDialogStatus("unanswer")}
        active={contactStore.dialogStatus === "unanswer"}
      >
        Без ответа
      </FilterButton>
    </div>
  );
});
