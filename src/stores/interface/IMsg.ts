
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
    income: boolean;
    avatar?: string;
    flowMsgNext?: any;
    role?: any;
    flowMsgPrev?: any;
    center?: any;
    prevReaded?: any;
    time_scope?: any;
    addSmile: (smile: string) => void;
    editMsg: (value: string) => void;
    read: () => void;
}