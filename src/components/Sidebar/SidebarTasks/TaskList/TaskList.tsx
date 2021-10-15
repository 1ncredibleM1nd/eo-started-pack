import { observer } from "mobx-react-lite";
import TaskItem from "./TaskItem";
import { css } from "goober";
import { useStore } from "@/stores";
import moment from "moment";

export const TaskList = observer(() => {
  const { contactStore, managersStore } = useStore();
  return (
    <div
      className={css`
        margin-top: 10px;
      `}
    >
      {contactStore.activeContact?.tasks?.map((task) => {
        return (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.content}
            isDeadline={moment().unix() < task.timestampDateToComplete}
            isDone={task.status === "completed"}
            from={
              managersStore.getById(task.creatorId)
                ? managersStore.getById(task.creatorId).username
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
