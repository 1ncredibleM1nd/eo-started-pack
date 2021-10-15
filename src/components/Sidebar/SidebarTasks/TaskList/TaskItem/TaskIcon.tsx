import { observer } from "mobx-react-lite";
import { css } from "goober";
import { Icon } from "@/ui/Icon/Icon";
import { classnames } from "@/utils/styles";

type TPropsIcon = {
  name: string;
  size?: string;
  onClick: any;
  className?: string;
  id?: string;
};

const TaskIcon = observer(
  ({ name, size, onClick, className, id }: TPropsIcon) => {
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
          `,
          className
        )}
        onClick={onClick}
        id={id}
      >
        <Icon name={name} size={size} />
      </div>
    );
  }
);

export default TaskIcon;
