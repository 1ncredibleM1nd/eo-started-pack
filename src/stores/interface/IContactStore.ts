import IContact from './IContact'

export default interface IContactStore {
    contact: IContact[];
    activeContact: IContact;
    name: string;
    filter: any;
    search: string;
    getContact: (id: string) => IContact;
    setActiveContact: (id: string) => void;
    setSearch: (id: string) => void;
    setStatus: (id: string, status: string) => void;
    init: (data: any) => void;
    readonly avaliableContacts?: IContact[] | null;
}