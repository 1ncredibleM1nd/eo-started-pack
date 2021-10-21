import { observer } from "mobx-react-lite";
import { Skeleton } from "antd";
import { useStore } from "@/stores";
import AvatarThumb from "@/components/AvatarThumb";
import { useMediaQuery } from "react-responsive";

const Chat = observer(() => {
  const { usersStore } = useStore();
  const isTablet = useMediaQuery({ maxWidth: 1024 });
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
      <AvatarThumb
        size={isTablet ? 150 : 200}
        img={user.avatar}
        round={true}
        textSizeRatio={1.75}
        name={user.username}
        textLength={2}
      />
      <h5 className="mt-3">Привет, {user ? user.username : "Пользователь"}</h5>
      <p className="text-muted">Выбирай контакт слева, чтобы начать общаться</p>
    </div>
  );
});

export default Chat;
