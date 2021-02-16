
import IVariable from "./IVariable"

export default interface IVariableCategory {
    map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
    length: any;
    id: string,
    name: string,
    title: string,
    items: IVariable[]
}

