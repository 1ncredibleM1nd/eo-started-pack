import IContact from './IContact'

export default interface IContactStore {
    contact: IContact[];
    activeContact: IContact;
    filter: any;
    search: string;

    setActiveContact: (id: string) => void;
    setSearch: (id: string) => void;
    setStatus: (id: string, status: string) => void;
    init: (data: any) => void;
    readonly avaliableContacts?: IContact[] | null;
}