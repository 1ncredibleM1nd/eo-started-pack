import ISidebar from "@stores/interface/app/ISidebar";

export default interface ISettings extends ISidebar {
    tab: string;
    mobileMenu: boolean;
    openChat: () => void;
    toggle: () => void;
    closeSettings: () => void;
    openSettings: () => void;
    closeMobileMenu: () => void;
    openMobileMenu: () => void;
    toggleMobileMenu: () => void;
    readonly activeTab: string;
}