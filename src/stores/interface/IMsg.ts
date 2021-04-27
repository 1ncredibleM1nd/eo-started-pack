export default interface IMsg {
	id: any;
	from: any;
	time: string;
	date: string;
	social_media: string;
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
	editMsg: (value: string) => void;
	readMsg: () => void;
	income: boolean;
	attachments: any;
	entity: any;
}
