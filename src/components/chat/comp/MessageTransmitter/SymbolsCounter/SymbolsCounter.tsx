import React from "react";
import { observer } from "mobx-react-lite";
import { css, styled } from "goober";

type TSymbolCounterProps = {
  count: number;
  maxCount: number;
};

const LIMIT_COUNT = 9999;

export const SymbolsCounterWrapper = styled("div")`
  width: 100%;
  display: flex;
  padding-right: 6px;
  justify-content: flex-end;
`;

export const SymbolsCounter = observer(
  ({ count, maxCount }: TSymbolCounterProps) => {
    return (
      <SymbolsCounterWrapper>
        <span
          className={css`
            margin-right: 2px;
            color: ${count > maxCount ? "#ef8079" : "#607d8b"};
          `}
        >
          {count < LIMIT_COUNT ? count : "9999+"}
        </span>
        <span
          className={css`
            color: #607d8b;
            margin-right: 2px;
          `}
        >
          /
        </span>
        <span
          className={css`
            color: #607d8b;
          `}
        >
          {maxCount}
        </span>
      </SymbolsCounterWrapper>
    );
  }
);
