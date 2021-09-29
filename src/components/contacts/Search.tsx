import "./Search.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Collapse, Button } from "antd";
import { FilterTags } from "@/components/Filter/FilterTags";
import { FilterSchools } from "@/components/Filter/FilterSchools";
import { FilterChannels } from "@/components/Filter/FilterChannels";
import { useHistory } from "react-router-dom";
import { Icon } from "@/ui/Icon/Icon";
import { SearchInput } from "./SearchInput";

const Search = observer(() => {
  const { contactStore, schoolsStore, tagsStore, sidebarStore, searchStore } =
    useStore();
  const history = useHistory();
  const filterSwitch = contactStore.filterSwitch;

  const onChangeTags = async () => {
    history.replace("");
    sidebarStore.hide();
    if (searchStore.running) {
      searchStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      contactStore.refetch();
    }
  };

  const onChangeSocial = async () => {
    history.replace("");
    sidebarStore.hide();
    if (searchStore.running) {
      searchStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      contactStore.refetch();
    }
  };

  async function onChangeSchool() {
    history.replace("");
    sidebarStore.hide();
    if (searchStore.running) {
      searchStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      await tagsStore.load(schoolsStore.activeSchoolsIds);
      contactStore.refetch();
    }
  }

  return (
    <div className="contact_header">
      <div className="search">
        <div className="search-filter">
          <Button
            disabled={!contactStore.isLoaded}
            onClick={() => contactStore.toggleFilterSwitch()}
            className="transparent"
          >
            {filterSwitch ? (
              <Icon name={"icon_filter_close"} fill="#a3a3a3" />
            ) : (
              <Icon name={"icon_filter"} fill="#a3a3a3" />
            )}
          </Button>
        </div>

        {/* <SearchInput /> */}
      </div>

      <Collapse bordered={false} accordion activeKey={filterSwitch ? "1" : ""}>
        <Collapse.Panel header="" key="1">
          <FilterTags onChangeTags={onChangeTags} />
          <FilterSchools onChangeSchool={onChangeSchool} />
          <FilterChannels onChangeSocial={onChangeSocial} />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
});

export default Search;
