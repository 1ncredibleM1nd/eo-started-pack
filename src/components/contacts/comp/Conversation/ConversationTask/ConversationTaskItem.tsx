import { observer } from "mobx-react-lite";
import { css } from "goober";
import { useStore } from "@/stores";
import dayjs from "@/services/dayjs";
import TaskActions from "@/components/Sidebar/SidebarTasks/TaskList/TaskItem/TaskActions";
import AvatarThumb from "@/components/AvatarThumb";
import { Icon } from "@/ui/Icon/Icon";
import { useState, useRef, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Task } from "@/stores/model";

export const ConversationTaskItem = observer(
  ({ task, selectContact }: { task: Task; selectContact: any }) => {
    const { managersStore, schoolsStore } = useStore();
    const manager = managersStore.getById(task.creatorId);

    const isDeadline = dayjs().unix() < task.timestampDateToComplete;
    const school = schoolsStore.getById(task.schoolId);
    const socialMedia = task.socialMedia;
    const [moreBtnHide, setMoreBtnHide] = useState(true);
    const [expandContent, setExpandContent] = useState(false);
    const ref = useRef();
    const [inViewRef, inView] = useInView({});

    const setRefs = useCallback(
      (node) => {
        ref.current = node;
        inViewRef(node);
      },
      [inViewRef]
    );

    useEffect(() => {
      if (inView) {
        const node = ref.current;
        if (node) {
          setMoreBtnHide(node.clientHeight > node.firstChild.offsetHeight);
        }
      }
    }, [inView]);

    return (
      <div
        onClick={() => selectContact(task.conversationId)}
        className={css`
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          cursor: pointer;
          padding: 10px;
          border-radius: 5px;

          &:hover {
            background: #f4f5f6;
          }
        `}
      >
        <div
          className={css`
            width: 100%;
          `}
        >
          <div
            className={css`
              display: flex;
              font-weight: 500;
            `}
          >
            <div className="task-school-icon">
              <AvatarThumb
                size={18}
                img={school.logo}
                round={true}
                textSizeRatio={2}
                name={school.name}
                textLength={1}
                className=""
              />
            </div>

            <div className="task-school-icon">
              <div className={`social_media_icon ${socialMedia}`}>
                <Icon name={`social_media_${socialMedia}`} />
              </div>
            </div>

            <div className="task-school-icon">
              <AvatarThumb
                size={18}
                img={task.avatar}
                round={true}
                textSizeRatio={2}
                name={task.name}
                textLength={1}
                className=""
              />
            </div>

            {task.name ? task.name : "без имени"}
          </div>
          <div
            className={css`
              position: relative;
            `}
          >
            <div
              id={`task_item_${task.id}`}
              key={`task_item_${task.id}`}
              className={css`
                display: -webkit-box;
                ${!expandContent ? "-webkit-line-clamp: 4;" : ""}

                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: calc(100% - 20px);
                word-break: break-word;
              `}
              ref={setRefs}
            >
              <span>{task.content}</span>
            </div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setMoreBtnHide(true);
                setExpandContent(true);
              }}
              className={css`
                color: #3498db;
                position: absolute;
                right: 0;
                bottom: 0;
                ${moreBtnHide ? "display: none;" : ""}
              `}
            >
              ещё
            </span>
          </div>
          <div
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <span
              className={css`
                font-size: 12px;
                color: #607d8b;
              `}
            >
              {manager ? manager.username : "Менеджер удалён"}
            </span>
            <span
              className={css`
                display: block;
                margin-left: 10px;
                color: ${isDeadline ? "#6fbb85" : "#D75746"};
              `}
            >
              {dayjs(task.timestampDateToComplete * 1000).format(
                "DD.MM.YYYY HH:mm dd"
              )}
            </span>
          </div>
        </div>
        <TaskActions id={task.id} status={task.status} />
      </div>
    );
  }
);
