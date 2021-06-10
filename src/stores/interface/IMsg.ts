export default interface IMsg {
  id: any;
  time: string;
  date: string;
  socialMedia: string;
  read: boolean;
  content: string;
  reply: IMsg;
  smiles: string[];
  edited: boolean;
  avatar?: string;
  combineWithPrevious: boolean;
  role?: any;
  prevRead?: any;
  time_scope?: any;
  addSmile: (smile: string) => void;
  editMessage: (value: string) => void;
  readMessage: () => void;
  income: boolean;
  attachments: any;
  entity: any;
}
