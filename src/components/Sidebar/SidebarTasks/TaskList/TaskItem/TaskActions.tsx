import { observer } from "mobx-react-lite";
import { css } from "goober";
import { useStore } from "@/stores";
import TaskIcon from "./TaskIcon";

type TPropsTaskActions = {
  id: number;
  isDone: boolean;
};

const TaskActions = observer(({ id, isDone }: TPropsTaskActions) => {
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
          if (!isDone) contactStore.completeTask(id);
        }}
      />
    </div>
  );
});

export default TaskActions;
