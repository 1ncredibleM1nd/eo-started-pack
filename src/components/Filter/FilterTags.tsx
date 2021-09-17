import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { FilterItem } from "@/components/Filter/FilterItem";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { FilterItemSection } from "@/components/Filter/FilterItemSection";
import { FilterItemTag } from "@/components/Filter/FilterItemTag";

export const FilterTags = observer(
  ({ onChangeTags }: { onChangeTags: any }) => {
    const { tagsStore } = useStore();

    return (
      <FilterItem>
        <FilterItemTitle>Теги</FilterItemTitle>
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
  }
);
