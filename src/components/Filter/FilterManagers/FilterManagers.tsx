import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { FilterItem } from "@/components/Filter/FilterItem";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { Button, Popover } from "antd";
import { css } from "goober";
import { FilterManagerList } from "@/components/Filter/FilterManagers/FilterManagerList";
import { useStore } from "@/stores";
import { FiltredManagersList } from "@/components/Filter/FilterManagers/FiltredManagersList";
import { FilterManagersCounter } from "@/components/Filter/FilterManagers/FilterManagersCounter";

type TProps = {
  onChangeManager: (id: number) => void;
};

export const FilterManagers = observer(({ onChangeManager }: TProps) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const { managersStore } = useStore();
  return (
    <>
      <FilterItem>
        <FilterItemTitle
          className={css`
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
          `}
        >
          Менеджеры
        </FilterItemTitle>
        <Popover
          placement={"right"}
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
            {managersStore.chosenManagers.length > 0 ? (
              <>
                <FiltredManagersList />
                <div
                  className={css`
                    border-top: 1px solid #f4f5f6;
                    margin-top: 5px;
                    padding-top: 5px;
                  `}
                >
                  <FilterManagersCounter />
                  <Button type="link" onClick={() => setPopoverVisible(true)}>
                    Изменить фильтр
                  </Button>
                </div>
              </>
            ) : (
              <Button
                onClick={() => setPopoverVisible(true)}
                className={css`
                  padding-top: 0;
                  padding-left: 0;
                `}
                type="link"
              >
                Все менеджеры
              </Button>
            )}
          </div>
        </Popover>
      </FilterItem>
    </>
  );
});
