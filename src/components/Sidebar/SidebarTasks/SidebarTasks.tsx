import { observer } from "mobx-react-lite";
import SidebarAddTask from "./SidebarAddTask";
import TaskList from "./TaskList";
import { css } from "goober";

export const SidebarTasks = observer(() => {
  return (
    <div
      className={css`
        margin-top: 25px;
      `}
    >
      <h2
        className={css`
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 5px;
        `}
      >
        Задачи
      </h2>

      <SidebarAddTask />
      <TaskList />
    </div>
  );
});
