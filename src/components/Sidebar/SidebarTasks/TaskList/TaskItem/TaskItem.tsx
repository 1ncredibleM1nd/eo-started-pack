import { observer } from "mobx-react-lite";
import { css } from "goober";
import TaskActions from "./TaskActions";
import dayjs from "@/services/dayjs";
import TaskItemFrom from "@/components/Sidebar/SidebarTasks/TaskList/TaskItem/TaskItemFrom";
import { Manager } from "@/stores/model";
type TProps = {
  id: number;
  name: string;
  isDeadline: boolean;
  status: string;
  from: Manager;
  dateToComplete: number;
  createdAt: number;
};

export const TaskItem = observer(
  ({
    id,
    name,
    isDeadline,
    status,
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
              word-wrap: anywhere;
              width: 100%;
              margin-bottom: ${status === "active" ? "5px" : "0"};
              color: ${status === "active" ? "#050505" : "#c0cecf"};
              text-decoration: ${status === "archived"
                ? "line-through"
                : "none"};
            `}
          >
            {name}
          </h4>

          <span
            className={css`
              font-size: 12px;
              line-height: 17px;
              font-weight: 400;
              display: ${status === "active" ? "block" : "none"};
            `}
          >
            <span
              className={css`
                display: block;
                color: #607d8b;
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
            </span>
            {/*<span*/}
            {/*  className={css`*/}
            {/*    display: block;*/}
            {/*    color: #607d8b;*/}
            {/*  `}*/}
            {/*>*/}
            {/*  Добавлено: {dayjs(createdAt * 1000).format("DD.MM.YYYY HH:mm dd")}*/}
            {/*</span>*/}
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

        <TaskActions id={id} status={status} />
      </div>
    );
  }
);
