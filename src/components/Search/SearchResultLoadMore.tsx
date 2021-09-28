import { Button, ButtonProps } from "antd";
import { css } from "goober";
import { observer } from "mobx-react-lite";

type TProps = ButtonProps;

export const SearchResultLoadMore = observer((props: TProps) => {
  return (
    <Button
      {...props}
      type="link"
      className={css`
        width: 100%;
      `}
    >
      Загрузить ещё
    </Button>
  );
});
