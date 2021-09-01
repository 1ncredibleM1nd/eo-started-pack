import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { FilterItem } from "@/components/Filter/FilterItem";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { Tag } from "@/stores/model/Tag";
import { css } from "goober";

const FilterTagItem = observer(
  ({ tag, onSelect }: { tag: Tag; onSelect: any }) => {
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

          border: 1px solid ${tag.selected ? "#3498db" : "#607d8b"};
          border-radius: 6px;

          cursor: pointer;
        `}
        onClick={() => {
          onSelect();
          tag.setSelected(!tag.selected);
        }}
      >
        <span
          className={css`
            color: ${tag.selected ? "#3498db" : "#607d8b"};
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          `}
        >
          {tag.name}
        </span>
      </div>
    );
  }
);

export const FilterTags = observer(
  ({ onChangeTags }: { onChangeTags: any }) => {
    const { tagsStore, schoolsStore } = useStore();

    return (
      <>
        {Object.entries<Tag[]>(tagsStore.groupBySchools).map(
          ([schoolId, tags]) => {
            const school = schoolsStore.getById(Number(schoolId));
            if (school?.active) {
              return (
                <FilterItem key={schoolId}>
                  <FilterItemTitle>Теги {school?.name ?? ""}</FilterItemTitle>
                  <div
                    className={css`
                      display: flex;
                      flex-wrap: wrap;
                    `}
                  >
                    {tags.map((tag) => (
                      <FilterTagItem
                        key={tag.id}
                        tag={tag}
                        onSelect={onChangeTags}
                      />
                    ))}
                  </div>
                </FilterItem>
              );
            }

            return null;
          }
        )}
      </>
    );
  }
);
