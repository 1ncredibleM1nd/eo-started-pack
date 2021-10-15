import { observer } from "mobx-react-lite";
import { css } from "goober";
import { classnames } from "@/utils/styles";
import TaskIcon from "./TaskIcon";
import { useStore } from "@/stores";

type TPropsTaskActions = {
  isDone: boolean;
  id: number;
};
const TaskActions = observer(({ isDone, id }: TPropsTaskActions) => {
  const { contactStore } = useStore();

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <TaskIcon
        name={isDone ? "icon_task_done" : "icon_task"}
        size="xs"
        onClick={() => {
          contactStore.completeTask(id);
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

      {/*{!isDone ? (*/}
      {/*  <TaskIcon*/}
      {/*    name="icon_delete_task"*/}
      {/*    size="xs"*/}
      {/*    onClick={() => {*/}
      {/*      contactStore.deleteTask(id);*/}
      {/*    }}*/}
      {/*    className={css`*/}
      {/*      margin-top: auto;*/}
      {/*    `}*/}
      {/*  />*/}
      {/*) : null}*/}
    </div>
  );
});

export default TaskActions;
