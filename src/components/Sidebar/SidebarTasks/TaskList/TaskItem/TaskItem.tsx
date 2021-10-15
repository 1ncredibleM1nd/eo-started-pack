import { observer } from "mobx-react-lite";
import { css } from "goober";
import TaskActions from "./TaskActions";
import dayjs, { toCalendar } from "@/services/dayjs";

type TProps = {
  id: number;
  name: string;
  isDeadline: boolean;
  isDone: boolean;
  from: string;
  dateToComplete: number;
  createdAt: number;
};

export const TaskItem = observer(
  ({
    id,
    name,
    isDeadline,
    isDone,
    from,
    dateToComplete,
    createdAt,
  }: TProps) => {
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
            {name}
          </h4>

          <span
            className={css`
              font-size: 12px;
              line-height: 17px;
              font-weight: 400;
              display: ${isDone ? "none" : "block"};
            `}
          >
            <span
              className={css`
                display: block;
                color: #607d8b;
              `}
            >
              {from}
            </span>
            <span
              className={css`
                display: block;
                color: #607d8b;
              `}
            >
              Добавлено: {dayjs(createdAt * 1000).format("DD.MM.YYYY HH:mm dd")}
            </span>
            <span
              className={css`
                display: block;
                color: ${isDeadline ? "#6fbb85" : "#D75746"};
              `}
            >
              {dayjs(dateToComplete * 1000).format("DD.MM.YYYY HH:mm dd")}
            </span>
          </span>
        </div>

        <TaskActions id={id} isDone={isDone} />
      </div>
    );
  }
);
