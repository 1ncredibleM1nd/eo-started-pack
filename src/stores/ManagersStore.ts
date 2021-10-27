import store from "store";
import { makeAutoObservable } from "mobx";
import { Manager } from "@/stores/model";
import { Managers } from "@/api/Managers";
import { RootStoreInstance } from ".";

export class ManagersStore {
  constructor(private readonly rootStore: RootStoreInstance) {
    makeAutoObservable(this);
  }

  managerList: Manager[] = [];
  noManagers: boolean = store.get("noManagers") ?? false;
  chosenManagers: number[] = [];

  toggleNoManager() {
    this.noManagers = !this.noManagers;
    store.set("noManagers", this.noManagers);
  }

  async load(schoolIds: number[]) {
    const { data: r } = await Managers.getAll(schoolIds);
    if (!r.error) {
      r.data.forEach((manager: Manager) => {
        const selected = store.get("managers", {})[manager.id] ?? false;
        this.managerList.push(
          new Manager(manager.id, manager.username, manager.avatar, selected)
        );
        if (selected) {
          this.chosenManagers.push(manager.id);
        }
      });
    }
  }

  getById(id?: number) {
    return this.managerList.find((manager) => manager.id === id);
  }

  get managersCount() {
    return this.managerList.length;
  }

  get chosenManagersCount() {
    return this.chosenManagers.length;
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
