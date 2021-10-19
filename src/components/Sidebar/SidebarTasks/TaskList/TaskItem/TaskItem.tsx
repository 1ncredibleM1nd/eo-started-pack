import { observer } from "mobx-react-lite";
import { css } from "goober";
import { useStore } from "@/stores";
import dayjs from "@/services/dayjs";
import TaskActions from "./TaskActions";
import TaskItemFrom from "./TaskItemFrom";
import { ITask } from "@/stores/interface/ITask";

type TProps = {
  task: ITask;
};

export const TaskItem = observer(({ task }: TProps) => {
  const { managersStore } = useStore();
  const from = managersStore.getById(task.creatorId);
  const isDone = task.status === "completed";
  const isDeadline = dayjs().unix() < task.timestampDateToComplete;

  return (
    <div
      className={css`
        padding: 10px;
        background-color: #fff;
        margin-bottom: 5px;
        border-radius: 5px;
        position: relative;
        display: flex;
        align-items: stretch;
        justify-content: space-between;

        &:last-child {
          margin-bottom: 0;
        }

        &:hover #edit_task {
          visibility: visible;
          opacity: 1;
          transition: 0.2s;
        }
      `}
    >
      <div
        className={css`
          width: calc(100% - 30px);
        `}
      >
        <h4
          className={css`
            font-size: 14px;
            margin-bottom: ${isDone ? "0" : "5px"};
            color: ${isDone ? "#C0CECF" : "#050505"};
            text-decoration: ${isDone ? "line-through" : "none"};
          `}
        >
          {task.content}
        </h4>

        <span
          className={css`
            font-size: 12px;
            line-height: 17px;
            font-weight: 400;
            display: ${isDone ? "none" : "block"};
          `}
        >
          <div
            className={css`
              display: inline-flex;
              align-items: center;
            `}
          >
            <TaskItemFrom from={from} />
          </div>

          {/* <span
              className={css`
                display: block;
                color: #607d8b;
              `}
            >
              Добавлено: {dayjs(createdAt * 1000).format("DD.MM.YYYY HH:mm dd")}
            </span> */}
          <span
            className={css`
              display: block;
              color: ${isDeadline ? "#6fbb85" : "#D75746"};
            `}
          >
            {dayjs(task.timestampDateToComplete * 1000).format(
              "DD.MM.YYYY HH:mm dd"
            )}
          </span>
        </span>
      </div>

      <TaskActions id={task.id} isDone={isDone} />
    </div>
  );
});
