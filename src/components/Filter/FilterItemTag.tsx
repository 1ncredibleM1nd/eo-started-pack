import { css } from "goober";
import { observer } from "mobx-react-lite";

export const FilterItemTag = observer(
  ({
    name,
    selected,
    onSelect,
  }: {
    name: string;
    selected: boolean;
    onSelect: any;
  }) => {
    return (
      <div
        className={css`
          display: inline-flex;
          justify-content: center;
          align-items: center;

          margin: 0 5px 5px 0;
          padding: 0 15px 0 10px;
          min-width: 100px;
          min-height: 30px;

          border: 1px solid ${selected ? "#3498db" : "#607d8b"};
          border-radius: 6px;

          cursor: pointer;
        `}
        onClick={() => onSelect()}
      >
        <span
          className={css`
            color: ${selected ? "#3498db" : "#607d8b"};
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          `}
        >
          {name}
        </span>
      </div>
    );
  }
);
