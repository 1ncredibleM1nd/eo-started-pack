import { Conversation } from "../../entities";

export default interface IContactStore {
  contactLoading: boolean;
  contact: Array<Conversation>;
  activeContact: Conversation;
  name: string;
  sources: any;
  search: string;
  filterSwitch: boolean;
  loadContact: () => void;
  filterSocial: (key: string) => void;
  toggleFilterSwitch: () => void;
  getContact: (id: string) => Conversation;
  setActiveContact: (id: string) => void;
  setSearch: (id: string) => void;
  init: (data: any) => void;
}
