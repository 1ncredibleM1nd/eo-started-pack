import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { FilterItem } from "@/components/Filter/FilterItem";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { Button, Popover } from "antd";
import { css } from "goober";
import { FilterManagerList } from "@/components/Filter/FilterManagers/FilterManagerList";

type TProps = {
  onChangeManager: (id: number) => void;
};

export const FilterManagers = observer(({ onChangeManager }: TProps) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  return (
    <>
      <FilterItem>
        <FilterItemTitle
          className={css`
            margin-bottom: 5px;
          `}
        >
          Менеджеры
        </FilterItemTitle>
        <Popover
          className={css`
            padding-bottom: 10px;
          `}
          placement={"left"}
          content={<FilterManagerList onCheck={onChangeManager} />}
          title="Менеджер"
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={setPopoverVisible}
        >
          <div
            className={css`
              width: 100%;
            `}
          >
            <Button
              className={css`
                padding-top: 0;
                padding-left: 0;
              `}
              type="link"
            >
              Все менеджеры
            </Button>
          </div>
        </Popover>
      </FilterItem>
    </>
  );
});
