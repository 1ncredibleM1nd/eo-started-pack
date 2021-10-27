import React from "react";
import { observer } from "mobx-react-lite";
import { styled } from "goober";
import { useStore } from "@/stores";
import { ManagerView } from "@/components/Sidebar/SidebarManagerSelector/ManagerView";

const ActiveManagersSpace = styled("div")`
  margin-top: 5px;
`;

export const FiltredManagersList = observer(() => {
  const { managersStore } = useStore();
  return (
    <div>
      {managersStore.noManagers ? "Без менеджера" : null}
      {managersStore.chosenManagers.map((id) => {
        return (
          <ActiveManagersSpace key={id}>
            <ManagerView manager={managersStore.getById(id)} />
          </ActiveManagersSpace>
        );
      })}
    </div>
  );
});
