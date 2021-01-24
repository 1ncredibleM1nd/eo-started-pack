
export default interface IMsg {
    id: any;
    from: any;
    time: string;
    social_media: string;
    content: string;
    reply: IMsg;
    smiles: string[];
    editted: boolean;
    addSmile: (smile: string) => void;
    editMsg: (value: string) => void;
}