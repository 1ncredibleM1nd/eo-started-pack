import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Manager } from "@/stores/model/Manager";
import AvatarThumb from "@/components/AvatarThumb";

type TProps = {
  from?: Manager;
};

const TaskItemFrom = observer(({ from }: TProps) => {
  if (from)
    return (
      <>
        <AvatarThumb
          size={18}
          img={from.avatar}
          name={from.username}
          round={true}
          textSizeRatio={1.75}
          textLength={2}
        />
        <span
          className={css`
            display: block;
            color: #607d8b;
            margin-left: 5px;
          `}
        >
          {from.username}
        </span>
      </>
    );
  else
    return (
      <span
        className={css`
          display: block;
          color: #607d8b;
        `}
      >
        Менеджер удалён
      </span>
    );
});

export default TaskItemFrom;
