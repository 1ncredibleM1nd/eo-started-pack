

export default interface IAppStore {
    loaded: boolean;
    info_tab: string;
    setInfoTab: (tab: string) => void;
    initialization: () => void;
}