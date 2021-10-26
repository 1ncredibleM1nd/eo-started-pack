import { observer } from "mobx-react-lite";
import TaskItem from "./TaskItem";
import { css } from "goober";
import { useStore } from "@/stores";
import dayjs from "@/services/dayjs";

export const TaskList = observer(() => {
  const { contactStore, managersStore } = useStore();
  return (
    <div
      className={css`
        margin-top: 10px;
      `}
    >
      {contactStore.activeContact?.filteredTasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.content}
            isDeadline={dayjs().unix() < task.timestampDateToComplete}
            status={task.status}
            from={
              managersStore.getById(task.creatorId)
                ? managersStore.getById(task.creatorId)
                : "Менеджер удалён"
            }
            dateToComplete={task.timestampDateToComplete}
            createdAt={task.createdAt}
          />
        );
      })}
    </div>
  );
});
