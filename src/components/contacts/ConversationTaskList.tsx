import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { useStore } from "@/stores";
import { useInView } from "react-intersection-observer";
import { ContactListLoader } from "./ContactListLoader/ContactListLoader";
import { ConversationTaskItem } from "./comp/Conversation/ConversationTaskItem";
import { useMediaQuery } from "react-responsive";

const ConversationTaskList = observer(() => {
  const { taskStore, layoutStore, contactStore, sidebarStore } = useStore();
  const { sortedTasks } = taskStore;
  const history = useHistory();
  const sidebarOpenedByDefault = useMediaQuery({ minWidth: 1024 });

  const { ref: sentryPrevRef, inView: isVisiblePrev } = useInView({});
  const { ref: sentryNextRef, inView: isVisibleNext } = useInView({
    threshold: 0.85,
  });

  useEffect(() => {
    if (isVisiblePrev) {
      taskStore.loadPrev();
    }
  }, [taskStore, isVisiblePrev]);

  useEffect(() => {
    if (isVisibleNext) {
      taskStore.loadNext();
    }
  }, [taskStore, isVisibleNext]);

  const onSelect = async (conversationId: number) => {
    const conversation = await contactStore.loadContact(conversationId);
    history.replace(`chat?im=${conversationId}`);
    layoutStore.setLayout("chat");
    contactStore.setActiveContact(conversation);
    sidebarStore.setOpened(sidebarOpenedByDefault);
  };

  return (
    <div className="task-list">
      <div ref={sentryPrevRef}>
        {taskStore.hasPrev && <ContactListLoader />}
      </div>

      {sortedTasks.map((task: any, index: number) => {
        if (!task) return null;

        return (
          <div className="task-item" key={task.id}>
            <ConversationTaskItem task={task} selectContact={onSelect} />
          </div>
        );
      })}

      <div ref={sentryNextRef}>
        {taskStore.hasNext && <ContactListLoader />}
      </div>

      {sortedTasks && !sortedTasks.length && (
        <li className={`task-item friends`}>
          <div className="announcement">Список задач пуст</div>
        </li>
      )}
    </div>
  );
});

export default ConversationTaskList;
