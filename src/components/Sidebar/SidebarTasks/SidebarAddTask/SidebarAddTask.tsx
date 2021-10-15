import { observer } from "mobx-react-lite";
import SidebarAddTaskForm from "../SidebarAddTaskForm";
import { css } from "goober";
import { useState } from "react";
import { Button } from "antd";

export const SidebarAddTask = observer(() => {
  const [visibility, setVisibility] = useState(false);

  const onCancel = () => {
    setVisibility(false);
  };
  return (
    <>
      {visibility ? (
        <SidebarAddTaskForm onCancel={onCancel} />
      ) : (
        <Button
          type="link"
          className={css`
            padding: 0;
            display: block;
            font-size: 14px;
            color: #3498db;
            margin-bottom: 10px;
          `}
          onClick={() => {
            setVisibility(!visibility);
          }}
        >
          Добавить задачу
        </Button>
      )}
    </>
  );
});
