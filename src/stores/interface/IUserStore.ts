import IUser from "./IUser";
import { User } from "../../entities";

export default interface IUserStore {
  hero: User;
  availableUsers: IUser[];
  initHero: (data: any) => void;
}
