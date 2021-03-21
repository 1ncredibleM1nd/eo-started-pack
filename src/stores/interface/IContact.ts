
export default interface IContact {
    user: any;
    last_message: any;
    length: number;
    find(arg0: (user: any) => boolean): any;
    avatar: string;
    online: boolean;
    chat_id: string;
    name: string;
    status: string;
    last_message_id: string;
    conversation_source_account_id?: any;
    id: string;
    setLastMsg: (msg_id: string) => void;
    setStatus: (status: string) => void;
}
