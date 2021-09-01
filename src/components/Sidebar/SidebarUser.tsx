import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css } from "goober";

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
      <img
        src={contactStore?.activeContact?.user.avatar ?? ""}
        className={css`
          width: 92px;
          height: 92px;
          border-radius: 90px;
          object-fit: cover;
        `}
      />

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
