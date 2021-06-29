// import ISchool from "@/stores/interface/app/ISchool";

export default interface IUser {
  unic?: string;
  id?: number;
  username?: string;
  avatar?: string;
  availableSocial?: any;
  online?: any;
  schoolList: any;
}
