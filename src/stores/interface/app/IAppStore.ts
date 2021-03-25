export default interface IAppStore {
	school_list: any;
	loaded: boolean;
	layout: string;
	info_tab: string;
	school: any;
	setInfoTab: (tab: string) => void;
	setLayout: (layout: string) => void;
	setSchool: (school: string) => void;
	setLoading: (loading: boolean) => void;
	setSchoolId: (id: string) => void;
	initialization: () => void;
	runUpdateContact: () => void;
}
