import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import IStores from '@stores/interface';
import Header from '@components/chat/Header'
import Chat from '@components/chat/Chat'

type IProps = {}

const ChatLayout = inject((stores: IStores) => ({}))(
    observer((props: IProps) => {

        // const { } = props;


        return (
            <div className="chat_layout">
                <Header/>
                <Chat/>
            </div>
        );
    }));

export default ChatLayout;
