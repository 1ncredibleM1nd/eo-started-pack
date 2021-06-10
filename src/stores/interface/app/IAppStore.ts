export default interface IAppStore {
  schoolList: any;
  isLoaded: boolean;
  layout: string;
  info_tab: string;
  setInfoTab: (tab: string) => void;
  setLayout: (layout: string) => void;
  setLoading: (loading: boolean) => void;
  setSchoolList: (schoolList: Array<Object>) => void;
  getActiveSchools: () => Array<number>;
  activeSchool: (schoolId: number) => void;
  initialization: () => void;
  runUpdateContact: () => void;
}
