import { action, observable, makeObservable } from "mobx";
import { IAppStore } from "@stores/interface";
import { contactStore, userStore } from "@stores/implementation";
import { getConversations, getSchools } from "@actions";
import { notification } from "antd";
import ISchool from "@stores/interface/app/ISchool";

export class AppStore implements IAppStore {
  isLoaded: boolean = false;
  info_tab: string = "none";
  layout: string = "contact";
  schoolList: Array<ISchool> = [];
  activeContactPageNumber: number = 1;

  constructor() {
    makeObservable(this, {
      isLoaded: observable,
      info_tab: observable,
      layout: observable,
      schoolList: observable,
      setInfoTab: action,
      setLoading: action,
      setLayout: action,
      setContactPageNumber: action,
      setSchoolList: action,
      initSchools: action,
      activeSchool: action,
      updateContact: action,
      initialization: action,
    });
  }

  setInfoTab(tab: string) {
    if (this.info_tab === tab) {
      this.info_tab = "none";
    } else {
      this.info_tab = tab;
    }
  }

  setLoading(loading: boolean) {
    this.isLoaded = loading;
  }

  setLayout(layout: string) {
    this.layout = layout;
  }

  setContactPageNumber(value: number) {
    this.activeContactPageNumber = value;
  }

  setSchoolList(schoolList: Array<ISchool>) {
    this.schoolList = schoolList;
  }

  async initSchools() {
    let schoolList: any = await getSchools();

    Object.keys(schoolList).forEach((schoolId) => {
      const schoolName: any = schoolList[schoolId]["schoolName"];
      const schoolLogo: any = schoolList[schoolId]["logo"];

      schoolList[schoolId] = {
        name: schoolName,
        logo: schoolLogo,
        active: true,
      };
    });

    this.setSchoolList(schoolList);
  }

  activeSchool(schoolId: number): void {
    contactStore.contact = [];
    this.setLoading(false);

    this.schoolList[schoolId].active = !this.schoolList[schoolId].active;
  }

  getActiveSchools(): Array<number> {
    let schoolIds: Array<number> = [];

    Object.keys(this.schoolList).forEach((schoolId) => {
      const school: any = this.schoolList[schoolId];

      if (school.active) {
        schoolIds.push(Number(schoolId));
      }
    });

    return schoolIds;
  }

  async updateContact() {
    const conversationList: Array<any> = await getConversations(
      this.getActiveSchools(),
      1
    );

    await contactStore.init(conversationList);
  }

  async initialization() {
    await userStore.initHero();

    await this.initSchools();

    // сконфигурируем уведомления
    notification.config({ placement: "bottomRight", bottom: 50, duration: 3 });

    this.runUpdateContact();
  }

  async runUpdateContact() {
    await this.updateContact();

    setTimeout(() => this.runUpdateContact(), 1000);
  }
}

export const appStore = new AppStore();
