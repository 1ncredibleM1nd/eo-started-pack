import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css } from "goober";
import AvatarThumb from "../AvatarThumb";

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
      <AvatarThumb
        size={80}
        img={contactStore?.activeContact?.user.avatar}
        round={true}
        textSizeRatio={2}
        name={contactStore?.activeContact?.user.username}
        textLength={2}
      />
      <h2
        className={css`
          font-size: 14px;
          font-weight: 500;
          margin-left: 10px;
          max-width: calc(100% - 90px);
          margin-bottom: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
      >
        {contactStore.activeContact?.user.username ?? ""}
      </h2>
    </div>
  );
});
