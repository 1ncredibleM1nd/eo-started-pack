import IContact from './IContact'

export default interface IContactStore {
    contact: IContact[];
    activeContact: IContact;
    setActiveContact: (id: string) => void;
    init: (data: any) => void;
    readonly avaliableContacts?: IContact[] | null;
}