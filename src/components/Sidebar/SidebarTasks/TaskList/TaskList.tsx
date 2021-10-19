import { observer } from "mobx-react-lite";
import TaskItem from "./TaskItem";
import { css } from "goober";
import { useStore } from "@/stores";

export const TaskList = observer(() => {
  const { contactStore } = useStore();

  const renderTasks = contactStore.activeContact?.tasks?.map((task) => (
    <TaskItem key={task.id} task={task} />
  ));

  return (
    <div
      className={css`
        margin-top: 10px;
      `}
    >
      {renderTasks}
    </div>
  );
});
