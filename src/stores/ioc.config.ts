import { container } from "./ioc";
import { Api } from "@/api";
import { socket, Socket } from "@/services/socket";
import { ChannelsStore } from "./ChannelsStore";
import { LayoutStore } from "./LayoutStore";
import { SchoolsStore } from "./SchoolsStore";
import { SidebarStore } from "./SidebarStore";
import { TagsStore } from "./TagsStore";
import { UsersStore } from "./UsersStore";
import { TYPES } from "@/types/ioc";
import { SearchStore } from "./SearchStore";

container.bind<Api>(TYPES.Api).to(Api).inSingletonScope();
container.bind<Socket>(TYPES.Socket).toConstantValue(socket);

container.bind<TagsStore>(TYPES.Tags).to(TagsStore).inSingletonScope();
container.bind<UsersStore>(TYPES.Users).to(UsersStore).inSingletonScope();
container.bind<SearchStore>(TYPES.Search).to(SearchStore).inSingletonScope();
container.bind<SchoolsStore>(TYPES.Schools).to(SchoolsStore).inSingletonScope();
container
  .bind<ChannelsStore>(TYPES.Channels)
  .to(ChannelsStore)
  .inSingletonScope();

container.bind<LayoutStore>(TYPES.Layout).to(LayoutStore).inSingletonScope();
container.bind<SidebarStore>(TYPES.Sidebar).to(SidebarStore).inSingletonScope();
