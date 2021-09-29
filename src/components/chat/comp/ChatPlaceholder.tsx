import { observer } from "mobx-react-lite";
import { Skeleton } from "antd";
import { UserAvatar } from "@/components/user_info/UserAvatar";
import { useStore } from "@/stores";

const Chat = observer(() => {
  const { usersStore } = useStore();
  const user = usersStore.user;

  if (!user) {
    return (
      <div className="start_chat_page">
        <Skeleton.Avatar
          style={{ width: 80, height: 80 }}
          active={true}
          size={"large"}
          shape="circle"
        />
        <Skeleton.Input
          style={{ width: 150, height: 25 }}
          active={true}
          size="default"
        />
        <Skeleton.Input
          style={{ width: 225, height: 25 }}
          active={true}
          size="default"
        />
      </div>
    );
  }

  return (
    <div className="start_chat_page">
      <UserAvatar size="200px" user={user} round={true} textSizeRatio={1.75} />
      <h5 className="mt-3">Привет, {user ? user.username : "Пользователь"}</h5>
      <p className="text-muted">Выбирай контакт слева, чтобы начать общаться</p>
    </div>
  );
});

export default Chat;
