import "./Search.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores";
import { Collapse, Button } from "antd";
import { FilterTags } from "@/components/Filter/FilterTags";
import { FilterSchools } from "@/components/Filter/FilterSchools";
import { FilterChannels } from "@/components/Filter/FilterChannels";
import { useHistory } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import FilterButton from "@/components/contacts/comp/FilterButton";
import { FilterDialogStatus } from "../FilterDialogStatus/FilterDialogStatus";
import { useState } from "react";

const Search = observer(() => {
  const { contactStore, schoolsStore, tagsStore, sidebarStore, searchStore } =
    useStore();
  const history = useHistory();
  const [filterVisible, setFilterVisible] = useState(false);

  const onChangeTags = async () => {
    history.replace("");
    sidebarStore.setOpened(false);
    if (searchStore.running) {
      searchStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      contactStore.refetch();
    }
  };

  const onChangeSocial = async () => {
    history.replace("");
    sidebarStore.setOpened(false);
    if (searchStore.running) {
      searchStore.fetch();
    } else {
      await contactStore.setActiveContact(undefined);
      contactStore.refetch();
    }
  };

  async function onChangeSchool() {
    history.replace("");
    sidebarStore.setOpened(false);
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
        <div
          className="search-filter"
          onClick={() => setFilterVisible(!filterVisible)}
        >
          <FilterButton
            count={tagsStore.activeTagsCount}
            visible={filterVisible}
          />
        </div>

        <SearchInput />
      </div>

      <Collapse
        bordered={false}
        accordion
        activeKey={filterVisible ? "filter" : ""}
      >
        <Collapse.Panel header="" key="filter">
          <FilterTags onChangeTags={onChangeTags} />
          <FilterSchools onChangeSchool={onChangeSchool} />
          <FilterChannels onChangeSocial={onChangeSocial} />
        </Collapse.Panel>
      </Collapse>

      <FilterDialogStatus />
    </div>
  );
});

export default Search;
