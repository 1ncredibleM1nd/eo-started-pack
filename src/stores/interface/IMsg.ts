import IContact from './IContact'




export default interface IMsg {
    length: number;
    map(arg0: (msg: IMsg, index: number) => JSX.Element): import("react").ReactNode;
    from: IContact;
    content: string;
}