import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css } from "goober";
import { UserAvatar } from "@/components/user_info/UserAvatar";

export const SidebarUser = observer(() => {
  const { contactStore } = useStore();
  return (
    <div
      className={css`
        display: inline-flex;
        width: 100%;
        align-items: center;
        margin-bottom: 30px;
      `}
    >
      <UserAvatar user={contactStore?.activeContact?.user} size={80} />

      <h2
        className={css`
          font-size: 14px;
          font-weight: 500;
          margin-left: 10px;
          max-width: 120px;
        `}
      >
        {contactStore.activeContact?.user.username ?? ""}
      </h2>
    </div>
  );
});
