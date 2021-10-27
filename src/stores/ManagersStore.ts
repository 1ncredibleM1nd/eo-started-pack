import { makeAutoObservable } from "mobx";
import { Manager } from "@/stores/model";
import { Managers } from "@/api/Managers";

export class ManagersStore {
  constructor() {
    makeAutoObservable(this);
  }

  managerList: Manager[] = [];
  noManagers: boolean = false;
  chosenManagers: number[] = [];

  async load(schoolIds: number[]) {
    const { data: r } = await Managers.getAll(schoolIds);
    if (!r.error) {
      r.data.forEach((manager: Manager) => {
        this.managerList.push(
          new Manager(manager.id, manager.username, manager.avatar)
        );
      });
    }
  }

  getById(id?: number) {
    return this.managerList.find((manager) => manager.id === id);
  }

  addChosenManager(managerId: number, checked: boolean) {
    if (managerId === -1) {
      this.noManagers = checked;
    } else if (checked) {
      this.chosenManagers.push(managerId);
    } else {
      this.chosenManagers = this.chosenManagers.filter(
        (id) => id !== managerId
      );
    }
  }

  get activeManagersCount() {
    return this.chosenManagers.length;
  }
}
