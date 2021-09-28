import React from "react";
import { observer } from "mobx-react-lite";
import { User } from "@/stores/model/User";

type TProps = {
  user: User | null;
};

export const MessageUser = observer((props: TProps) => {
  const { user } = props;
  return (
    <div className="msg_sender_wrapper">
      <p className="msg_sender"> от {user?.username ?? "Бот"}</p>
    </div>
  );
});
