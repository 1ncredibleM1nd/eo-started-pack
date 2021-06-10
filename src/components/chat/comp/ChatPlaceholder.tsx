import React from "react";
import { inject, observer } from "mobx-react";
import IStores, { IUserStore } from "@stores/interface";
import { Skeleton } from "antd";
import { UserAvatar } from "@components/user_info/UserAvatar";

type IProps = {
  userStore?: IUserStore;
};

const Chat = inject((stores: IStores) => ({ userStore: stores.userStore }))(
  observer((props: IProps) => {
    const { userStore } = props;
    const hero = userStore.hero;

    if (!hero) {
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
        <UserAvatar size="64" user={hero} round={true} textSizeRatio={1.75} />
        <h5 className="mt-3">
          Привет, {hero ? hero.username : "Пользователь"}
        </h5>
        <p className="text-muted">
          Выбирай контакт слева, чтобы начать общаться
        </p>
      </div>
    );
  })
);

export default Chat;
