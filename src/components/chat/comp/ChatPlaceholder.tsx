import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IUserStore } from '@stores/interface';
import { Skeleton } from 'antd';


type IProps = {
  userStore?: IUserStore
}

const Chat = inject((stores: IStores) => ({ userStore: stores.userStore }))(
  observer((props: IProps) => {

    const { userStore } = props

    const hero = userStore.hero

    if (!hero) {
      return (
        <div className="start_chat_page">
          <Skeleton.Avatar style={{ width: 80, height: 80 }} active={true} size={'large'} shape='circle' />
          <Skeleton.Input style={{ width: 150, height: 25 }} active={true} size='default' />
          <Skeleton.Input style={{ width: 225, height: 25 }} active={true} size='default' />
        </div>
      )
    }

    return (
      <div className="start_chat_page">
        <div className="avatar avatar-lg mb-2">
          <img className="avatar-img" src={hero ? hero.avatar : 'https://via.placeholder.com/150'} alt=""></img>
        </div>
        <h5>
          Привет, {hero ? hero.username : 'Пользователь'}
        </h5>
        <p className="text-muted">
          Выбирай контакт слева чтобы начать общаться
          </p>
      </div>
    );
  }));

export default Chat;
