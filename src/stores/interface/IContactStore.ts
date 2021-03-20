import IContact from './IContact'

export default interface IContactStore {
	contactLoading: boolean
	contact: IContact[];
	activeContact: IContact;
	name: string;
	source: any;
	search: string;
	filterSwitch: boolean;
	readonly availableContacts?: IContact[] | null;
	loadContact: () => void;
	filterSocial: (key: string) => void;
	toggleFilterSwitch: () => void;
	getContact: (id: string) => IContact;
	setActiveContact: (id: string) => void;
	setSearch: (id: string) => void;
	setStatus: (id: string, status: string) => void;
	init: (data: any) => void;

}
