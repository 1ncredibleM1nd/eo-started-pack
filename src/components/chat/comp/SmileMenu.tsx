import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";

type IProps = {
  id?: string;
  chat_id: string;
  switcherOff: () => void;
};

const SmileMenu = observer((props: IProps) => {
  const { chatStore } = useStore();
  const { switcherOff, id, chat_id } = props;
  const message = chatStore.getMsg(id, chat_id);

  const selectSmile = (smile: any) => {
    message.addSmile(smile);
    switcherOff();
  };

  return (
    <div className="smile_menu">
      <div onClick={() => selectSmile("❤️")} className="smile_swiper_item">
        ❤️
      </div>
      <div onClick={() => selectSmile("🔥")} className="smile_swiper_item">
        🔥
      </div>
      <div onClick={() => selectSmile("👍")} className="smile_swiper_item">
        👍
      </div>
      <div onClick={() => selectSmile("😱")} className="smile_swiper_item">
        😱
      </div>
      <div onClick={() => selectSmile("🤯")} className="smile_swiper_item">
        🤯
      </div>
      <div onClick={() => selectSmile("💪")} className="smile_swiper_item">
        💪
      </div>
    </div>
  );
});

export default SmileMenu;
