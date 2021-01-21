export default interface ISidebar {
    isOpen: boolean;
    close: () => void;
    open: () => void;
    toggle: () => void;
}