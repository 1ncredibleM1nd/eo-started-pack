import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Switch } from "antd";

export const Schools = observer(({ onChangeSchool }) => {
  const { schoolsStore } = useStore();

  return (
    <>
      <h5>Школы</h5>
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
    </>
  );
});
