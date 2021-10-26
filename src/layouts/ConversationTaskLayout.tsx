import { observer } from "mobx-react-lite";
import { FilterTaskConversationStatus } from "@/components/Filter/FilterTaskConversationStatus";
import PuffLoader from "react-spinners/PuffLoader";
import ConversationTaskList from "@/components/contacts/ConversationTaskList";
import { useStore } from "@/stores";

const ConversationTaskLayout = observer(() => {
  const { taskStore } = useStore();
  const isLoading = !taskStore.isLoaded;

  return (
    <div className="conversation_task_layout">
      <FilterTaskConversationStatus />
      {isLoading ? (
        <div className="loading">
          <PuffLoader color="#3498db" size={50} />
        </div>
      ) : (
        <ConversationTaskList />
      )}
    </div>
  );
});

export default ConversationTaskLayout;
