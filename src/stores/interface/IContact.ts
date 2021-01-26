
export default interface IContact {
    length: number;
    find(arg0: (user: any) => boolean): any;
    online: boolean;
    chat_id: string;
    name: string,
    status: string;
    last_message_id: string;
    id: string,
    setLastMsg: (msg_id: string) => void;
    setStatus: (status: string) => void;
}