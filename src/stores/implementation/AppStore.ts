import { action, observable } from "mobx";
import { IAppStore } from "@stores/interface";
import { contactStore, userStore } from "@stores/implementation";
import { getConversations, getSchools } from "@actions";
import { notification } from "antd";
import ISchool from "@stores/interface/app/ISchool";

export class AppStore implements IAppStore {
  @observable isLoaded: boolean = false;
  @observable info_tab: string = "none";
  @observable layout: string = "contact";
  @observable schoolList: Array<ISchool> = [];
  activeContactPageNumber: number = 1;

  constructor() {}

  @action
  setInfoTab(tab: string) {
    if (this.info_tab === tab) {
      this.info_tab = "none";
    } else {
      this.info_tab = tab;
    }
  }

  @action
  setLoading(loading: boolean) {
    this.isLoaded = loading;
  }

  @action
  setLayout(layout: string) {
    this.layout = layout;
  }

  @action
  setContactPageNumber(value: number) {
    this.activeContactPageNumber = value;
  }

  @action
  setSchoolList(schoolList: Array<ISchool>) {
    this.schoolList = schoolList;
  }

  @action
  async initSchools() {
    let schoolList: any = await getSchools();

    Object.keys(schoolList).forEach(schoolId => {
		const schoolName: any = schoolList[schoolId]['schoolName']
		const schoolLogo: any = schoolList[schoolId]['logo']

		schoolList[schoolId] = {
			name: schoolName,
			logo: schoolLogo,
			active: true
		}
	})

    this.setSchoolList(schoolList);
  }

  @action
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

  @action
  async updateContact() {
    const conversationList: Array<any> = await getConversations(
      this.getActiveSchools(),
      1
    );

    await contactStore.init(conversationList);
  }

  @action
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
