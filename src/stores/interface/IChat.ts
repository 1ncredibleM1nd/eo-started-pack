import IContact from './IContact'
import IMsg from './IMsg'

export default interface IChat {
    contact_id: string,
    id: string,
    person: IContact;
    msg: IMsg[];
}