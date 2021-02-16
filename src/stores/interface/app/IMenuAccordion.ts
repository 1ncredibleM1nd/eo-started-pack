export default interface IMenuAccordion {
    active: string;
    hover: string;

    setHover: (category: string, menuName?: string) => void;
    setActive: (category: string, menuName?: string) => void;

    removeHover: () => void;
    removeActive: () => void;

    isHover: (category: string) => boolean;
    isActive: (category: string) => boolean;
}