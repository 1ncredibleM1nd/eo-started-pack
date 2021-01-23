
export default interface IMsg {
    id: any;
    from: any;
    time: string;
    social_media: string;
    content: string;
    smiles: string[];
    addSmile: (smile: string) => void;
}