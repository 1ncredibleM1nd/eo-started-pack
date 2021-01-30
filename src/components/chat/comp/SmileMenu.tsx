import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore } from '@stores/interface';


type IProps = {
    chatStore?: IChatStore,
    id?: string,
    chat_id: string,
    switcherOff: () => void;
}

const SmileMenu = inject((stores: IStores) => ({ chatStore: stores.chatStore }))(
    observer((props: IProps) => {

        const { chatStore, switcherOff, id, chat_id } = props;
        const msg = chatStore.getMsg(id, chat_id);

        const selectSmile = (smile: any) => {
            msg.addSmile(smile)
            switcherOff()
        }

        return (
            <div className="smile_menu">
                <div onClick={() => selectSmile('❤️')} className="smile_swiper_item">
                    ❤️
                        </div>
                <div onClick={() => selectSmile('🔥')} className="smile_swiper_item">
                    🔥
                        </div>
                <div onClick={() => selectSmile('👍')} className="smile_swiper_item">
                    👍
                        </div>
                <div onClick={() => selectSmile('😱')} className="smile_swiper_item">
                    😱
                        </div>
                <div onClick={() => selectSmile('🤯')} className="smile_swiper_item">
                    🤯
                        </div>
                <div onClick={() => selectSmile('💪')} className="smile_swiper_item">
                    💪
                </div>
            </div >
        );
    }));

export default SmileMenu;
