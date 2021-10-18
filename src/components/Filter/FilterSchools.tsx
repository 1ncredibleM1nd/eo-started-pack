import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Switch } from "antd";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { FilterItem } from "@/components/Filter/FilterItem";
import AvatarThumb from "../AvatarThumb";

export const FilterSchools = observer(({ onChangeSchool }) => {
  const { schoolsStore } = useStore();

  return (
    <FilterItem>
      <FilterItemTitle>Школы</FilterItemTitle>
      {schoolsStore.schools.map((school) => {
        return (
          <div key={`filter_school_${school.id}`} className={"school-item"}>
            <Switch
              size="small"
              defaultChecked={school.active}
              onChange={() => {
                school.setActive(!school.active);
                onChangeSchool(Number(school.id));
              }}
            />
            <AvatarThumb
              size={18}
              img={school?.logo}
              name={school?.name}
              round={true}
              textSizeRatio={2}
              textLength={1}
              className="school-logo"
            />
            <p>{school.name}</p>
          </div>
        );
      })}
    </FilterItem>
  );
});
