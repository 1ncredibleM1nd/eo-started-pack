import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Icon, TIconSize } from "@/ui/Icon/Icon";
import { classnames } from "@/utils/styles";

type TPropsIcon = {
  id?: string;
  name: string;
  size: TIconSize;
  color?: string;
  onClick?: () => void;
  className?: string;
};

const TaskIcon = observer(
  ({ name, size, color, onClick, className, id }: TPropsIcon) => {
    return (
      <div
        className={classnames(
          css`
            width: 14px;
            height: 14px;
            cursor: pointer;
            display: flex;
            padding: 3px;
            box-sizing: content-box;
            color: ${color};
          `,
          className
        )}
        onClick={onClick}
        id={id}
      >
        <Icon name={name} size={size} fill="currentColor" />
      </div>
    );
  }
);

export default TaskIcon;
