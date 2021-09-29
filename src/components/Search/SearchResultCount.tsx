import { css } from "goober";
import { observer } from "mobx-react-lite";

type TProps = {
  count: number;
  section: string;
};

export const SearchResultCount = observer(({ count, section }: TProps) => {
  return (
    <h2
      className={css`
        width: 100%;
        padding: 10px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: normal;
        background: #f4f5f6;
      `}
    >
      {count} совпадений в {section}
    </h2>
  );
});
