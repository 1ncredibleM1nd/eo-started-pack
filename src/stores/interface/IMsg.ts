
export default interface IMsg {
    id: any;
    from: any;
    time: string;
    date: string;
    social_media: string;
    readed: boolean;
    content: string;
    reply: IMsg;
    smiles: string[];
    editted: boolean;
    addSmile: (smile: string) => void;
    editMsg: (value: string) => void;
    read: () => void;
}