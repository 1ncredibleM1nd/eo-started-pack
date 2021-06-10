import IMsg from "./IMsg";
import IRole from "./IRole";

export default interface IChat {
  contactId: string;
  activeMessage: any;
  id: string;
  user: string[];
  role: IRole[];
  messages: IMsg[][];
  activeSocial: string;
}
