export default interface IAppStore {
    loaded: boolean;
    layout: string;
    info_tab: string;
    school: string;
    setInfoTab: (tab: string) => void;
    setLayout: (value: string) => void;
    setSchoolId: (id: string) => void;
    initialization: () => void;
}