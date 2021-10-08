import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { css } from "goober";
import { FilterItem } from "@/components/Filter/FilterItem";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { FilterItemSection } from "@/components/Filter/FilterItemSection";
import { FilterItemTag } from "@/components/Filter/FilterItemTag";
import { Button } from "antd";

type TProps = {
  onChangeTags: () => void;
};

export const FilterTags = observer(({ onChangeTags }: TProps) => {
  const { tagsStore } = useStore();

  return (
    <FilterItem>
      <div
        className={css`
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        `}
      >
        <FilterItemTitle>Теги</FilterItemTitle>
        <Button
          type="link"
          className={css`
            padding: 0;
          `}
          onClick={() => {
            tagsStore.resetTags();
            onChangeTags();
          }}
        >
          Сбросить теги
        </Button>
      </div>
      <FilterItemSection>
        {tagsStore.groupByName.map((tag) => (
          <FilterItemTag
            key={tag.id}
            name={tag.name}
            selected={tag.selected}
            onSelect={() => {
              tag.setSelected(!tag.selected);
              onChangeTags();
            }}
            color={tag.color}
          />
        ))}
        <FilterItemTag
          name={"Без тегов"}
          selected={tagsStore.noTags}
          onSelect={() => {
            tagsStore.toggleNoTags();
            onChangeTags();
          }}
        />
      </FilterItemSection>
    </FilterItem>
  );
});
