import IContact from './IContact'
import IMsg from './IMsg'
import IRole from './IRole'

export default interface IChat {
    contact_id: string,
    id: string,
    user: IContact;
    role: IRole[];
    msg: IMsg[];
    activeSocial: string;
    changeSocial: (social: string) => void;
}