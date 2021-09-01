import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Switch } from "antd";
import { FilterItemTitle } from "@/components/Filter/FilterItemTitle";
import { FilterItem } from "@/components/Filter/FilterItem";

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
            <img src={school.logo} className="school-logo" alt={school.name} />
            <p>{school.name}</p>
          </div>
        );
      })}
    </FilterItem>
  );
});
