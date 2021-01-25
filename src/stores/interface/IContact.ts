
export default interface IContact {
    length: number;
    find(arg0: (user: any) => boolean): any;
    online: boolean;
    chat_id: string;
    username: string,
    status: string;
    last_msg: string;
    id: string,
    setLastMsg: (msg_id: string) => void;
    setStatus: (status: string) => void;
}