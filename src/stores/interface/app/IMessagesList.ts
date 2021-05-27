import { IMsg } from "@stores/interface";

interface IMessagesList {
    contactId: string
    messages: Array<Array<IMsg>>
}

export default IMessagesList
