import { observer } from "mobx-react-lite";
import Header from "@/components/chat/Header";
import Chat from "@/components/chat/Chat";

const ChatLayout = observer(() => {
  return (
    <div className="chat_layout">
      <Header />
      <Chat />
    </div>
  );
});

export default ChatLayout;
