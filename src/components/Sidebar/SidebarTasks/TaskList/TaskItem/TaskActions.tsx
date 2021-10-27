import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Popconfirm } from "antd";
import TaskIcon from "./TaskIcon";
import { useStore } from "@/stores";
import { SyntheticEvent } from "react";

type TPropsTaskActions = {
  status: string;
  id: number;
};
const TaskActions = observer(({ status, id }: TPropsTaskActions) => {
  const { contactStore } = useStore();

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <TaskIcon
        name={status === "active" ? "icon_task" : "icon_task_done"}
        size="xs"
        color={status === "completed" ? "#6fbb85" : "#607D8B"}
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
          status === "active"
            ? contactStore.completeTask(id)
            : contactStore.restoreTask(id);
        }}
      />

      {/*{!isDone ? (*/}
      {/*  <TaskIcon*/}
      {/*    name="icon_edit_task"*/}
      {/*    size="xs"*/}
      {/*    onClick={() => {*/}
      {/*      alert("Изменить?");*/}
      {/*    }}*/}
      {/*    id="edit_task"*/}
      {/*    className={css`*/}
      {/*      margin-top: 5px;*/}
      {/*      visibility: hidden;*/}
      {/*      opacity: 0;*/}
      {/*      transition: 0.2s;*/}

      {/*      @media (max-width: 992px) {*/}
      {/*        visibility: visible;*/}
      {/*        opacity: 1;*/}
      {/*      }*/}
      {/*    `}*/}
      {/*  />*/}
      {/*) : null}*/}

      {status === "active" ? (
        <Popconfirm
          placement="topLeft"
          title="Удалить задачу?"
          onConfirm={() => contactStore.deleteTask(id)}
          okText="Да"
          cancelText="Нет"
        >
          <TaskIcon
            name="icon_delete_task"
            size="xs"
            className={css`
              margin-top: auto;
            `}
          />
        </Popconfirm>
      ) : null}
    </div>
  );
});

export default TaskActions;
